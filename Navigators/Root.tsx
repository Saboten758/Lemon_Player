import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar,View,Text } from "react-native";
import MainNav from "./MainNav";
import Music from "../Screens/Music";

import Gran from "../Others/GranBlue";



import Web from "../Others/Web";
import Games from "../Screens/Games";
import Manga from "../Screens/Manga";
import Web2 from "../Others/Web2";
import Shows from "../Screens/Shows";

import Playlists from "../Screens/Playlists";

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
        <Stack.Screen name="Playlists" component={Playlists} options={() => ({
          headerTitle: (props) => <LogoTitle {...props} name={"Now Playing"} />,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        })}/>
     
        <Stack.Screen  name="Web" component={Web}  options={{
            headerShown:false
            
        }}/>
          <Stack.Screen  name="Web2" component={Web2}  options={{
            headerShown:false
            
        }}/>

        <Stack.Screen  name="Gran" component={Gran}  options={{
            headerShown:false
            
        }}/>
        <Stack.Screen name="Games" component={Games} options={() => ({
          headerTitle: (props) => <LogoTitle {...props} name={"Games"} />,
          headerStyle: {
            backgroundColor: '#3D3C49',
          },
          headerTintColor: 'white',
        })}/>
        <Stack.Screen name="Shows" component={Shows} options={() => ({
          headerTitle: (props) => <LogoTitle {...props} name={"T.V. Shows"} />,
          headerStyle: {
            backgroundColor: '#3D3C49',
          },
          headerTintColor: 'white',
        })}/>
        <Stack.Screen name="Manga" component={Manga} options={() => ({
          headerTitle: (props) => <LogoTitle {...props} name={"Manga"} />,
          headerStyle: {
            backgroundColor: '#3D3C49',
          },
          headerTintColor: 'white',
        })}/>
     
       
      
       
       
        </Stack.Navigator>
    </NavigationContainer>
    )
}

export default Root;