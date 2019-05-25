import { ToastAndroid } from "react-native";
import { SERVER_HOST } from "./constants";

const fetchHandler = async (url, method, body, toNotify) => {
  try {
    const response = await fetch(`${SERVER_HOST}${url}`, {
      method,
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });

    const responseJson = await response.json();

    if (response.status !== 200 || (response.status === 200 && toNotify)) {
      ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
    }

    return response.status === 200 ? responseJson : null;
  } catch (err) {
    ToastAndroid.show("Произошла ошибка", ToastAndroid.SHORT);
  }
};

const getDayStat = async body => {
  const step = await fetchHandler("/get-daystat", "post", body);

  return step;
};

const getPeriodStat = async body => {
  const step = await fetchHandler("/get-periodstat", "post", body);

  return step;
};

const getCartList = async body => {
  const step = await fetchHandler("/get-list-of-products", "post", body);

  return step;
};

const startTracking = async body => {
  const toNotify = true;

  const step = await fetchHandler("/start-tracking", "post", body, toNotify);

  return step;
};

const finishTracking = async body => {
  const step = await fetchHandler("/finish-tracking", "post", body);

  return step;
};

export {
  getDayStat,
  getCartList,
  startTracking,
  getPeriodStat,
  finishTracking
};
