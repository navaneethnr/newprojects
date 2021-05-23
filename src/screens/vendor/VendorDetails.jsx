import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Card, TextInput, Snackbar } from "react-native-paper";
import { ScrollView, Text, View, Platform } from "react-native";


const UPDATE_VENDOR = gql`
  mutation MyMutation(
    $vendor_name: String
    $mobile_number: String
    $email_address: String
    $modified_date: date
    $id: bigint
  ) {
    update_organisation_vendor(
      _set: {
        vendor_name: $vendor_name
        mobile_number: $mobile_number
        email_address: $email_address
        modified_date: $modified_date
      }
      where: { id: { _eq: $id } }
    ) {
      affected_rows
    }
  }
`;

const SAVE_VENDOR = gql`
mutation MyMutation(
  $vendor_name: String
  $mobile_number: String
  $email_address: String
  $branch_id: bigint
) {
  insert_organisation_vendor(
    objects: {
      vendor_name: $vendor_name
      mobile_number: $mobile_number
      email_address: $email_address
      branch_id: $branch_id
          }
  ) {
    affected_rows
  }
}
`;

const VendorsDetails = ({ navigation, route }) => {
  const {
    vendor_name,
    mobile_number,
    email_address,
    id,
  } = route.params;
  const vendorName = vendor_name ? vendor_name.toString() : "";
  const mobileNumber = mobile_number ? mobile_number?.toString() : "";
  const vendorId = id ? id.toString() : "";
  const emailAddres = email_address ? email_address.toString() : "";


  const { register, handleSubmit, control, errors } = useForm({
    defaultValues: {
      vendor_name: vendorName,
      mobile_number: mobileNumber,
      email_address: emailAddres,
    },
  });
  const [visible, setVisible] = useState(false);

  const [saveVendor, { data, loading, error }] = useMutation(SAVE_VENDOR);
  const [
    updateVendor,
    { data: updateData, loading: updateDataLoading, error: updateError },
  ] = useMutation(UPDATE_VENDOR);


  const saveOnSubmit = (info) => {
    saveVendor({ variables: info });
  };

  const updateOnSubmit = (info) => {
    info["id"] = vendorId;
    updateVendor({ variables: info });
  };

  return (
    <View>
      <ScrollView>
        <Card>
          <Card.Content>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <View>
                  <TextInput
                    label="VendorName"
                    onBlur={onBlur}
                    mode="outlined"
                    style={{ margin: 5 }}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    dense
                  />
                </View>
              )}
              name="vendor_name"
              rules={{ required: true, maxLength: 30, pattern: /^[A-Za-z]+$/i }}
              defaultValue={vendor_name}
            />
                       <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <View>
                  
                  <TextInput
                    label="mobileNumber"
                    onBlur={onBlur}
                    mode="outlined"
                    style={{ margin: 5 }}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    dense
                  />
                </View>
              )}
              name="mobile_number"
              rules={{ required: true, maxLength: 10, pattern: /^[0-9]+$/i }}
              defaultValue={mobile_number}
            />
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <View>
                  <TextInput
                    label="emailAddress"
                    onBlur={onBlur}
                    mode="outlined"
                    style={{ margin: 5 }}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    dense
                  />
                </View>
              )}
              name="email_address"
              rules={{ required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ }}
              defaultValue={email_address}
            />
            
            <View style={{ margin: 5 }}>
              {id ? (
                <Button
                  style={{ marginLeft: 2, marginRight: 2 }}
                  mode="contained"
                  onPress={handleSubmit(updateOnSubmit)}
                >
                  Update vendor Details
                </Button>
              ) : (
                <Button
                  style={{ marginLeft: 2, marginRight: 2 }}
                  mode="contained"
                  onPress={handleSubmit(saveOnSubmit)}
                >
                  Save vendor Details
                </Button>
              )}
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
      <Snackbar
        style={{ backgroundColor: "green", position: "relative" }}
        visible={visible}
        onDismiss={dismissSnackBar}
      >
        {snackbarInfo}
      </Snackbar>
    </View>
  );
};
export default VendorsDetails;
