import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View,ScrollView,TouchableOpacity,StyleSheet,Text } from 'react-native'
import { Card, Paragraph, Title } from 'react-native-paper'


const Shows=()=>{


    const nav=useNavigation()
    return(
        <ScrollView style={{backgroundColor:"#668285"}}>
            <View style={{alignItems:'center'}}>
            <Text style={styles.webg} >
                ANIME </Text>
            </View>
          <View>
          <Card style={{margin:10,backgroundColor:'#333333'}} >
            <Card.Content>
              <Title style={{color:'white'}} >Anix</Title>
            </Card.Content>
            <Card.Cover
              source={{uri:'https://anix-shop.fi/wp-content/uploads/2019/10/demo-logo.png'}}
              
            />
            <Card.Content >
              <Paragraph style={{flexWrap:'wrap',color:'white'}}>
              Anix is a game-changing platform for anime enthusiasts, providing a simple and minimal interface akin to AnimixPlay, alongside an array of additional features.
              </Paragraph>
        
            </Card.Content>
            <Card.Actions >
            <TouchableOpacity onPress={()=>{nav.navigate('Web',{data:7})}} style={[styles.button,{backgroundColor:'#99ccff',elevation:3}]}><Text style={styles.txt}>Go To</Text></TouchableOpacity>
            </Card.Actions>
          </Card>
          <View style={{alignItems:'center'}}>
            <Text style={styles.webg} >
            Recommendations </Text>
            </View>
          
          <Card style={{margin:10,backgroundColor:'#ffffcc'}} >
            <Card.Content>
              <Title  >Movie Recomendations</Title>
            </Card.Content>
            <Card.Cover
              source={{uri:'https://hips.hearstapps.com/hmg-prod/images/summer-movies-1587392939.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=1200:*'}}
              
            />
            <Card.Content >
              <Paragraph style={{flexWrap:'wrap'}}>
              Get Latest Movie recomendations
              </Paragraph>
        
            </Card.Content>
            <Card.Actions >
            <TouchableOpacity onPress={()=>{nav.navigate('Web',{data:6})}} style={[styles.button,{backgroundColor:'#333333'}]}><Text style={[styles.txt,{color:'white'}]}>Go TO</Text></TouchableOpacity>

            </Card.Actions>
          </Card>

          <Card style={{margin:10,backgroundColor:'#003399'}} >
            <Card.Content>
              <Title style={{color:'white'}} >AniList</Title>
            </Card.Content>
            <Card.Cover
              source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/AniList_logo.svg/1200px-AniList_logo.svg.png'}}
              
            />
            <Card.Content >
              <Paragraph style={{flexWrap:'wrap',color:'white'}}>
              The next-generation anime platform. Track, share, and discover your favorite anime and manga with AniList.
              </Paragraph>
        
            </Card.Content>
            <Card.Actions >
            <TouchableOpacity onPress={()=>{nav.navigate('Web',{data:8})}} style={[styles.button,{backgroundColor:'white',marginTop:1}]}><Text style={[styles.txt,{color:'black'}]}>Go To</Text></TouchableOpacity>

            </Card.Actions>
          </Card>
          </View>
          
          </ScrollView>
        
    )
}

export default Shows

const styles=StyleSheet.create({
    web:{
        alignItems:'center',
        backgroundColor:'#ffffcc',
        margin:10,
        borderRadius:10,
      },
      webg:{
        fontFamily:'Caveat-VariableFont_wght',
        color:'white',
        marginTop:10,
        fontSize:40,
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
      txt:{
        color:'black',
        fontFamily:'BebasNeue-Regular'
      },
})