import React, { useEffect, useRef, useState } from 'react'
import { View,FlatList,TextInput,Button, StyleSheet, TouchableOpacity,Text, Keyboard,KeyboardAvoidingView,Platform, ScrollView } from 'react-native'
import Message from './Message'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import Emoji from './Emoji';


const Chat = (props) => {
    const[messageList,setMessage]=useState([])
    const [keyboardPadding, setKeyboardPadding] = useState(0);
    const [emoji,setEmoji]=useState(true)
    const[isMine,setIsMine]=useState(true);
    const textRef=useRef(null);
    const[text,setText]=useState('');
    const flatListRef = useRef(null);


    useEffect(()=>{
      
      props.event=='resumed'?setMessage([...messageList,{id:uuidv4(),text:'You resumed the video ',timestamp:getCurrentTime(),event:true}])
      :props.event=='paused'?setMessage([...messageList,{id:uuidv4(),text:'You paused the video ',timestamp:getCurrentTime(),event:true}]):null
      
      flatListRef.current?.scrollToEnd({animated:true})

      const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
        setEmoji((prev)=>!prev)
        flatListRef.current?.scrollToEnd({animated:true})
        const keyboardHeight = event.endCoordinates.height;
        setKeyboardPadding(10);
      });
  
      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        
        setKeyboardPadding(0);
        setEmoji((prev)=>!prev)
      });
  
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
      
    },[props.event])


    function handleSend(){
        
        isMine?setMessage([...messageList,{id:uuidv4(),text:text,timestamp:getCurrentTime(),event:false,isMine:true}])
              : setMessage([...messageList,{id:uuidv4(),text:text,timestamp:getCurrentTime(),event:false,isMine:false}])
        setIsMine((prev)=>!prev)
        textRef.current.clear();
        setText('');
        flatListRef.current?.scrollToEnd({ animated: true });
    }

    const getCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0'); 
      const minutes = now.getMinutes().toString().padStart(2, '0'); 
    
      return `${hours}:${minutes}`;
    }

    const isSendButtonDisabled = text.trim() === '';

    // const invertedData=[...messageList].reverse();


  return (
    <View style={{flex: 1, gap: 10}}>
        <KeyboardAwareFlatList
          data={messageList}
          renderItem={Message}
          keyExtractor={item => item.id}
          style={styles.messageList}
          ref={flatListRef}
          contentContainerStyle={[styles.contentContainer, { paddingBottom: keyboardPadding }]}
        />
        <View style={{display:`${emoji?'flex':'none'}`}}>
          <Emoji/>
        </View>
        <View style={styles.TextInput}>
          <TextInput
            placeholder="Please type your message here"
            placeholderTextColor={'#000000'}
            text={text}
            onChangeText={input => setText(input)}
            style={styles.input}
            ref={textRef}
          />
          <TouchableOpacity onPress={handleSend} style={styles.button} disabled={text?false:true}>
            <Text style={{color: '#000000', fontWeight: 'bold'}}>SEND</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles=StyleSheet.create({
    TextInput:{
        width:'100%',
        flex:0,
        flexDirection:'row',
        alignItems:'center',
        gap:20,
        marginBottom:10,
    },
    button:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        width:'30%',
        height:40,
        color:'black',
        borderRadius:10,
        backgroundColor:'#3BCF3C',
        marginRight:10,
    },
    input:{
        backgroundColor:'#B8B4BD',
        borderWidth:2,
        borderColor:'#000000',
        color:'#000000',
        width:'70%',
        borderRadius:10,
        marginLeft:10,
        padding:10, 
    },
    messageList:{
      marginTop:10,
      marginLeft:10,
      marginBottom:50,
    }
})

export default Chat

