import React, { Component } from 'react';
import { StyleSheet, Alert,Linking,Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

const MyWebComponent = () => {
  // Alert.alert("Google Auth Problem","Google Auth is not allowed for web views! Do You want to open on web instead?",[
  //   { text: 'Cancel', style: 'cancel' },
  //   { text: 'OK', onPress: () => Linking.openURL('https://game.granbluefantasy.jp') },
  // ],)

  return (
    <View style={styles.container}>
  <WebView source={{ uri: 'https://web.simple-mmo.com' }} style={{ flex: 1 }} />
  </View>
  )
}
export default MyWebComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },})