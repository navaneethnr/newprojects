import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Appbar,useTheme } from "react-native-paper";
import Vendors from "../screens/vendor/Vendor";
import VendorsDetails from "../screens/vendor/VendorDetails";

const Stack = createStackNavigator();

export const StackNavigator = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Vendors"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => {
          const { options } = scene.descriptor;
          const title =
            options.headerTitle !== undefined
              ? options.headerTitle
              : options.title !== undefined
                ? options.title
                : scene.route.name;

          return (
            <Appbar.Header
              theme={{ colors: { primary: theme.colors.surface } }}
            >
                <Appbar.BackAction
                  onPress={navigation.goBack}
                  color={theme.colors.primary}
                />
              <Appbar.Content
                title={title}
                titleStyle={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: theme.colors.primary,
                }}
              />
            </Appbar.Header>
          );
        },
      }}
    >
      <Stack.Screen
        name="Vendors"
        component={Vendors}
        options={{ headerTitle: "APPDEMO" }}
      />
      <Stack.Screen
        name="VendorsDetails"
        component={VendorsDetails}
        options={{ headerTitle: "DetailsScreen" }}
      />
    </Stack.Navigator>
  );
};
