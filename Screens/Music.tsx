import React, { useEffect, useState } from 'react';
import {ImageBackground,SafeAreaView,StyleSheet,Text,View,FlatList,ActivityIndicator,TouchableOpacity, Dimensions, useWindowDimensions, ToastAndroid} from 'react-native';
import TrackPlayer, {
    useTrackPlayerEvents,
    usePlaybackState,
    useProgress,
    Event,
    State
  } from 'react-native-track-player';
  import Icon from 'react-native-vector-icons/Ionicons';
  import { setupPlayer, addTracks,Night } from './trackplayer';
import { Card } from 'react-native-paper';
import axios from 'axios';
import Slider from '@react-native-community/slider';
 
  function TrackProgress() {
    const { position, duration } = useProgress(200);
  
    function format(seconds) {
      let mins = (parseInt(seconds / 60)).toString().padStart(2, '0');
      let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
      return `${mins}:${secs}`;
    }
    const handleSliderChange = (value) => {
      TrackPlayer.seekTo(value);
    };
    return(
      <View>
        <Slider
            style={styles.prog}
            value={position}
            minimumValue={0}
            maximumValue={ duration }
            thumbTintColor="pink"
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            onValueChange={handleSliderChange}
            />
        <Text style={styles.trackProgress}>
          { format(position) } / { format(duration) }
        </Text>
      </View>
    );
  }
  const Header=()=> {
    const [width,setWidth]=useState(Dimensions.get('window').width)
    const [info, setInfo] = useState({});
    const window=useWindowDimensions()
    useEffect(() => {
      setTrackInfo();
      const handle=async()=>{
        const w=Dimensions.get('window').width
        setWidth(w)
      }
      Dimensions.addEventListener('change',handle)
    }, []);
  
    useTrackPlayerEvents([Event.PlaybackTrackChanged], (event) => {
      if(event.state == State.nextTrack) {
        setTrackInfo();
      }
    });
  
    async function setTrackInfo() {
      const track = await TrackPlayer.getCurrentTrack();
      const info = await TrackPlayer.getTrack(track);
      setInfo(info);
    }
  
    return(
      <View style={[styles.media,{width:width-40}]}>
      <View style={styles.scanlines}>
          <View style={styles.crtEffect}>
            <Text>Now Playing:</Text>
            <Text style={styles.songTitle}>{info.title}</Text>
            <Text style={styles.artistName}>{info.artist}</Text>
          </View>
      </View>
      </View>
    );}
  const Playlist=()=>{
    const [width,setWidth] =useState(Dimensions.get('window').width)
    const [queue, setQueue] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(0);

    async function loadPlaylist() {
      const queue = await TrackPlayer.getQueue();
      setQueue(queue);
    }
  
    useEffect(() => {
      const handle=async()=>{
        const width=Dimensions.get('window').width;
        setWidth(width);
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
    async function handleShuffle() {
        let queue = await TrackPlayer.getQueue();
        await TrackPlayer.reset();
        queue.sort(() => Math.random() - 0.5);
        await TrackPlayer.add(queue);
        
        loadPlaylist()
        ToastAndroid.show("Rolled a Dice!",ToastAndroid.SHORT)
      }
      const window=useWindowDimensions()
    return(
      <View>
        <View style={[styles.playlist,{width:width-40,height:window.height-700}]}>
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
        <Controls onShuffle={handleShuffle}/>
        </View>
        
      </View>
    );
  }
  
  function Controls({ onShuffle }) {
    const playerState = usePlaybackState();
  
    async function handlePlayPress() {
      if(await TrackPlayer.getState() == State.Playing) {
        TrackPlayer.pause();
      }
      else {
        TrackPlayer.play();
      }
    }
  
    return(
      <View style={{flexDirection: 'row',
        flexWrap: 'wrap', alignItems: 'center'}}>
          <Icon.Button
            name="play-skip-back"
            size={28}
            backgroundColor="transparent"
            color={'#eeccff'}
            onPress={() => TrackPlayer.skipToPrevious()}/>
          <Icon.Button
            name={playerState == State.Playing ? 'pause' : 'play'}
            size={40}
            backgroundColor="transparent"
            
            onPress={handlePlayPress}/>
          <Icon.Button
            name="play-skip-forward"
            size={28}
            color={'#eeccff'}
            backgroundColor="transparent"
            onPress={() => TrackPlayer.skipToNext()}/>
          <Icon.Button
            name="dice"
            size={28}
            backgroundColor="transparent"
            onPress={onShuffle}/>
      </View>
    );
  }

const Music=()=>{
  
  const window=useWindowDimensions()
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [back,setBack]=useState("")
  const [pick,setPick]=useState(0)
  const [width,setWidth]=useState(Dimensions.get('window').width)

  useEffect(()=>{
    const handle=async()=>{
        const width=Dimensions.get('window').width;
        setWidth(width);
    }
    Dimensions.addEventListener('change',handle);
  },[])


  async function fetch_img(){
    const res=await axios.get("https://api.plaza.one/backgrounds/random")
    setBack(res.data.src)
    let rand=Math.random()
    rand>0.5?rand=1:rand=0
    setPick(rand)
  }


  useEffect(() => {
    async function setup() {
      let isSetup = await setupPlayer();

      const queue = await TrackPlayer.getQueue();  
      if(isSetup && queue.length <= 0) {   //safety net ;p
        await addTracks();
      }

      setIsPlayerReady(isSetup);
    }
    fetch_img();
    setup();
  }, []);

  if(!isPlayerReady) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }
  
  
  return (
   
    <ImageBackground style={styles.container}source={pick?require('../assets/mood.gif'):require('../assets/smoke.gif')}
   >
      
      <Card>
      <Card.Cover
              source={back?{uri:back}:require('../assets/mood.gif')}
              style={[styles.city,{width:width-40,height:window.height-600}]}
            />
      </Card>
      <Playlist/>
      <TouchableOpacity style={[styles.button]} onPress={Night}><Text style={styles.txt}>Nightwave Plaza Song Preview</Text></TouchableOpacity>
      <TrackProgress/>
      {/* <Header/> */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    justifyContent: 'center',
    alignItems:"center",
    padding:10,
    backgroundColor: '#a8c0c8',
    
    
  },
  playlist: {
    padding:2,
    marginTop: 40,
    backgroundColor:'black',
    marginBottom: 40,
    borderRadius:20,
    
    height:170,
    width:380,
    position:'relative',
    textShadowColor:'black',
    borderWidth: 4,
    borderColor: '#3D3C49', 
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  button: {
    position:'relative',
    backgroundColor: '#33334d',
    borderRadius: 8,
    marginTop:2,
    padding: 4,
    shadowColor: 'black',
    
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  playlistItem: {
    position:'relative',
    fontSize: 18,
    color: 'white',
    paddingTop: 4,
    paddingBottom: 4,
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
  prog:{
    marginTop: 40,
    width:350,
    flexDirection:"row"
},
  media: {
    flex: 1,
    position:'relative',
    overflow: 'hidden',
    marginTop: 10,
    backgroundColor: 'black',
    borderRadius: 10,
    width: 380,
    height: 120,
    padding: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: 'back',
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 4,
    borderColor:'#668285',
    borderWidth:6,
  },
  txt:{
    marginTop:5,
    fontSize:16,
    fontWeight:'bold',
    color:'white'
  },
  trackProgress: {
    marginTop: 10,
    justifyContent:'space-evenly',
    textAlign: 'center',
    fontSize: 24,
    color: '#c1c1d7'
  },
  songTitle: {
    fontSize: 22,
    color: 'white',
    marginLeft: 10,
    flex: 1,
  },
  artistName: {
    fontSize: 21,
    color: 'red',
    marginLeft: 10,
    paddingBottom:2,
    textAlign: 'center',
  },
  city:{
    height:240,
    width:380,
    
  },
  round:{
    borderRadius:30,
    flex:1,
  },
  crtEffect: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  crtOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    mixBlendMode: 'overlay',
  },
  scanlines: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    mixBlendMode: 'screen',
    pointerEvents: 'none',}

});

export default Music;