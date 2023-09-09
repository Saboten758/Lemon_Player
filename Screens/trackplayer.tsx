import TrackPlayer, {
    AppKilledPlaybackBehavior,
    Capability,
    RepeatMode,
    Event
  } from 'react-native-track-player';
  import axios from 'axios';
  import { ToastAndroid } from 'react-native';
  async function fetchCurrentSongId() {
    try {
      const response = await axios.get('https://api.plaza.one/status');
      const currentSongId = response.data.song.id;
      return currentSongId;
    } catch (error) {
      console.error('Error fetching current song ID:', error);
      return null;
    }
  }
  const showTost = (title) => {
    ToastAndroid.show(title+' was added to playlist!!', ToastAndroid.SHORT);
  };
  const showRefresh = () => {
    ToastAndroid.show('Reload to see changes', ToastAndroid.SHORT);
  };
  async function fetchSongInfo(songId) {
    try {
      const response = await axios.get(`https://api.plaza.one/songs/${songId}`);
      const song = response.data;
      return song;
    } catch (error) {
      console.error('Error fetching song information:', error);
      return null;
    }
  }
  
  export async function setupPlayer() {
    let isSetup = false;
    try {
      await TrackPlayer.getCurrentTrack();
      isSetup = true;
    }
    catch {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.SeekTo,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
        ],
        progressUpdateEventInterval: 2,
      });
  
      isSetup = true;
    }
    finally {
      return isSetup;
    }
  }
  const addedSongIds = [];
  export async function addTracks() {
    
    await TrackPlayer.add([
      {
        id:'1',
        url: "https://radio.plaza.one/mp3",
        artist:"V a p o r ~ w a v e",
        title:'Night Wave Plaza Radio',
        artwork:require('../assets/plaza.png'),
        duration:0,
        isLiveStream:true,
      },
      {
        id:'2',
        url: "https://fluxfm.streamabc.net/flx-chillhop-mp3-320-1595440?sABC=64s6n8r6%230%23358oqr054r4564qq0sn2322986oq7prn%23fgernzf.syhksz.qr&aw_0_1st.playerid=streams.fluxfm.de&amsparams=playerid:streams.fluxfm.de;skey:1693886694",
        artwork:require('../assets/chillpop.jpg'),
        artist:"Flux Radio",
        title:'ChillHop Radio',
        duration:0,
        isLiveStream:true,
      },
      {
        id:'3',
        url: "https://fluxfm.streamabc.net/flx-jazzradio-mp3-320-9214342?sABC=64s6n914%230%23358oqr054r4564qq0sn2322986oq7prn%23nhqvb&aw_0_1st.playerid=audio&amsparams=playerid:audio;skey:1693886740",
        artwork:require('../assets/jazz.png'),
        artist:"Flux Radio",
        title:'Jazz radio Schwarzensten',
        duration:0,
        isLiveStream:true,
      },
      {
        id:'4',
        url: "https://jenny.torontocast.com:2000/stream/J1GOLD",
        artist:"Japan's greatest hits of the 60s, 70s and 80s.",
        title:'J1 Gold Radio',
        duration:0,
        artwork:require('../assets/j1gold.png'),
        isLiveStream:true,
      },
      {
        id:'5',
        url: "https://jenny.torontocast.com:2000/stream/J1XTRA",
        artwork:require('../assets/j1xtra.png'),
        artist:"Playing the hits from the Heisei era (1989~2019)",
        title:'J1 Xtra Radio',
        duration:0,
        isLiveStream:true,
      },
      {
        id:'6',
        url: "https://jenny.torontocast.com:2000/stream/J1HITS",
        artwork:require('../assets/j1hits.png'),
        artist:"Japan's Hottest Hits. Playing today's hits heard on Japanese FM radio.",
        title:'J1 Hits Radio',
        duration:0,
        isLiveStream:true,
      },
      {
        id:'7',
        url: "https://stream.zeno.fm/hnz0etymypwuv",
        artwork:require('../assets/japanFM.webp'),
        artist:"Japan Radio.",
        title:'Japan FM',
        duration:0,
        isLiveStream:true,
      },
      {
        id:'8',
        url: "https://stream-153.zeno.fm/kfpemsm21oluv?zs=54GidxYbT3Su8gflaRJXZg",
        artwork:require('../assets/chicano.webp'),
        artist:"Rap Radio.",
        title:'Chicano Rap',
        duration:0,
        isLiveStream:true,
      },
      {
        id:'9',
        url: "https://stream-150.zeno.fm/1d4qva0n3p8uv?zs=qH1BEAEjTVirt34HWNsQfA",
        artwork:require('../assets/okufm.webp'),
        artist:"Japanese Music.",
        title:'Oku FM',
        duration:0,
        isLiveStream:true,
      },
      {
        id:'10',
        url: "https://stream-164.zeno.fm/tzt3zoqyiiutv?zs=feTl5QpzT5-g33367PeRpA",
        artwork:"https://zeno.fm/_next/image/?url=https%3A%2F%2Fimages.zeno.fm%2FoLURlhY7oj3dQ9ojdR0Pj0GWKjT1ni-uJfFYexkZGaw%2Frs%3Afit%3A240%3A240%2Fg%3Ace%3A0%3A0%2FaHR0cHM6Ly9zdHJlYW0tdG9vbHMuemVub21lZGlhLmNvbS9jb250ZW50L3N0YXRpb25zL2QzODE2YzZjLTM5ODQtNDcxNy05MzFjLTMwNGU0ZTRlMmY2Mi9pbWFnZS8_dXBkYXRlZD0xNjkwOTMzNjQ0MDAw.webp&w=1920&q=100",
        artist:"Chill BGM & Songs.",
        title:'Radio Kiss',
        duration:0,
        isLiveStream:true,
      },
      {
        id:'11',
        url: "https://stream-151.zeno.fm/feucy4tblujvv?zs=sWRIn89hSvq7JTUxrEvarQ",
        artwork:"https://zeno.fm/_next/image/?url=https%3A%2F%2Fimages.zeno.fm%2FtbHu6TxTiWihzPMllqlJLYG76uc7q5f1CWUoF0YfoXU%2Frs%3Afit%3A240%3A240%2Fg%3Ace%3A0%3A0%2FaHR0cHM6Ly9zdHJlYW0tdG9vbHMuemVub21lZGlhLmNvbS9jb250ZW50L3N0YXRpb25zL2Q3YzYxNmIwLWU4NGMtNGM5Ni1iYmRlLWIzODc4ZTE3NGZmNy9pbWFnZS8_dXBkYXRlZD0xNjkzMzg4OTE3MDAw.webp&w=1920&q=100",
        artist:"BOOM",
        title:'__ZOE__',
        duration:0,
        isLiveStream:true,
      },
      
      
      
      ]);
      await TrackPlayer.setRepeatMode(RepeatMode.Queue);
    
  }
  async function Nightwave(){
    const currentSongId = await fetchCurrentSongId();
    if (currentSongId) {
      const currentSongInfo = await fetchSongInfo(currentSongId);
      if (addedSongIds.includes(currentSongInfo.id)) {
        return;
      }
      addedSongIds.push(currentSongInfo.id)
      if (currentSongInfo) {
        const track = {
          id: currentSongInfo.id,
          url: currentSongInfo.preview_src,
          title: currentSongInfo.title,
          artist: currentSongInfo.artist,
          duration: currentSongInfo.length,
          artwork: currentSongInfo.artwork_src,
        };
        console.log(track)
  
        await TrackPlayer.add(track);
        showTost(currentSongInfo.title);
        showRefresh();
        await TrackPlayer.setRepeatMode(RepeatMode.Queue);
      }
    }
  }
  export async function playbackService() {
    TrackPlayer.addEventListener(Event.RemotePause, () => {
      console.log('Event.RemotePause');
      TrackPlayer.pause();
    });
  
    TrackPlayer.addEventListener(Event.RemotePlay, () => {
      console.log('Event.RemotePlay');
      TrackPlayer.play();
    });
  
    TrackPlayer.addEventListener(Event.RemoteNext, () => {
      console.log('Event.RemoteNext');
      TrackPlayer.skipToNext();
    });
  
    TrackPlayer.addEventListener(Event.RemotePrevious, () => {
      console.log('Event.RemotePrevious');
      TrackPlayer.skipToPrevious();
    });
  }
  
  export async function Night(){
      await Nightwave()
  }
  // setInterval(async () => {
  //   await Nightwave();
  // }, 30000);