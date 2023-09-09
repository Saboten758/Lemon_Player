import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ImageBackground,StyleSheet,Text, Dimensions, TouchableOpacity, ToastAndroid, useWindowDimensions, ScrollView, View } from "react-native";
import { Card } from "react-native-paper";
import SystemNavigationBar from "react-native-system-navigation-bar";
import TrackPlayer, { RepeatMode, State, useTrackPlayerEvents,Event, usePlaybackState } from "react-native-track-player";
import Icon from 'react-native-vector-icons/AntDesign';
import DocumentPicker from 'react-native-document-picker'
const quotes=['ｈｅｌｌｏ░ｔｈｅｒｅ　（可握ヾ','ｗｏａｈ　（音為ヤ）','丹冊ヨ尺工亡丹','🅲🅷🅸🅻🅻','【j】【u】【n】【g】【l】【e】','ｃｏｏｌ　ぬ佳ヒ','尸し丹とヨ尺','ｍｅｌｏｎ　りタォ','ｓｐａｃｅ　ワな億','【﻿ｒａｄａｒ】','ｌｏｖｅ　ロ気ノ','ｂａｓｓ　ス芋ゖ','丂丨Ꮆ几卂ㄥ','(-_-) Ĺเⓕᗴ (-_-)','ｐｈｏｎｅ　陰ぃヂ','ｌｅｍｏｎ　域とス','₮ɆⱠɆ₲Ɽ₳₱Ⱨ']
const x=Number((Math.random()*(quotes.length-1)).toFixed(0))
const Home=()=>{
    async function handlePlayPress() {
      if(await TrackPlayer.getState() == State.Playing) {
        ToastAndroid.show("Playback Paused!",ToastAndroid.SHORT)
        TrackPlayer.pause();
      }
      else {
        TrackPlayer.play();
      }
    }
    const playerState = usePlaybackState();
    

  const open = async () => {

    try {
            var x=false
             if(await TrackPlayer.getState() == State.Playing) {
                x=true;
              }
              else {
                x=false;
              }
      
      const result = await DocumentPicker.pick({
        transitionStyle:'flipHorizontal',
        presentationStyle:'overFullScreen',
        type: [DocumentPicker.types.audio],
        allowMultiSelection: true
      });
      const queue = await TrackPlayer.getQueue();

      // Extract the IDs from the tracks
      const songIds = queue.map(track => track.id);

      if (result.length==1){
            const current=result[0]     
            var f=0
            for (var i=0;i<songIds.length;i++){
              if (songIds[i]==current.name){
                  f=1
                  break
              }
            }
            if (f!=1){
            
              await TrackPlayer.add([
                {
                  id:String(current.name),
                  url: current.uri,
                  artist:"Added From Local Storage",
                  title:String(current.name),
                  artwork:require('../assets/default.jpg'),
                  duration:0
                
                },       
                
                ]);
                x?TrackPlayer.play():TrackPlayer.pause();  //continue playback
                await TrackPlayer.setRepeatMode(RepeatMode.Queue);
              
              ToastAndroid.show(`${result[0]['name']} was added to playlist!`,ToastAndroid.SHORT)
            }
            else{
              ToastAndroid.show(`${result[0]['name']} was already present in the playlist!`,ToastAndroid.SHORT)
            }
            
          
      }
      else{
            
            for(var i=0;i<result.length;i++){
              const current=result[i]     
              var f=0
              for (var j=0;j<songIds.length;j++){
                if (songIds[j]==current.name){
                    f=1
                    break
                }
              }
              if (f!=1){
              
                await TrackPlayer.add([
                  {
                    id:String(current.name),
                    url: current.uri,
                    artist:"Added From Local Storage",
                    title:String(current.name),
                    artwork:require('../assets/default.jpg'),
                    duration:0
                  
                  },       
                  
                  ]);
                  x?TrackPlayer.play():TrackPlayer.pause() //contiue playback
                  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
              }
            }
            
            ToastAndroid.show(`${result.length} songs were added to playlist!`,ToastAndroid.SHORT)   
            ToastAndroid.show(`Similar Items were skipped!`,ToastAndroid.SHORT)   

      }
      
     
      
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
        <View style={styles.header}>
          <Text style={{fontSize:15}}>{quotes[x]}</Text>
          <Icon.Button
            name={playerState == State.Playing ? 'pause' : 'play'}
            size={40}
            color={'#AD8C9C'}
            backgroundColor="transparent"
            style={{margin:10}}
            onPress={handlePlayPress}/>
          </View>
        <ImageBackground source={require('../assets/city_dark.gif')}style={styles.container}>
          
          <Text style={[styles.head,{marginBottom:20}]}>Music & Radio</Text>
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
  header:{
    backgroundColor:'#3D3C49',
    alignItems:'center',
    justifyContent:'center',
    flex:0.2,
    flexDirection:'row'
  },
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#668285',
      padding:25,
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