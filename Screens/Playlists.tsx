import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, ImageBackground, StyleSheet, ToastAndroid, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { Text } from "react-native-paper";
import TrackPlayer, {
    useTrackPlayerEvents,
    usePlaybackState,
    useProgress,
    Event,
    State,
    RepeatMode
  } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/Ionicons';

const Playlists=()=>{
    const playerState = usePlaybackState();
    const [width,setWidth] =useState(Dimensions.get('window').width)
    const [height,setheight] =useState(Dimensions.get('window').height)
    const [queue, setQueue] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(0);
    const[back,setBack]=useState('')
    async function loadPlaylist() {
      const queue = await TrackPlayer.getQueue();
      setQueue(queue);
    }

    async function fetch_img(){
      const res=await axios.get("https://api.plaza.one/backgrounds/random")
      setBack(res.data.src)
    }
    useEffect(()=>{
      fetch_img();
    },[])
    useEffect(() => {
      const handle=async()=>{
        const width=Dimensions.get('window').width;
        const height=Dimensions.get('window').height;
        setWidth(width);
        setheight(height);
        
    }
    Dimensions.addEventListener('change',handle);
      loadPlaylist();
      
    }, []);
  
    useTrackPlayerEvents([Event.PlaybackTrackChanged], (event) => {
      if(event.state == State.nextTrack) {
        TrackPlayer.getCurrentTrack().then((index) => setCurrentTrack(index));
      }
    });
    const sep=()=>(
      <View style={{borderWidth:1,borderColor:'white',width:'auto'}}/>
    )

    function PlaylistItem({index, title, isCurrent}) {
  
      function handleItemPress() {
        TrackPlayer.skip(index);
      }
      
      return (
        <TouchableOpacity onPress={handleItemPress}>
          <Text
            style={{...styles.playlistItem,
              ...{backgroundColor: isCurrent ? '#8000ff' : 'transparent'}}}>
          {title}
          </Text>
        </TouchableOpacity>
      );
    }
    async function handlePlayPress() {
        if(await TrackPlayer.getState() == State.Playing) {
          TrackPlayer.pause();
        }
        else {
          TrackPlayer.play();
        }
      }
      
    return(
      <ImageBackground source={back?{uri:back}:require('../assets/mood.gif')} resizeMode={'cover'}style={{alignItems:'center',flex:1}}>
        <View style={{flexDirection: 'row',
        flexWrap: 'wrap', alignItems: 'center',marginTop:10}}>
          <Icon.Button
            name="play-skip-back"
            size={28}
            backgroundColor="transparent"
            color={'#eeccff'}
            onPress={() => TrackPlayer.skipToPrevious()}/>
          <Icon.Button
            name={playerState==State.Playing ? 'pause' : 'play'}
            size={40}
            backgroundColor="transparent"
            
            onPress={handlePlayPress}/>
          <Icon.Button
            name="play-skip-forward"
            size={28}
            color={'#eeccff'}
            backgroundColor="transparent"
            onPress={() => TrackPlayer.skipToNext()}/>
      </View>
        <View style={[styles.playlist,{width:width-40,height:height>300?height-300:height-100}]}>
          <FlatList
            ItemSeparatorComponent={sep}
            data={queue}
            renderItem={({item, index}) => <PlaylistItem
                                              index={index}
                                              title={item.title}
                                              isCurrent={currentTrack == index }/>
            }
          />
        </View>
        <View style={{alignItems:'center',justifyContent:'center',}}>
        </View>
        
      </ImageBackground >
    );
  }

export default Playlists;

const styles=StyleSheet.create({
    playlistItem: {
        fontSize: 25,
        color: 'white',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 20,
        backgroundColor: 'white', 
        marginVertical: 4, 
        fontWeight: 'bold',
        textShadowColor: '#AD8C9C', 
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
      },
      playlist: {
        padding:2,
        marginTop: 10,

        backgroundColor:'black',
        marginBottom: 40,
        borderRadius:20,
        width:380,
        
        textShadowColor:'black',
        borderWidth: 4,
        borderColor: '#3D3C49', 
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
      },
})