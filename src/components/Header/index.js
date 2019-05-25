import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { homeRoute } from "../../routes";
import { bg_main_color, text_light } from "../../styles";

const Header = ({ navigation }) => (
  <View style={styles.nav}>
    <View style={styles.navItem}>
      <Text
        onPress={() => navigation.navigate(homeRoute)}
        style={styles.navText}
      >
        WILDBERRIES TRACKER
      </Text>
    </View>
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
    paddingTop: 28,
    paddingBottom: 12
  },
  navText: {
    color: text_light,
    fontSize: 14,
    letterSpacing: 1
  }
};

export default Header;
