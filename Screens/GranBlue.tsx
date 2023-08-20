import React from 'react';
import { Alert, StyleSheet, TouchableHighlight, View, Linking } from 'react-native';
import { WebView } from 'react-native-webview';

const Gran = () => {
   

    Alert.alert("Google Auth Problem","Google Auth is not allowed for web views! Do You want to open on web instead?",[
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => Linking.openURL('https://game.granbluefantasy.jp') },
      ],)

  return (
    <View style={styles.container}>
  <WebView source={{ uri: 'https://game.granbluefantasy.jp' }} style={styles.webView}  />
  </View>
  )
}
export default Gran

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    webView: {
      flex: 1,
    },
  });