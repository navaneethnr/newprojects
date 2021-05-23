import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import {
  Drawer,
  IconButton,
  Switch,
  Text,
  TouchableRipple,
} from "react-native-paper";
import { PreferencesContext } from "../context/preferencesContext";

export function DrawerContent({ navigation }) {
  const { theme, toggleTheme } = useContext(PreferencesContext);

  const posts = [

    { id: 6, label: "Vendor", page: "Vendors", icon: "account-box" },
  ];

  return (
    <DrawerContentScrollView>
      <Drawer.Section>
        <View style={styles.preference}>
          <Text>Close</Text>
          <View>
            <IconButton onPress={navigation.goBack} icon="window-close" />
          </View>
        </View>
      </Drawer.Section>
      <Drawer.Section>
        <TouchableRipple onPress={toggleTheme}>
          <View style={styles.preference}>
            <Text>Dark Theme</Text>
            <View pointerEvents="none">
              <Switch value={theme === "dark"} />
            </View>
          </View>
        </TouchableRipple>
      </Drawer.Section>

      <View>
        {posts.map((post) => (
          <DrawerItem
            key={post.id}
            icon={() => (
              <IconButton
                onPress={() => navigation.navigate(post.page)}
                icon={post.icon}
              />
            )}
            label={post.label}
            onPress={() => navigation.navigate(post.page)}
          />
        ))}
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
