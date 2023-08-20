import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar,View,Text } from "react-native";
import MainNav from "./MainNav";
import Music from "../Screens/Music";
import MyWebComponent from "../Others/SimpleMmo";
import Gran from "../Others/GranBlue";
import MangaDex from "../Others/Mangadex";
import Mangato from "../Others/Mangato";
import Toonily from "../Others/Toonily";
import Yoo from "../Others/YtM";
import Spot from "../Others/Spot";
import Kuru from "../Others/Kuru";
import Games from "../Screens/Games";

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
        <Stack.Screen  name="Web" component={MyWebComponent} options={{
            headerShown:false
        }}/>
      
        <Stack.Screen  name="Gran" component={Gran}  options={{
            headerShown:false
            
        }}/>
        <Stack.Screen  name="MangaDex" component={MangaDex} options={{
            headerShown:false
        }}/>
        <Stack.Screen  name="MangaTo" component={Mangato} options={{
            headerShown:false
        }}/>
        <Stack.Screen  name="Toonily" component={Toonily} options={{
            headerShown:false
        }}/>
        <Stack.Screen  name="Kuru" component={Kuru} options={{
            headerShown:false
        }}/>
       
        </Stack.Navigator>
    </NavigationContainer>
    )
}

export default Root;