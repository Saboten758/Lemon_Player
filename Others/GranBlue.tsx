import React, { useState } from 'react';
import { Alert, StyleSheet, TouchableHighlight, View, Linking } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { WebView } from 'react-native-webview';

const Gran = ({route}) => {
  const { data } = route.params;
    data?Alert.alert("Reload","You may want to reload to this page for better view after u log in!"):console.log("hewo")

    // Alert.alert("Google Auth Problem","Google Auth is not allowed for web views! Do You want to open on web instead?",[
    //     { text: 'Cancel', style: 'cancel' },
    //     { text: 'OK', onPress: () => Linking.openURL('https://game.granbluefantasy.jp') },
    //   ],)

  return (
    <View style={styles.container}>
  <WebView startInLoadingState
      renderLoading={() => (
        <View style={{flex: 1, alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      )}source={{ uri: !data?'https://game.granbluefantasy.jp/#mypage':'https://game.granbluefantasy.jp/#authentication' }} userAgent={data?"Chrome/58.0.3029.110":""} allowsBackForwardNavigationGestures={true} thirdPartyCookiesEnabled={true}  style={styles.webView}  />
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