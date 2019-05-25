import React from "react";
import { Text, View, Image } from "react-native";

import { cartRoute, settingsRoute } from "../../routes";
import { text_primary, text_dark, border_secondary } from "../../styles";

import stat_period_img from "../../images/stat_period.jpg";
import items_list_img from "../../images/items_list.jpg";
import stat_day_img from "../../images/stat_day.jpg";

const Home = ({ navigation }) => (
  <View>
    <View style={styles.paragraph}>
      <Text style={styles.text}>
        Вы можете следить за историей изменения цены товара в виде графиков, а
        также получать уведомления, если стоимость снизилась.
      </Text>
    </View>

    <View style={styles.imageContainer}>
      <Image source={stat_day_img} style={styles.image} />
    </View>

    <View style={styles.paragraph}>
      <Text style={styles.text}>
        Данная статистика отображает данные за месяц, красный график - с
        минимальной стоимостью товара в течение дня, синий - с усредненной.
      </Text>
    </View>

    <View style={styles.imageContainer}>
      <Image source={stat_period_img} style={styles.image} />
    </View>

    <View style={styles.paragraph}>
      <Text style={styles.text}>
        Для начала работы введите артикул товара в текстовое поле{" "}
        <Text
          onPress={() => navigation.navigate(cartRoute)}
          style={styles.link}
        >
          на вкладке Треки
        </Text>
      </Text>
    </View>

    <View style={styles.imageContainer}>
      <Image source={items_list_img} style={styles.image} />
    </View>

    <View style={styles.paragraph}>
      <Text>Данные обновляются каждый час.</Text>
    </View>

    <View style={styles.paragraph}>
      <Text style={styles.text}>
        Если Вы хотите получать своевременные оповещения о снижении стоимости
        товара{" "}
        <Text
          onPress={() => navigation.navigate(settingsRoute)}
          style={styles.link}
        >
          - укажите свой email.
        </Text>
      </Text>
    </View>
  </View>
);

const styles = {
  paragraph: {
    marginBottom: 15
  },
  link: {
    color: text_primary
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 15
  },
  image: {
    width: 210,
    height: 250,
    resizeMode: "contain",
    borderWidth: 1,
    borderColor: border_secondary
  },
  text: {
    alignSelf: "stretch",
    textAlign: "justify",
    letterSpacing: 0.5
  }
};

export default Home;
