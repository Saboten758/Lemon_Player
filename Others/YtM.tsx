import React from 'react';
import {  StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const Yoo = () => {

  return (
    <View style={styles.container}>
  <WebView source={{ uri: 'https://music.youtube.com' }} style={styles.webView}  />
  </View>
  )
}
export default Yoo

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    webView: {
      flex: 1,
    },
  });