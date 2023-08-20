import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View,StyleSheet,Text, Dimensions, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";

const Home=()=>{
  
  const nav=useNavigation()
    return(
      
        <View style={styles.container}>
          <Text style={styles.head}>Radio</Text>
          <Card>
      <Card.Cover
              source={require('../assets/city_dark.gif')}
              style={[styles.city,{width:Dimensions.get("screen").width-40}]}
            />
      </Card>
          <TouchableOpacity style={styles.button}onPress={()=>{nav.navigate('Music')}}><Text style={styles.txt}>Plaza Radio & More</Text></TouchableOpacity>
     
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
    head:{
      color:'black',
      fontFamily:'BebasNeue-Regular',
      fontSize:56,
    },
   txt:{
    fontSize:14,
    fontWeight:'bold',
    color:'#AD8C9C'
   },
    button:{
      borderRadius:20,
      backgroundColor:'black',
      alignItems:'center',
      justifyContent:'center',
      height:80,
      width:100,
      padding:10,
      margin:20
    },
    city:{
      height:240,
      width:380,
      
    },
  })