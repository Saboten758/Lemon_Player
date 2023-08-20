import React from 'react';
import {  StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const Spot = () => {

  return (
    <View style={styles.container}>
  <WebView source={{ uri: 'https://open.spotify.com' }} style={styles.webView}  />
  </View>
  )
}
export default Spot

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    webView: {
      flex: 1,
    },
  });