import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View,ScrollView,TouchableOpacity,StyleSheet,Text, Linking } from 'react-native'
import { Card, Paragraph, Title } from 'react-native-paper'

const Manga=()=>{
    const nav=useNavigation()
    return(
        <ScrollView style={{backgroundColor:"#668285"}}>
            <View style={{alignItems:'center'}}>
            <Text style={styles.webg} >
                MANGA
            </Text>
            </View>
          <View>
          <Card style={{margin:10,backgroundColor:'#333333'}} >
            <Card.Content>
              <Title style={{color:'white'}} >MangaDex</Title>
            </Card.Content>
            <Card.Cover
              source={{uri:'https://pbs.twimg.com/profile_images/1391016345714757632/xbt_jW78_400x400.jpg'}}
              
            />
            <Card.Content >
              <Paragraph style={{flexWrap:'wrap',color:'white'}}>
              Read manga online for free on MangaDex with no ads, high quality images and support scanlation groups!
              </Paragraph>
        
            </Card.Content>
            <Card.Actions >
            <TouchableOpacity onPress={()=>{nav.navigate('MangaDex')}} style={[styles.button,{backgroundColor:'#ff6600',elevation:3}]}><Text style={styles.txt}>MangaDex</Text></TouchableOpacity>
            </Card.Actions>
          </Card>

          <Card style={{margin:10,backgroundColor:'#F7F4EB'}} >
            <Card.Content>
              <Title  >Mangato</Title>
            </Card.Content>
            <Card.Cover
              source={{uri:'https://s3.amazonaws.com/shonenjump.viz.com/drupal/art/knight.jpg'}}
              
            />
            <Card.Content >
              <Paragraph style={{flexWrap:'wrap'}}>
              Read manga online free at MangaNato, update fastest, most full, synthesized 24h free with high-quality images. We hope to bring you happy moments.
              </Paragraph>
        
            </Card.Content>
            <Card.Actions >
            <TouchableOpacity onPress={()=>{nav.navigate('MangaTo')}} style={[styles.button,{backgroundColor:'#333333'}]}><Text style={[styles.txt,{color:'white'}]}>Mangato</Text></TouchableOpacity>

            </Card.Actions>
          </Card>

          <Card style={{margin:10,backgroundColor:'#8DBE5A'}} >
            <Card.Content>
              <Title  >Toonily</Title>
            </Card.Content>
            <Card.Cover
              source={{uri:'https://images.alphacoders.com/107/1071074.png'}}
              
            />
            <Card.Content >
              <Paragraph style={{flexWrap:'wrap'}}>
              Read your favorite premium manhwa from leading korean manhwa publishers translated to english for free. Read Manhwa Online. Updated Daily!
              </Paragraph>
        
            </Card.Content>
            <Card.Actions >
            <TouchableOpacity onPress={()=>{nav.navigate('Toonily')}} style={[styles.button,{backgroundColor:'#00b300',marginTop:1}]}><Text style={[styles.txt,{color:'white'}]}>Toonily</Text></TouchableOpacity>

            </Card.Actions>
          </Card>
          </View>
          
          </ScrollView>
        
    )
}

export default Manga

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