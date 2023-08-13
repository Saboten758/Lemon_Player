import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View,StyleSheet,Text, TouchableHighlight, TouchableOpacity } from "react-native";

const Home=()=>{
  const nav=useNavigation()
    return(
        <View style={styles.container}>
          <TouchableOpacity onPress={()=>{nav.navigate('Music')}}><Text>HELLO</Text></TouchableOpacity>
        </View>
    )
}

export default Home;

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