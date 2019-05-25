import React from "react";
import { Text, View, ScrollView } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";

import {
  homeRoute,
  cartRoute,
  cartItemRoute,
  settingsRoute
} from "../../routes";

import Home from "../Home";
import Cart from "../Cart";
import CartItem from "../CartItem";
import Settings from "../Settings";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

const styles = {
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 15,
    marginBottom: 15
  }
};

const Wrapper = ({ X, props }) => (
  <View style={styles.container}>
    <Header {...props} />

    <ScrollView style={styles.content}>
      <X {...props} />
    </ScrollView>
  </View>
);

const TabNavigator = createBottomTabNavigator(
  {
    [homeRoute]: props => <Wrapper X={Home} props={props} />,
    [cartItemRoute]: props => <Wrapper X={CartItem} props={props} />,
    [cartRoute]: props => <Wrapper X={Cart} props={props} />,
    [settingsRoute]: props => <Wrapper X={Settings} props={props} />
  },
  {
    defaultNavigationOptions: {
      tabBarComponent: props => <Footer {...props} />
    }
  }
);

export default createAppContainer(TabNavigator);
