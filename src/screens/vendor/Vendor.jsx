import { gql, useQuery } from "@apollo/client";
import React from "react";
import {  ScrollView, Text, View, StyleSheet } from "react-native";
import { Surface, IconButton, Title, TouchableRipple, useTheme } from "react-native-paper";
import { FlatGrid } from 'react-native-super-grid';

const GET_ALL_VENDOR_DETAILS = gql
`
query MyQuery {
  organisation_vendor {
    vendor_name
    mobile_number
    email_address
    id
  }  
}`;


function renderItem({ item}){
  return <VendorsList {...item} />;
}

export default function Vendors ({ navigation }){
  const theme = useTheme();

  const styles = StyleSheet.create({
    textField: {
      textAlign: 'center',
      fontSize: 16,
      color: theme.colors.text
    },
    paperCard: {
      width: 320,
      height: 350,
      marginTop: 10,
      backgroundColor: theme.colors.background,
      padding: 5,
      elevation: 15
    },
    headline: {
      marginLeft: 17,
      color: theme.colors.secondary
    }
  });
  const { data,loading,error } = useQuery(GET_ALL_VENDOR_DETAILS);
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;
  const vendorDetails = data?.organisation_vendor || [];
  const vendorData = vendorDetails.map(VendorProps=>({
    ...VendorProps,
    onPress:()=>
    navigation &&
    navigation.push('VendorsDetails',{
      ...VendorProps,
    })
  })
  )
  return (
          <View style={{ marginTop: 2, marginLeft: 2 }}>
            <View>
              <Text style={{ fontSize: 25, marginLeft: 17 }}>
              Details
                <IconButton
                  size={35}
                  icon="plus-circle"
                  onPress={() =>
                    navigation.navigate("VendorsDetails", {
                      vendorData: {},
                    })
                  }
                  title="Vendor Details"
                />
              </Text>
            </View>
            <ScrollView>
        <FlatGrid
          itemDimension={300}
          data={vendorData}
          style={styles.gridView}
          spacing={5}
          renderItem={renderItem}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-start',
    borderRadius: 5,
    padding: 10,
    height: 170,
    backgroundColor: '#1abc9c'
  },
  item: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});


export const VendorsList=(props)=>{
  return(
    <TouchableRipple onPress={() => props.onPress()}>
        <Surface>
          <View style={styles.itemContainer} >
            <Text style={styles.item}><Title>Id :</Title>{props?.id}</Text>
            <Text style={styles.item}><Title>Name :</Title>{props?.vendor_name}</Text>
            <Text style={styles.item}><Title>mobile Number :</Title>{props?.mobile_number}</Text>
            <Text style={styles.item}><Title>emailAddress :</Title>{props?.email_address}</Text>
          </View>
        </Surface>
    </TouchableRipple>
  );
   };
  

