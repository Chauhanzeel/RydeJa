import AsyncStorage from "@react-native-async-storage/async-storage";

interface Data {
  [key: string]: any;
}

class AsyncStorageHelper {
  static async set(key: string, value: Data): Promise<void> {
    const existingValue = await AsyncStorage.getItem(key);
    const parsedExistingValue = existingValue ? JSON.parse(existingValue) : {};
    const newValue = { ...parsedExistingValue, ...value };

    await AsyncStorage.setItem(key, JSON.stringify(newValue));
  }

  static async get(key: string): Promise<Data> {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : {};
  }
}

export default AsyncStorageHelper;
