import React, { useEffect } from "react";
import Root from "./Navigators/Root";
import BootSplash from "react-native-bootsplash";
import { ToastAndroid } from "react-native";
const App=()=>{
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      ToastAndroid.show("Welcome to Lemon Player",ToastAndroid.SHORT)
    });
  }, []);
  return<Root/>
}
export default App