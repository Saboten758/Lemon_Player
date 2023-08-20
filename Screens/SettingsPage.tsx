import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View,StyleSheet,Text, ScrollView,TouchableOpacity, Linking,Dimensions } from "react-native";
import { Card } from "react-native-paper";


const SettingsPage=()=>{
  const nav=useNavigation();
    return(
      <ScrollView style={{flexGrow:1,backgroundColor:'#131313'}}>
        <View style={styles.containerz}>
            <Text style={styles.head}>Lemon</Text>
            <Text style={[styles.head,{marginTop:0}]}>Player</Text>
           <Card style={{justifyContent:'flex-start',marginTop:20}}>
      <Card.Cover
              source={require('../assets/lemon.gif')}
              style={[styles.city,{width:Dimensions.get("screen").width-40}]}
            />
      </Card>
        
          <TouchableOpacity onPress={()=>{Linking.openSettings()}} style={styles.button}><Text style={styles.txt}>App Info</Text></TouchableOpacity>
  

          <View style={styles.web}>
            <Text style={styles.webg} >
                WEB GAMES
            </Text>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>{nav.navigate('Gran')}} style={[styles.button,{backgroundColor:'#66ccff',elevation:3}]}><Text style={styles.txt}>Gran Blue Fantasy</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{nav.navigate('Web')}} style={[styles.button,{backgroundColor:'#3333cc'}]}><Text style={[styles.txt,{color:'white'}]}>Simple MMO</Text></TouchableOpacity>

            </View>
            
          </View>

          <View style={[styles.web,{backgroundColor:'#ffff1a'}]}>
            <Text style={[styles.webg]} >
                MANGA
            </Text>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>{nav.navigate('MangaDex')}} style={[styles.button,{backgroundColor:'#ff6600',elevation:3}]}><Text style={styles.txt}>MangaDex</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{nav.navigate('MangaTo')}} style={[styles.button,{backgroundColor:'#ccffcc'}]}><Text style={[styles.txt]}>Mangato</Text></TouchableOpacity>

            </View>
            <TouchableOpacity onPress={()=>{nav.navigate('Toonily')}} style={[styles.button,{backgroundColor:'#00b300',marginTop:1}]}><Text style={[styles.txt,{color:'white'}]}>Toonily</Text></TouchableOpacity>
            
          </View>
          <Text style={styles.foot}>SABOTEN</Text>
          <View style={styles.container}>
            <View style={styles.fake_card}>  
            <Text style={[styles.txt,{color:'black',marginBottom:5}]}>Contact Me!</Text>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={[styles.buttonz,{backgroundColor:'#003d99'}]}onPress={()=>{Linking.openURL("https://github.com/Saboten758")}}><Text style={[styles.txt2]}>Github</Text></TouchableOpacity>
            <TouchableOpacity style={styles.buttonz}onPress={()=>{Linking.openURL("mailto:debjitdaw03@gmail.com")}}><Text style={styles.txt2}>Gmail</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.buttonz,{backgroundColor:'#ff0000'}]}onPress={()=>{Linking.openURL("https://saboten123.itch.io")}}><Text style={[styles.txt2,{color:'black'}]}>itch.io</Text></TouchableOpacity>
            </View>
            </View>
            
          
            
        </View>
        </View>
        </ScrollView>
    )
}

export default SettingsPage;

const styles=StyleSheet.create({
    containerz:{
      flex:1,
      
      alignItems:'center',
      backgroundColor:'#131313',
    },
    container:{
      alignItems:'center',
      flex:1,
      justifyContent:'center',
  },
  web:{
    alignItems:'center',
    backgroundColor:'#ffffcc',
    margin:10,
    borderRadius:10,
  },
  webg:{
    fontFamily:'Caveat-VariableFont_wght',
    color:'black',
    marginTop:10,
    fontSize:25,
  },
  txt2:{
      color:'white',
      fontWeight:'bold'
  },
  fake_card:{
      elevation:3,
      opacity:0.8,
      backgroundColor:'#ffffcc',
      marginBottom:40,
      alignItems:'center',
      justifyContent:'center',
      height:100,
      width:200,
      borderRadius:20,
  },
  buttonz:{
      backgroundColor:'#9999ff',
      borderRadius:10,
      padding:7,
      opacity:1,
      margin:5,
  },
    foot:{
      margin:10,
      fontSize:44,
      shadowColor:'#ffffcc',
      shadowOffset:{width:12,height:12},
      color:'#ffffcc',
      fontFamily:'BebasNeue-Regular'
    },
    head:{
      marginTop:10,
      color:'#ffffcc',
      fontFamily:'Caveat-VariableFont_wght',
      fontSize:56,
    },
    txt:{
      color:'black',
      fontFamily:'BebasNeue-Regular'
    },
   
    button:{
      borderRadius:20,
      backgroundColor:'#ffffcc',
      alignItems:'center',
      justifyContent:'center',
      height:80,
      padding:10,
      width:100,
      margin:20,
      elevation:3,
    },
    city:{
      height:260,
      width:380,
      
    },
  })