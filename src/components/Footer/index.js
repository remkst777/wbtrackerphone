import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";

import { cartRoute, homeRoute } from "../../routes";
import { bg_main_color, text_light } from "../../styles";

const Footer = ({ navigation }) => (
  <View style={styles.nav}>
    <TouchableOpacity
      onPress={() => navigation.navigate(homeRoute)}
      style={styles.navItem}
    >
      <Text style={styles.navText}>Главная</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => navigation.navigate(cartRoute)}
      style={styles.navItem}
    >
      <Text style={styles.navText}>Треки</Text>
    </TouchableOpacity>
  </View>
);

const styles = {
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: bg_main_color
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12
  },
  navText: {
    color: text_light,
    fontSize: 14,
    letterSpacing: 1
  }
};

export default Footer;
