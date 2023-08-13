import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar } from "react-native";
import MainNav from "./MainNav";
import Music from "../Screens/Music";

const Stack=createNativeStackNavigator();

const Root=()=>{
    return (
        <NavigationContainer>
        <StatusBar hidden/>
        <Stack.Navigator>
        <Stack.Screen  name="Root" component={MainNav} options={{
            headerShown:false
        }}/>
        <Stack.Screen name="Music" component={Music}/>
        </Stack.Navigator>
    </NavigationContainer>
    )
}

export default Root;