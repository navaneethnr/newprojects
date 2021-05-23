import { ApolloProvider } from '@apollo/client';
import { getApolloClient } from './src/api/utils';
import React from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Main } from './src/screens/main';

export default function App() {
  const client = getApolloClient('https://dev-hasura.tbps.in/v1/graphql', 'https://dev-timescale.tbps.in/v1/graphql', 'https://qa-security.tbps.in');
  return (
    <SafeAreaProvider>
      <AppearanceProvider>
          <ApolloProvider client={client}>
            <Main />
          </ApolloProvider>
      </AppearanceProvider>
    </SafeAreaProvider>
  );
}
