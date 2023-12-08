import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View,Easing,Animated } from 'react-native'
import { emojis } from '../data/emojis';
import FloatingHeart from './FloatingHearts';


const Emoji = () => {

    const [hearts,setHearts]=useState([])
    const [emoji,setEmoji]=useState(false)
   

    function getRandomNumber(min,max){
      return Math.random()*(max-min)+min;
    }

    function handleEmoji(){
        
        setEmoji((prev)=>!prev);

    }

    function addEmoji(emoji){

      const timestamp = new Date().getUTCMilliseconds();
        const updatedHearts = [
            ...hearts,
            {
                id: timestamp,
                right: getRandomNumber(20, 150),
                randomIcon:emoji
            },
        ];
        setHearts(updatedHearts);

    }

    const removeHeart = React.useCallback((id)=> {
        setHearts((currentItems) =>
            currentItems.filter((heart)=> heart.id !== id)
        );
    }, []);

  return (
    <View>
      <FloatingHeart hearts={hearts} removeHeart={removeHeart}/>
      <TouchableOpacity 
      style={{position:'absolute',justifyContent:'center',alignItems:'center',width:40,height:40,borderRadius:50,backgroundColor:'silver',bottom:5,right:20}}
      onPress={handleEmoji}
      >
        <Image source={require('../assets/smiley-new.png')} style={{width:30,height:30}}/>
      </TouchableOpacity>
      {emoji? <View style={{flex:0,flexDirection:'row',justifyContent:'space-around',alignItems:'center',width:150,height:40,backgroundColor:'silver',borderRadius:10,position:'absolute',bottom:10,right:70}}>
        {emojis.map((emoji,index)=>{
          return <TouchableOpacity key={index} onPress={()=>addEmoji(emoji)}>
                  <Image source={emoji} style={{width:30,height:30}}/>
            </TouchableOpacity>
        })}
      </View>:null}
    </View>
  );
}

export default Emoji
