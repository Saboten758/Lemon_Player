import React from 'react';
import {  StyleSheet, TouchableHighlight, View, Linking } from 'react-native';
import { WebView } from 'react-native-webview';

const Mangato = () => {

  return (
    <View style={styles.container}>
  <WebView source={{ uri: 'https://manganato.com' }} style={styles.webView}  />
  </View>
  )
}
export default Mangato

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    webView: {
      flex: 1,
    },
  });