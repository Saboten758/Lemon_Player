import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View,Image, ScrollView, TouchableOpacity, FlatList, Linking, ToastAndroid, useWindowDimensions } from "react-native"
import { Card } from "react-native-paper";
import * as rssParser from 'react-native-rss-parser';
type ItemProps = {title: string};
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Explore=()=>{
    const [curr,setCurr]=useState(0)
    const window=useWindowDimensions()
    const nav=useNavigation()
    
    
    var currentdate = new Date(); 
    const timeslot=["Morning","Day","Afternoon","Evening","Night"]
    const imgs=[require('../assets/morning.jpg'),
    require('../assets/day.jpg'),
    require('../assets/afternoon.jpg'),
    require('../assets/eve.jpg'),
    require('../assets/night.jpg'),require('../assets/mid.jpg')]
    const [x,setx]=useState("")
    const [head,setHead]=useState("")
    const feeds=['https://www.animenewsnetwork.com/all/rss.xml?ann-edition=us','https://90sanime.com/feed/',
    'https://prod-qt-images.s3.amazonaws.com/production/filmcompanion/feed.xml','https://lwlies.com/feed/',
    'https://kotaku.com/rss','https://blog.google/technology/ai/rss/','https://towardsdatascience.com/feed',
    'https://www.ign.com/rss/articles/feed?tags=games','https://hecooks.co/feed/','https://minimalistbaker.com/feed/',
    'https://www.pcgamer.com/rss/']
   
   const a=()=>{
    fetch(feeds[curr]).then((response) => response.text())
  .then((responseData) => rssParser.parse(responseData))
  .then((rss) => {
    setHead(rss.title);
    setx(rss.items);
  
   })}
   useEffect(a,[curr])
  
  
   const Item = ({title}: ItemProps) => (
        
    <View >
    <TouchableOpacity onPress={()=>{nav.navigate('Web2',{data:title.links[0].url})}}>
           
  <View style={styles.item}>
    <Text style={styles.txt3}>{title.title}</Text>
    
  </View>
  </TouchableOpacity>
    </View>
);

  const data = [
   
    { label: 'Anime News Network', value: '0',data:'All anime& manga news' },
    { label: 'Google AI Blog', value: '5',data:"The latest news on Google Research in Artificial Intelligence, machine learning, updates and more!" },
    { label: 'Kotaku', value: '4',data:'Kotaku is the definitive digital hub for video game news, reviews, cheats, design, and entertainment' },
    { label: '90s anime.com', value: '1',data:'90s anime blog feed' },
    { label: 'Film Companinion', value: '2',data:'Indian Films' },
    { label: 'Little White Lies', value: '3',data:"The world's most beautiful film magazine" },
    
    { label: 'TDS', value: '6',data:"Sharing concepts, ideas and codes on data science." },
    { label: 'IGN', value: '7',data:"IGN.com is your premier online destination for gaming, movies, comics and everything you're into" },
    { label: 'He Cooks', value: '8',data:"Authentic and approachable dishes, cocktails, and more for anyone with a kitchen, a stomach, and a heart." },
    { label: 'Minimalist Baker', value: '9',data:"Sharing simple, delicious plant-based and mostly gluten-free recipes" },
    { label: 'PC Gamer', value: '10',data:"Sharing simple, delicious plant-based and mostly gluten-free recipes" }
  ];
  const [value, setValue] = useState(null);
    var key=0
    if (currentdate.getHours()>=5 && currentdate.getHours()<=10) {
        key=0
    }
    else if(currentdate.getHours()>=1 && currentdate.getHours()<5){
      key=5
    }
    else if(currentdate.getHours()>10 && currentdate.getHours()<12){
        key=1
    }
    else if(currentdate.getHours()>=12 && currentdate.getHours()<17){
        key=2
    }
    else if(currentdate.getHours()>=17 && currentdate.getHours()<20){
        key=3
    }
    else if(currentdate.getHours()>=20 && currentdate.getHours()<=23){
        key=4
    }
    else if(currentdate.getHours()==0){
      key=4
    }
    const hed=()=>(<View style={{backgroundColor:'#3D3C49',padding:10}}><Text style={styles.title}>{head}</Text></View>)
    const sep=()=>(<View style={{borderWidth:1,borderColor:'black'}}/>)
    

    return(
        <>
        <View style={styles.head}>
        <Image style={styles.img} resizeMode={'cover'} source={imgs[key]}/>
       
            {key<5&&(<Text style={styles.txt}>Good {timeslot[key]}! </Text>)}
            {key==5&&(<Text style={[styles.txt,{color:'#f2f2f2'}]}>Midnight! </Text>)}
            
            
        </View>
        <View style={styles.container}>
            
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ScrollView horizontal={true} style={{paddingVertical: 10}} indicatorStyle={'black'} persistentScrollbar={true}>
                <TouchableOpacity onPress={()=>{nav.navigate('Games')}}>
                <Card style={{margin:10,backgroundColor:'#3D3C49',width:270}} >
                
                <Card.Cover
                source={require('../assets/arcade.gif')} resizeMode="stretch" style={{height:189}}
                />
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}><Text style={styles.txt2}>Web Games </Text><Icon style={{marginStart:5}}size={21} name="cards-playing-heart-multiple-outline"/></View>
                </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{nav.navigate('Manga')}}>
                <Card style={{margin:10,backgroundColor:'#3D3C49',width:270}} >
                
                <Card.Cover
                source={require('../assets/manga.gif')} resizeMode="stretch" style={{height:189}}/>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}><Text style={styles.txt2}>Manga </Text><Icon style={{marginStart:5}}size={21} name="book-open-page-variant-outline"/></View>
                </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{nav.navigate('Shows')}} > 
                <Card style={{margin:10,backgroundColor:'#3D3C49',width:270}}  >
                
                <Card.Cover
                source={require('../assets/manga2.jpg')} style={{height:189}} resizeMode="stretch"
                />
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}><Text style={styles.txt2}>T.V. Shows </Text><Icon style={{marginStart:5}}size={21} name="yin-yang"/></View>
                </Card>
                </TouchableOpacity>
                </ScrollView>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text style={styles.txt3}>Feed: </Text>
                <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.txt3}
        itemContainerStyle={{borderRadius:10}}
        selectedTextStyle={styles.txt3}
        inputSearchStyle={styles.txt4}
        itemTextStyle={styles.txt66}
        dropdownPosition={'bottom'}
        containerStyle={{backgroundColor:'#3D3C49',borderRadius:10,elevation:5}}
        data={data}
        search
        iconStyle={{borderColor:'black'}}
        activeColor={'black'}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Anime News"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          ToastAndroid.show(item.data,ToastAndroid.SHORT)
          setValue(item);
          setCurr(item.value);  
        
        }}
        
      />
                </View>
            </View>
        </View>
        <View style={{alignItems:'center',flex:1,backgroundColor:'#ffffe6'}}>
        {x.length!=0&&(<FlatList
        data={x}
        ListHeaderComponent={hed}
        ItemSeparatorComponent={sep}
        renderItem={({item}) => <Item title={item} />}
       
      />)}
      {x.length==0&&(<Text style={styles.txt3}>SOURCE CANT BE FETCHED </Text>)}
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
        height:70,
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
    txt66:{
      color:'white',
      fontFamily:'Caveat-VariableFont_wght',
      fontSize:25
  },
    txt4:{
        borderRadius:10,
        fontFamily:'Caveat-VariableFont_wght',
        fontSize:18
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
      dropdown: {
        margin: 16,
        height: 30,
        width:200,
      
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
      },
})