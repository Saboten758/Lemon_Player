import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View,Image, ScrollView, TouchableOpacity, FlatList, Linking } from "react-native"
import { Card } from "react-native-paper";
import * as rssParser from 'react-native-rss-parser';
type ItemProps = {title: string};


const Explore=()=>{
    const nav=useNavigation()
    const Item = ({title}: ItemProps) => (
        
        <TouchableOpacity onPress={()=>{nav.navigate('Web2',{data:title.links[0].url})}}>
      <View style={styles.item}>
        <Text style={styles.txt3}>{title.title}</Text>
      </View>
      </TouchableOpacity>
    );
    
    var currentdate = new Date(); 
    const timeslot=["Morning","Day","Afternoon","Evening","Night"]
    const imgs=[require('../assets/morning.jpg'),
    require('../assets/day.jpg'),
    require('../assets/morning.jpg'),
    require('../assets/eve.jpg'),
    require('../assets/night.jpg'),]
    const [x,setx]=useState("")
    const [head,setHead]=useState("")
   useEffect(()=>{
    fetch('https://www.animenewsnetwork.com/all/rss.xml?ann-edition=us').then((response) => response.text())
  .then((responseData) => rssParser.parse(responseData))
  .then((rss) => {
    setHead(rss.title);
    setx(rss.items);
    

    } )},[])

    var key=0
    if (currentdate.getHours()>=1 && currentdate.getHours()<=10) {
        key=0
    }
    else if(currentdate.getHours()>10 && currentdate.getHours()<12){
        key=1
    }
    else if(currentdate.getHours()>=12 && currentdate.getHours()<16){
        key=2
    }
    else if(currentdate.getHours()>=16 && currentdate.getHours()<20){
        key=3
    }
    else if(currentdate.getHours()>=20 && currentdate.getHours()<=24){
        key=4
    }
    const hed=()=>(<View style={{backgroundColor:'#3D3C49',padding:10}}><Text style={styles.title}>{head}</Text></View>)
    const sep=()=>(<View style={{borderWidth:1,borderColor:'black'}}/>)
    return(
        <>
        <View style={styles.head}>
        <Image style={styles.img} resizeMode={'cover'} source={imgs[key]}/>
       
            <Text style={styles.txt}>Good {timeslot[key]}! </Text>
            
            
        </View>
        <View style={styles.container}>
            
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ScrollView horizontal={true} style={{paddingVertical: 10}} indicatorStyle={'black'} persistentScrollbar={true}>
                <TouchableOpacity onPress={()=>{nav.navigate('Games')}}>
                <Card style={{margin:10,backgroundColor:'#3D3C49',width:270,height:240}} >
                
                <Card.Cover
                source={require('../assets/arcade.jpg')} resizeMode="stretch"
                />
                <Text style={styles.txt2}>Web Games</Text>
                </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{nav.navigate('Manga')}}>
                <Card style={{margin:10,backgroundColor:'#3D3C49',width:270,height:240}} >
                
                <Card.Cover
                source={require('../assets/manga.jpg')} resizeMode="stretch"/>
                <Text style={styles.txt2}>Manga</Text>
                </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{nav.navigate('Web',{data:6})}} > 
                <Card style={{margin:10,backgroundColor:'#3D3C49',width:270,height:240}} >
                
                <Card.Cover
                source={{uri:'https://hips.hearstapps.com/hmg-prod/images/best-fall-movies-1659459329.jpg?crop=0.8297972654408298xw:1xh;center,top&resize=1200:*'}}
                />
                <Text style={styles.txt2}>Movies</Text>
                </Card>
                </TouchableOpacity>
                </ScrollView>
            
            </View>
        </View>
        <View style={{alignItems:'center',flex:1,backgroundColor:'#ffffe6'}}>
        <FlatList
        data={x}
        ListHeaderComponent={hed}
        ItemSeparatorComponent={sep}
        renderItem={({item}) => <Item title={item} />}
       
      />
        </View>
        </>
        
    )
}
export default Explore

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffe6'
    },
    body:{
        flex:1,
        borderTopLeftRadius:20,
    borderTopRightRadius:20,
    backgroundColor:'red'
    },
    img: {
        marginEnd:10,
        width: 90, 
        height: 90,
        borderRadius: 45,
        overflow: 'hidden',
        justifyContent: 'center',
        
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

    head:{
        alignItems:'center',
        padding:40,
        flexDirection:'row',
        flex:0.2,
        backgroundColor:'#3D3C49',

    },
    txt:{
        color:'white',
        fontSize:37,
        fontFamily:'Caveat-VariableFont_wght',
        flexWrap:"wrap"
        
    },
    txt2:{
        color:'white',
        fontFamily:'Caveat-VariableFont_wght',
        alignSelf:'center',
        marginTop:10,
        fontSize:20
    },
    txt3:{
        color:'black',
        fontFamily:'Caveat-VariableFont_wght',
        fontSize:25
    },
    item: {
       
        padding: 10,
      
        
        marginVertical: 2,
        marginHorizontal: 16,
      },
      title: {
        color:'white',
        fontFamily:'BebasNeue-Regular',
        fontSize: 45,
        textAlign:'center'
      },
})