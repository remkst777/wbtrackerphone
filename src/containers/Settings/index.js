import React from "react";
import { Text, View, AsyncStorage, Alert } from "react-native";

import { settingsRoute } from "../../routes";

import Input from "../../components/Input";
import PrimaryButton from "../../components/Button/PrimaryButton";

import { USER_EMAIL, REMIND_EMAIL } from "../../utils/constants";
import { validateEmail } from "../../utils/validate";

class Settings extends React.PureComponent {
  state = {
    email: null,
    storedEmail: null
  };

  static noEmailAlert = async (onPress, navigation) => {
    const store = await AsyncStorage.multiGet([USER_EMAIL, REMIND_EMAIL]);

    const email = store[0][1];
    const notRemind = JSON.parse(store[1][1]);

    if (email || (!email && notRemind)) {
      onPress();
      return null;
    }

    Alert.alert(
      "Вы не указали email",
      "Чтобы получить уведомление о снижении стоимости данного товара, Вам необходимо оставить email",
      [
        {
          text: "Не нужно",
          onPress: () => {
            AsyncStorage.setItem(REMIND_EMAIL, "true");
            onPress();
          }
        },
        { text: "Не сейчас", style: "cancel", onPress },
        { text: "Ок", onPress: () => navigation.navigate(settingsRoute) }
      ],
      { cancelable: false }
    );
  };

  async componentWillMount() {
    const storedEmail = await AsyncStorage.getItem(USER_EMAIL);
    this.setState({ storedEmail, email: storedEmail });
  }

  deleteEmail = async () => {
    await AsyncStorage.setItem(USER_EMAIL, "");
    await this.componentWillMount();
  };

  saveEmail = async () => {
    const { email } = this.state;

    await AsyncStorage.setItem(USER_EMAIL, email);
    await this.componentWillMount();
  };

  render() {
    const { email, storedEmail } = this.state;

    const emailEqual = email === storedEmail;

    return (
      <View>
        <View style={styles.paragraph}>
          <Text>Ваш email: {storedEmail || "Не указано"}</Text>
        </View>

        <View style={styles.paragraph}>
          <Text>
            Чтобы получить уведомление о снижении стоимости товара - укажите
            email.
          </Text>
        </View>

        <View style={styles.paragraph}>
          <Input
            keyboardType="email-address"
            textContentType="emailAddress"
            onChangeText={x => this.setState({ email: x })}
            value={email}
          />

          <PrimaryButton
            onPress={emailEqual ? this.deleteEmail : this.saveEmail}
            disabled={validateEmail(email)}
            title={emailEqual && storedEmail ? "Удалить" : "Сохранить"}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  paragraph: {
    marginBottom: 10
  }
};

export default Settings;
