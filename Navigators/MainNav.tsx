import React from "react";
import { Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from "../Screens/Home";
import SettingsPage from "../Screens/SettingsPage";
import Games from "../Screens/Games";
import Manga from "../Screens/Manga";


const Tab = createMaterialTopTabNavigator();
const MainNav=()=>{
  return (
    <Tab.Navigator tabBarPosition="bottom" initialLayout={{width: Dimensions.get('window').width}} screenOptions={{
      tabBarAndroidRipple: { borderless: false },
      tabBarStyle: { backgroundColor: '#3D3C49'},
      tabBarActiveTintColor: "#AD8C9C",
      tabBarInactiveTintColor: '#E3F4F6',

  }}>
      <Tab.Screen name="Player" component={Home}  />
      <Tab.Screen name="Games" component={Games} />
      <Tab.Screen name="Manga" component={Manga} />
      <Tab.Screen name="Info" component={SettingsPage} />
      
    </Tab.Navigator>
  );
}

export default MainNav

