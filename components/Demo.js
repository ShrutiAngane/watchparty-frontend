import React, { useState } from 'react'
import { View,StyleSheet,Dimensions, TouchableOpacity} from 'react-native'
import Video from 'react-native-video'
import Chat from './Chat'
import Icon from 'react-native-vector-icons/FontAwesome'

const Demo = () => {
  const[overlay,setOverlay]=useState(false)
  const[isPlaying,setIsPlaying]=useState('playing')

  function handleOverlay(){

    setOverlay((prev)=>!prev);
    
  }

  function handleControls(){

    if(isPlaying=='playing'|| isPlaying=='resumed'){
      setIsPlaying('paused');
    }else{
      setIsPlaying('resumed')
    }
  }

  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={handleOverlay}>
      <View>
        <Video
          source={{
            uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          }}
          style={styles.video}
          resizeMode="contain"
          paused={isPlaying=='paused'}
        />
         {overlay && (
            <TouchableOpacity
              style={{position: 'absolute', width: '100%', height: '100%'}}
              onPress={handleOverlay}>
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => handleControls()}>
                  {isPlaying=='paused'?<Icon name='play' size={25} color={'#FFFFFF'}/>:<Icon name='pause' size={25} color={'#FFFFFF'}/>}
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
      </View>
      </TouchableOpacity>
      <Chat event={isPlaying}/>
      </View>
  );
}

const { width } = Dimensions.get('window');
const aspectRatio = 16 / 9;
const videoHeight = width / aspectRatio;

const styles=StyleSheet.create({
    container:{
        backgroundColor:'#130826',
        flex:1,
        width:'100%',
        flexDirection:'column',
        gap:20,
    },
    video:{
        width:width,
        height:videoHeight,
    },
    text:{
      color:'#FFFFFF',
      fontSize:15,
    }
})

export default Demo
