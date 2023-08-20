import React from 'react';
import {  StyleSheet, TouchableHighlight, View, Linking } from 'react-native';
import { WebView } from 'react-native-webview';

const MangaDex = () => {

  return (
    <View style={styles.container}>
  <WebView source={{ uri: 'https://mangadex.org' }} style={styles.webView}  />
  </View>
  )
}
export default MangaDex

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    webView: {
      flex: 1,
    },
  });