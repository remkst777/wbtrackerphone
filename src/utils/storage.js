import { AsyncStorage } from "react-native";

const getArrayFromStorage = async key => {
  const listFromStorage = await AsyncStorage.getItem(key);

  try {
    const parsedList = await JSON.parse(listFromStorage);
    return parsedList || [];
  } catch (err) {
    return [];
  }
};

const setArrayToStorage = (key, arr) => {
  AsyncStorage.setItem(key, JSON.stringify(arr));
};

const removeItemFromArrayStorage = async (key, item) => {
  const arr = await getArrayFromStorage(key);
  const updatedArr = arr.filter(x => +x !== +item);

  await setArrayToStorage(key, updatedArr);
};

export { getArrayFromStorage, setArrayToStorage, removeItemFromArrayStorage };
