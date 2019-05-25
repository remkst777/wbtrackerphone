import React, { useState } from "react";

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage
} from "react-native";

import Input from "../../components/Input";
import PrimaryButton from "../../components/Button/PrimaryButton";
import Loader from "../../components/Loader";

import Settings from "../../containers/Settings";

import { navigateToCartItem } from "../../routes";
import { text_dark, border_secondary, bg_light } from "../../styles";

import { getTimezoneDifference } from "../../utils/dates";

import {
  getArrayFromStorage,
  setArrayToStorage,
  removeItemFromArrayStorage
} from "../../utils/storage";

import {
  getCartList,
  startTracking,
  finishTracking
} from "../../utils/fetchHandler";

import { USER_EMAIL } from "../../utils/constants";

import { STORAGE_LIST } from "./constants";

const timezoneDiff = getTimezoneDifference();

class Cart extends React.PureComponent {
  state = {
    input: "",
    startTrackingLoading: false,
    products: [],
    productsLoading: false
  };

  componentDidMount = async () => {
    this.getCartList();
  };

  getCartList = async () => {
    this.setState({ productsLoading: true });

    const articulList = await getArrayFromStorage(STORAGE_LIST);
    const response = await getCartList({ articulList, timezoneDiff });

    this.setState({
      productsLoading: false,
      products: response ? response.list : products
    });
  };

  startTracking = async () => {
    const email = await AsyncStorage.getItem(USER_EMAIL);

    Settings.noEmailAlert(async () => {
      const { input, products } = this.state;

      this.setState({ startTrackingLoading: true, email });

      const res = await startTracking({ articul: input, email });

      if (res) {
        const storeList = await getArrayFromStorage(STORAGE_LIST);

        if (!storeList.includes(input)) {
          setArrayToStorage(STORAGE_LIST, [...storeList, input]);
          this.setState({ products: [res.item, ...products] });
        }
      }

      this.setState({ startTrackingLoading: false });
    }, this.props.navigation);
  };

  finishTracking = async articul => {
    const email = await AsyncStorage.getItem(USER_EMAIL);

    const updatedProducts = this.state.products.filter(
      x => +x.articul !== +articul
    );

    this.setState({ products: updatedProducts });
    removeItemFromArrayStorage(STORAGE_LIST, articul);

    finishTracking({ articul, email });
  };

  render() {
    const {
      startTrackingLoading,
      input,
      productsLoading,
      products
    } = this.state;

    const { navigation } = this.props;

    return (
      <View>
        <View style={styles.paragraph}>
          <Input
            keyboardType="numeric"
            maxLength={8}
            onChangeText={x => this.setState({ input: x })}
            value={input}
          />

          <PrimaryButton
            disabled={startTrackingLoading || !input}
            onPress={this.startTracking}
            title={startTrackingLoading ? "Обработка..." : "Начать трекинг"}
          />
        </View>

        <View style={styles.paragraph}>
          {products.map(x => (
            <TouchableOpacity
              key={x.articul}
              style={{ ...styles.listItem, ...styles.paragraph }}
              onPress={() =>
                navigation.navigate(...navigateToCartItem(x.articul))
              }
            >
              <Image style={styles.image} source={{ uri: x.imageLink }} />

              <View style={styles.listItem}>
                <View style={styles.listItemDescription}>
                  <Text>Артикул: {x.articul}</Text>
                  <Text>{x.name}</Text>
                </View>

                <TouchableOpacity
                  onPress={() => this.finishTracking(x.articul)}
                  style={styles.deleteIcon}
                >
                  <Text>✖</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Loader ngIf={productsLoading} />

        {!products[0] &&
          !productsLoading && (
            <Text style={styles.notification}>
              Вы пока не добавили трекеры, исправьте это как можно скорее!
            </Text>
          )}
      </View>
    );
  }
}

const styles = {
  paragraph: {
    marginBottom: 10
  },
  notification: {
    fontSize: 16,
    color: text_dark
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "cover"
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch"
  },
  listItemDescription: {
    flex: 1,
    flexWrap: "wrap",
    marginHorizontal: 10,
    justifyContent: "center"
  },
  deleteIcon: {
    paddingLeft: 20,
    justifyContent: "center"
  }
};

export default Cart;
