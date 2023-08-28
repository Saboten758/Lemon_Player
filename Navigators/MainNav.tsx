import React from "react";
import { Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from "../Screens/Home";
import SettingsPage from "../Screens/SettingsPage";
import Explore from "../Screens/Explore";
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createMaterialTopTabNavigator();
const MainNav=()=>{
  return (
    <Tab.Navigator tabBarPosition="bottom" initialLayout={{width: Dimensions.get('window').width}} screenOptions={{
      tabBarAndroidRipple: { borderless: false },
      tabBarStyle: { backgroundColor: '#3D3C49'},
      tabBarActiveTintColor: "#AD8C9C",
      tabBarInactiveTintColor: '#E3F4F6',
      tabBarShowLabel:false

  }}>
      <Tab.Screen name="Player" component={Home} options={{
     
          tabBarIcon: ({ color }) => (
            <Icon name="music" size={18} color={color} />
          ),
        }} />
      <Tab.Screen name="Explore" component={Explore} options={{
     
     tabBarIcon: ({ color }) => (
       <Icon name="coffee" size={18} color={color} />
     ),
   }} />
      <Tab.Screen name="Info" component={SettingsPage} options={{
     
     tabBarIcon: ({ color }) => (
       <Icon name="lemon-o" size={18} color={color} />
     ),
   }} />
      
    </Tab.Navigator>
  );
}

export default MainNav

