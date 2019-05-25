import React from "react";
import { ActivityIndicator } from "react-native";
import { text_primary } from "../../styles";

const styles = {
  marginTop: 10,
  marginBottom: 10
};

const Loader = ({ ngIf }) =>
  ngIf ? (
    <ActivityIndicator
      ngIf={ngIf}
      style={styles}
      size="large"
      color={text_primary}
    />
  ) : null;

export default Loader;
