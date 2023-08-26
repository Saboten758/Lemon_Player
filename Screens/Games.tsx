import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View,ScrollView,TouchableOpacity,StyleSheet,Text, Linking } from 'react-native'
import { Card, Paragraph, Title } from 'react-native-paper'

const Games=()=>{
   
    const nav=useNavigation()
    return(

<ScrollView style={{backgroundColor:"#c5a8a8"}}>
            <View style={{alignItems:'center'}}>
            <Text style={styles.webg} >
                WEB GAMES
            </Text>
            </View>
          <View>
          <Card style={{margin:10,backgroundColor:'#99ccff'}} >
            <Card.Content>
              <Title >Gran Blue Fantasy</Title>
            </Card.Content>
            <Card.Cover
              source={{uri:'https://relink.granbluefantasy.jp/assets/images/common/common/artwork/artwork_2.jpg?20230711023209'}}
              
            />
            <Card.Content >
              <Paragraph style={{flexWrap:'wrap'}}>
              Granblue Fantasy is a Japanese role-playing video game
              </Paragraph>
              <Paragraph>
              The game reunites music composer Nobuo Uematsu and art director Hideo Minaba, who previously collaborated on Final Fantasy V, VI, and IX and Lost Odyssey.
              </Paragraph>
            </Card.Content>
            <Card.Actions >
            <TouchableOpacity onPress={()=>{nav.navigate('Gran',{data:true})}} ><Text style={{color:'blue'}}>Log in</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{nav.navigate('Gran',{data:false})}} style={[styles.button,{backgroundColor:'#9999ff',elevation:3}]}><Text style={styles.txt}>Play Now!</Text></TouchableOpacity>
            </Card.Actions>
          </Card>

          <Card style={{margin:10}} >
            <Card.Content>
              <Title >Simple MMO</Title>
            </Card.Content>
            <Card.Cover
              source={{uri:'https://blog.galahadcreative.com/wp-content/uploads/2021/04/blog-header-2.png'}}
              
            />
            <Card.Content >
              <Paragraph style={{flexWrap:'wrap'}}>
              SIMPLEMMO The lightweight text-based MMORPG 
              </Paragraph>
              <Paragraph>
              Join over 700,000 players and enjoy the best MMORPG experience in the simplest way.
              </Paragraph>
            </Card.Content>
            <Card.Actions >
            <TouchableOpacity onPress={()=>{nav.navigate('Web',{data:0})}} style={[styles.button,{backgroundColor:'#3333cc'}]}><Text style={[styles.txt,{color:'white'}]}>PLAY NOW!</Text></TouchableOpacity>
            </Card.Actions>
          </Card>

          <Card style={{margin:10,backgroundColor:'#ccb3ff'}} >
            <Card.Content>
              <Title >Kuru Kuru</Title>
            </Card.Content>
            <Card.Cover
              source={{uri:'https://staticg.sportskeeda.com/editor/2023/05/50b3a-16851174089662-1920.jpg'}}
              
            />
            <Card.Content >
              <Paragraph>
              Kuru Kuru ~ 
              </Paragraph>
              <Paragraph>Herta is a playable character in Honkai: Star Rail. She is the master of the eponymous Herta Space Station, who appears in the form of a puppet. </Paragraph>
            </Card.Content>
            <Card.Actions >
            <TouchableOpacity onPress={()=>{Linking.openURL('https://github.com/caliphdev/herta_kuru')}}><Text style={{color:'blue'}}>More Info</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{nav.navigate('Web',{data:1})}} style={[styles.button,{backgroundColor:'#ff0066'}]}><Text style={[styles.txt,{color:'white'}]}>PLAY NOW!</Text></TouchableOpacity>
          
            </Card.Actions>
          </Card>

          <Card style={{margin:10,backgroundColor:'black'}} >
            <Card.Content>
              <Title style={{color:'white'}} >Tic Tac Toe</Title>
            </Card.Content>
            <Card.Cover
              source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDkTwSg80-fPb_ispMP_aIFCkfo3EV3yQ3Xg&usqp=CAU'}}
              
            />
            <Card.Content >
              <Paragraph style={{flexWrap:'wrap',color:'white'}}>
              Play Tic Tac Toe Single Player / Multiplayer
              </Paragraph>
        
            </Card.Content>
            <Card.Actions >
            <TouchableOpacity onPress={()=>{nav.navigate('Web',{data:5})}} style={[styles.button,{backgroundColor:'#668cff',elevation:3}]}><Text style={styles.txt}>Play Now!</Text></TouchableOpacity>
            </Card.Actions>
          </Card>



</View>

</ScrollView>
    )
}

export default Games

const styles=StyleSheet.create({
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