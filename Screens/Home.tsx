import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ImageBackground,StyleSheet,Text, Dimensions, TouchableOpacity, ToastAndroid, useWindowDimensions, ScrollView } from "react-native";
import { Card } from "react-native-paper";
import SystemNavigationBar from "react-native-system-navigation-bar";
import TrackPlayer, { RepeatMode } from "react-native-track-player";
import Icon from 'react-native-vector-icons/AntDesign';
import DocumentPicker from 'react-native-document-picker'

const Home=()=>{
  

  const open = async () => {
    try {
      
      
      const result = await DocumentPicker.pick({
        transitionStyle:'partialCurl',
        type: [DocumentPicker.types.audio],
      
      });
      
      const x=result[0]['uri']
     
      await TrackPlayer.add([
        {
          id:String(result[0]['name']),
          url: x,
          artist:"Added From Local Storage",
          title:String(result[0]['name']),
          artwork:require('../assets/default.jpg'),
          duration:0,
        
        },       
        
        ]);
        await TrackPlayer.setRepeatMode(RepeatMode.Queue);
        
        ToastAndroid.show(`${result[0]['name']} was added to playlist!`,ToastAndroid.SHORT)
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('User cancelled the document picker.');
      } else {
        console.log('Error selecting document:', error);
      }
    }
  };
  useEffect( ()=>{SystemNavigationBar.navigationShow()},[])
 
  const nav=useNavigation()
    return(
      <ScrollView contentContainerStyle={{flexGrow: 1}} >
        <ImageBackground source={require('../assets/city_dark.gif')}style={styles.container}>
          <Text style={styles.head}>Music & Radio</Text>
          <Card>
      <Card.Cover
              source={require('../assets/zoom.gif')}
              style={[styles.city,{width:Dimensions.get("screen").width-40}]}
            />
      </Card>
          <TouchableOpacity style={[styles.button,{marginTop:30}]}onPress={()=>{nav.navigate('Music')}}><Text style={styles.txt}>Music Player </Text><Icon name="play" color={'#cccccc'} size={25}style={{marginStart:5}}/></TouchableOpacity>
          <TouchableOpacity style={styles.button}onPress={open}><Text style={styles.txt}>Add Songs From Local Storage </Text><Icon name="select1" color={'#cccccc'} size={25}style={{marginStart:5}}/></TouchableOpacity>
        </ImageBackground>
        </ScrollView>
    )
}

export default Home;

const styles=StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#668285',
    },
    head:{
      color:'black',
      fontFamily:'BebasNeue-Regular',
      fontSize:56,
    },
   txt:{
    fontSize:18,
    flexWrap:'wrap',
    fontFamily:'BebasNeue-Regular',
    color:'#AD8C9C'
   },
    button:{
      
      borderRadius:20,
      flexDirection:'row',
      backgroundColor:'black',
      alignItems:'center',
      justifyContent:'center',
      height:80,
      elevation:4,
      width:280,
      padding:10,
      marginBottom:20,
    },
    city:{
      height:240,
      width:380,
      
    },
  })