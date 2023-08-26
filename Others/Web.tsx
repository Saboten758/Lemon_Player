import React, { Component } from 'react';
import { StyleSheet, Alert,Linking,Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

const Web = ({route}) => {
    const { data } = route.params;
  // Alert.alert("Google Auth Problem","Google Auth is not allowed for web views! Do You want to open on web instead?",[
  //   { text: 'Cancel', style: 'cancel' },
  //   { text: 'OK', onPress: () => Linking.openURL('https://game.granbluefantasy.jp') },
  // ],)
const links=['https://web.simple-mmo.com','https://herta.eu.org','https://mangadex.org','https://manganato.com','https://toonily.com']
  return (
    <View style={styles.container}>
  <WebView source={{ uri: links[data] }} style={{ flex: 1 }} />
  </View>
  )
}
export default Web

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },})