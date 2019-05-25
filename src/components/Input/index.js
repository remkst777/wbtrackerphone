import React from "react";
import { TextInput } from "react-native";

import { border_secondary } from "../../styles";

const styles = {
  height: 36,
  borderColor: border_secondary,
  borderWidth: 1,
  borderRadius: 3,
  marginBottom: 5,
  paddingHorizontal: 5
};

const Input = props => <TextInput style={styles} {...props} />;

export default Input;
