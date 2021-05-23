import { ApolloClient, ApolloLink, concat, HttpLink, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const getAxiosClient = (url) => {
  const base = axios.create({
    baseURL: url,
    timeout: 40000
  })

  const ISSERVER = typeof window === "undefined";
  base.interceptors.request.use(request => {
    const token = getToken();
    if (token) {
      request.headers.Authorization = `Bearer ${token}`
    }
    return request;
  }, error => {
    return Promise.reject(error);
  });

  base.interceptors.response.use(response => {
    if (response.headers['authorization']) {
      if (!ISSERVER) {
        AsyncStorage.setItem('token', response.headers['authorization']);
      }
    }
    return Promise.resolve(response)
  }, error => {
    return Promise.reject(error);
  });
  return base;
}

export const getApolloClient = (default_url, timescale_url, server_url) => {
  const defaultHttpLink = new HttpLink({ uri: default_url });
  const timescaleHttpLink = new HttpLink({ uri: timescale_url });

  const httpLink = split(operation => operation.getContext().clientName === "timescale", timescaleHttpLink, defaultHttpLink)

  const authMiddleware = new ApolloLink(async (operation, forward) => {

    const token = await getToken(server_url);
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
        'content-type': 'application/json'
      }
    }));
    return forward(operation);
  })

  let wsLink = httpLink;
  if (typeof window !== 'undefined') {
    wsLink = new WebSocketLink({
      uri: timescale_url.replace('http', 'ws'),
      options: {
        reconnect: true,
        connectionParams: {},
      }
    });
  }

  const dualLink = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
  );

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, dualLink),
  });
}

export const getToken = async (server_url) => {
  let token = await AsyncStorage.getItem('token');
  if (!token && server_url) {
    const axiosClient = await getAxiosClient(server_url);
    const res = await axiosClient.get('/api/hstoken');
    token = res?.data?.hstoken;
    AsyncStorage.setItem("token", token);
  }
  return token;
}
