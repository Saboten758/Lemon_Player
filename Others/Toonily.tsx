import React from 'react';
import {  StyleSheet, TouchableHighlight, View, Linking } from 'react-native';
import { WebView } from 'react-native-webview';

const Toonily = () => {

  return (
    <View style={styles.container}>
  <WebView source={{ uri: 'https://toonily.com' }} style={styles.webView}  />
  </View>
  )
}
export default Toonily

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    webView: {
      flex: 1,
    },
  });