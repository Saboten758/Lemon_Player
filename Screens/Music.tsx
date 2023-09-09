import React, { useEffect, useState } from 'react';
import {ImageBackground,SafeAreaView,StyleSheet,Text,View,FlatList,ActivityIndicator,TouchableOpacity, Dimensions, useWindowDimensions, ToastAndroid, ScrollView, Alert} from 'react-native';
import Share from 'react-native-share';
import TrackPlayer, {
    useTrackPlayerEvents,
    usePlaybackState,
    useProgress,
    Event,
    State,
    RepeatMode
  } from 'react-native-track-player';
  import DocumentPicker from 'react-native-document-picker'
  import Icon from 'react-native-vector-icons/Ionicons';
  import { setupPlayer, addTracks,Night } from './trackplayer';
import { Card } from 'react-native-paper';
import axios from 'axios';
const {width,height}=Dimensions.get('window')
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';

 
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
            onSlidingComplete={handleSliderChange}
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

    async function handleShuffle() {
        let queue = await TrackPlayer.getQueue();
        await TrackPlayer.reset();
        queue.sort(() => Math.random() - 0.5);
        await TrackPlayer.add(queue);
        
        loadPlaylist()
        ToastAndroid.show("Rolled a Dice!",ToastAndroid.SHORT)
      }
    return(
      <View>
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
  const [rep,setRep]=useState(false)

  const handleShare = async () => {
    Alert.alert('Share Lemon Player',"Do You like Lemon Player?\nWanna Share with Friends?",[
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => {
        try {
          ToastAndroid.show("This means a lot! Thanks :>",ToastAndroid.SHORT)
          Share.open({ url: "https://github.com/Saboten758/Lemon_Player/releases/latest", title: 'Share Lemon PLayer With Friends!' })
            .catch((error) => console.log('Error !', error));
        } catch (error) {
          console.log('Link Error!', error);
        }
      } },
    ])
    
  };

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
            }FileClick
            
          
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
  async function handleRep(){
    setRep(!rep);
    rep?await TrackPlayer.setRepeatMode(RepeatMode.Track):await TrackPlayer.setRepeatMode(RepeatMode.Queue);
    rep?ToastAndroid.show("Current Song is on Repeat!",ToastAndroid.SHORT):ToastAndroid.show("Repeat Queue!",ToastAndroid.SHORT)
  }

  const nav=useNavigation();
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
    <>
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
    <ImageBackground style={styles.container}source={pick?require('../assets/mood.gif'):require('../assets/smoke.gif')}
   >
      
      <Card style={{marginBottom:10,}}>
      <Card.Cover
            
              source={back?{uri:back}:require('../assets/mood.gif')}
              style={[styles.city,{width:width-40,height:window.height>600?window.height-520:window.height-100}]}
            />
      </Card>
      
      <Header/>
      
      
      <TrackProgress/>
      <Playlist/>
      <TouchableOpacity style={[styles.button]} onPress={Night}><Text style={styles.txt}>Nightwave Plaza Song Preview</Text></TouchableOpacity>
      </ImageBackground>
     </ScrollView>
      <View style={styles.bot}>
            <View style={styles.icon}>
                <TouchableOpacity style={{marginEnd:10,marginStart:10,alignItems:'center'}} onPress={()=>{nav.navigate("Playlists")}}>
                <Icon color={"#E3F4F6"} name={"headset-sharp"} size={30}/>
                <Text style={[styles.txt,{color:'#AD8C9C'}]}>PLAYLIST</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginEnd:10,marginStart:10,alignItems:'center'}} onPress={handleRep}>
                <Icon color={'#E3F4F6'} name={rep?"repeat":"repeat-sharp"} size={30}/>
                <Text style={styles.txt}>REPEAT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginEnd:10,marginStart:10,alignItems:'center'}} onPress={open}>
                <Icon color={'#E3F4F6'} name="download-outline" size={30}/>
                <Text style={styles.txt}>ADD</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginEnd:10,marginStart:10,alignItems:'center'}}  onPress={handleShare}>
                <Icon color={'#E3F4F6'} name="share-social" size={30}/>
                <Text style={styles.txt}>SHARE</Text>
                </TouchableOpacity>

            </View>
            </View>
            </>
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
  bot:{
    backgroundColor:'black',
    elevation:4,
    paddingVertical:10,
    width:width,
    alignItems:"center",
    borderTopWidth:2,
    borderColor:'white',
   
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
  icon:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'80%'
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