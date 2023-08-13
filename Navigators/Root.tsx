import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar,View,Text } from "react-native";
import MainNav from "./MainNav";
import Music from "../Screens/Music";

const Stack=createNativeStackNavigator();

const LogoTitle=({name})=>{
    return(<View style={{flex:1}}><Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>{name}</Text></View>)
  }

const Root=()=>{
    return (
        <NavigationContainer>
        <StatusBar showHideTransition={"slide"} barStyle={'light-content'} backgroundColor={'#3D3C49'}/>
        <Stack.Navigator>
        <Stack.Screen  name="Root" component={MainNav} options={{
            headerShown:false
        }}/>
        <Stack.Screen name="Music" component={Music} options={() => ({
          headerTitle: (props) => <LogoTitle {...props} name={"Radio"} />,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        })}/>
        </Stack.Navigator>
    </NavigationContainer>
    )
}

export default Root;