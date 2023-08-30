import Slider from "@react-native-community/slider";
import React, { useEffect, useState } from "react";
import { Text,Dimensions, Image, StyleSheet, TouchableOpacity, View } from "react-native";

import DocumentPicker from 'react-native-document-picker'
import { SafeAreaView } from "react-native-safe-area-context";
import TrackPlayer, { RepeatMode, State, usePlaybackState } from "react-native-track-player";
import Icon from 'react-native-vector-icons/Ionicons';

const {width,height}=Dimensions.get('window')
const Music2=()=>{
    const playerState = usePlaybackState();
    
    async function handlePlayPress() {
      if(await TrackPlayer.getState() == State.Playing) {
        TrackPlayer.pause();
      }
      else {
        TrackPlayer.play();
      }
    }
    const open = async () => {
        try {
          
          
          const result = await DocumentPicker.pick({
            transitionStyle:'partialCurl',
            
          
          });
          
          const x=result[0]['uri']
          console.log(result)
          await TrackPlayer.add([
            {
              id:String(result[0]['name']),
              url: x,
              artist:"Nightwave Plaza: A tranquil oasis of lo-fi hip hop and chill beats.",
              title:String(result[0]['name']),
              artwork:require('../assets/plaza.png'),
              duration:0,
            
            },       
            
            ]);
            await TrackPlayer.setRepeatMode(RepeatMode.Queue);
    
        } catch (error) {
          if (DocumentPicker.isCancel(error)) {
            console.log('User cancelled the document picker.');
          } else {
            console.log('Error selecting document:', error);
          }
        }
      };
    const [col,setCol]=useState(0)
   
    return(
        <SafeAreaView style={styles.container}>
        <View style={styles.main_container}>
            <Image resizeMode={'cover'} source={require("../assets/eve.jpg")} style={styles.album_art}/>

            <View style={styles.song_info}>
            <Text style={styles.song_name}>Song Title </Text>
            <Text style={styles.txt2}>Song Title </Text>
            </View>

            <View>
            <Slider
            style={styles.prog}
            value={10}
            minimumValue={0}
            maximumValue={100}
            thumbTintColor="pink"
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            onSlidingComplete={()=>{}}
            />
                <View style={styles.pr_txt}>
                <Text style={styles.txt3}>00:00 </Text>
                <Text style={styles.txt3}>00:00 </Text>
            </View>
            </View>
            <View style={styles.music_ctrl}>
                 <TouchableOpacity style={{marginEnd:10,marginStart:10,alignItems:'center'}} onPress={()=>{setCol(1)}}>
                        <Icon color={"white"} name={!(col==1)?"play-skip-back-outline":"play-skip-back"} size={30}/>
                </TouchableOpacity>
                <TouchableOpacity style={{marginEnd:10,marginStart:10,alignItems:'center'}} onPress={handlePlayPress}>
                        <Icon color={"white"}  name={playerState == State.Playing ? 'pause' : 'play'}  size={50}/>
                </TouchableOpacity>
                <TouchableOpacity style={{marginEnd:10,marginStart:10,alignItems:'center'}} onPress={()=>{setCol(3)}}>
                        <Icon color={"white"} name={!(col==3)?"play-skip-forward-outline":"play-skip-forward"} size={30}/>
                </TouchableOpacity>
            </View>
            
        </View>
        <View style={styles.bot}>
            <View style={styles.icon}>
                <TouchableOpacity style={{marginEnd:10,marginStart:10,alignItems:'center'}} onPress={open}>
                <Icon color={"white"} name={"star"} size={30}/>
                <Text style={styles.txt}>PLAYER</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginEnd:10,marginStart:10,alignItems:'center'}}>
                <Icon color={'white'} name="repeat" size={30}/>
                <Text style={styles.txt}>REPEAT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginEnd:10,marginStart:10,alignItems:'center'}}>
                <Icon color={'white'} name="share-outline" size={30}/>
                <Text style={styles.txt}>SHARE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginEnd:10,marginStart:10,alignItems:'center'}}>
                <Icon color={'white'} name="ellipsis-horizontal" size={30}/>
                <Text style={styles.txt}>MORE</Text>
                </TouchableOpacity>

            </View>

            
           
        </View>
        </SafeAreaView>
    )
}

export default Music2;

const styles=StyleSheet.create({
    album_art:{
        alignItems:"center",
        width:300,
        height:340,
        borderRadius:20,
      
      
    },
    main_container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        
    },
    music_ctrl:{
        flexDirection:'row',
        alignItems:'center',
        width:'60%',
        marginTop:10,
        justifyContent:'space-evenly'
    },
    pr_txt:{
        width:350,
        flexDirection:'row',
        justifyContent:"space-between"

    },
    icon:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'80%'
    },
    prog:{
        width:350,
        height:40,
        marginTop:42,
        flexDirection:"row"
    },
    bot:{
        paddingVertical:10,
        width:width,
        alignItems:"center",
        borderTopWidth:1,
        borderColor:'white',
        borderTopEndRadius:10,
        borderTopStartRadius:10,
    },
    song_info:{
        alignItems:'center'
    },
    song_name:{
        marginTop:10,
        color:'white',
        fontFamily:'Caveat-VariableFont_wght',
        fontSize:45
    },
    txt2:{
        marginTop:10,
        color:'white',
        fontFamily:'Caveat-VariableFont_wght',
        fontSize:22,
    },
    txt3:{
        marginTop:10,
        color:'white',
        fontFamily:'Caveat-VariableFont_wght',
        fontSize:18,
    },
    container:{
        flex:1,
        backgroundColor:'#404040'
    },
    txt:{
        color:'white'
    }
})