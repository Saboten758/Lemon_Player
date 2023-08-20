import React from 'react';
import {  StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const Kuru = () => {

  return (
    <View style={styles.container}>
  <WebView source={{ uri: 'https://herta.eu.org' }} style={styles.webView}  />
  </View>
  )
}
export default Kuru

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    webView: {
      flex: 1,
    },
  });