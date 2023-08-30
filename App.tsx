import React, { useEffect, useState } from "react";
import Root from "./Navigators/Root";
import BootSplash from "react-native-bootsplash";
import { Alert, Linking, ToastAndroid } from "react-native";
import axios from "axios";
import SystemNavigationBar from "react-native-system-navigation-bar";

import { addTracks, setupPlayer } from "./Screens/trackplayer";
import TrackPlayer from "react-native-track-player";

const App=()=>{

  const [latestVersion, setLatestVersion] = useState("");
  const currentVersion = "1.4"; 
  SystemNavigationBar.setNavigationColor('#3D3C49')
  useEffect(() => {
    const init = async () => {
      await setupPlayer()
      const queue = await TrackPlayer.getQueue();
      if(queue.length <= 0) {
        await addTracks();
      }
      axios.get("https://api.github.com/repos/Saboten758/Lemon_Player/releases/latest")
      .then(response => {
        const latestRelease = response.data;
        setLatestVersion(latestRelease.tag_name);

        if (latestRelease.tag_name !== currentVersion) {
    
          Alert.alert("Your app is not up to date!",`Please update to the latest version from Github!\n\nCurrent Version: ${currentVersion}\nLatest Stable Version: ${latestRelease.tag_name}`,[{text:'Open Github',onPress: ()=>Linking.openURL("https:github.com/Saboten758/Lemon_Player/releases/latest")},{text:'Cancel'}]);
        }
        else{
          ToastAndroid.showWithGravity("Your App is upto date!",1000,9)
        }
      })
      .catch(error => {
        Alert.alert("Error","New Version can't be fetched from GitHub! Check Your Internet Connection!");
      });
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      ToastAndroid.show("Welcome to Lemon Player",ToastAndroid.SHORT)
    });
  }, []);
  return<Root/>
}
export default App