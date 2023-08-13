import React from "react";
import { View,StyleSheet,Text } from "react-native";
const SettingsPage=()=>{
    return(
        <View style={styles.container}>
          <Text>SETTINGS</Text>
        </View>
    )
}

export default SettingsPage;

const styles=StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#668285',
    },
   
    button:{
      borderRadius:20,
      backgroundColor:'black',
      alignItems:'center',
      justifyContent:'center',
      height:80,
      width:80,
      margin:20
    }
  })