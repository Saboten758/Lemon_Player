import React, { useRef } from 'react';
import { StyleSheet,Text, View, useWindowDimensions, ImageBackground } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';
const Web2 = ({route}) => {
    const { data } = route.params;

  
const webviewRef = useRef(null);

  const handleBackNavigation = () => {
    if (webviewRef.current) {
      webviewRef.current.goBack();
    }
  };

  const handleForeNavigation = () => {
    if (webviewRef.current) {
      webviewRef.current.goForward();
    }
  };

  const handleHomeNavigation = () => {
    if (webviewRef.current) {

        webviewRef.current.injectJavaScript(`window.location.href = "${data}";`);
    }
  };


return (
    <View style={styles.container}>
       
  <WebView  
  ref={webviewRef}
  containerStyle={{flex:1}}
  startInLoadingState
      renderLoading={() => (
        <View style={{flex: 1, alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      )}
       allowsBackForwardNavigationGestures source={{ uri: data }} style={{ flex: 1 }} />
    
     
    {!(data===1 )&&(<View style={styles.bottomContainer}>
    
    <ImageBackground resizeMode='cover'  source={require('../assets/mood.gif')} style={styles.bottom}>
     <Icon.Button
            name="arrow-left"
            elevation={9}
            size={20}
            backgroundColor="transparent"
            onPress={handleBackNavigation}/>
        <Icon.Button
            name="home"
            elevation={9}
            size={23}
            backgroundColor="transparent"
            onPress={handleHomeNavigation}/>
     <Icon.Button
            name="arrow-right"
            elevation={9}
            size={20}
            backgroundColor="transparent"
            onPress={handleForeNavigation}/>
     </ImageBackground>
    
    </View>)}
                         
     
  </View>
  )
}
export default Web2

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center', 
    justifyContent: 'flex-end', 
  },

bottom:{
    overflow: 'hidden', 
    width: 170,
    elevation:4,
    alignItems:'center',
    justifyContent:'space-around',
    flexDirection:'row',
    backgroundColor:'black',
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
}})