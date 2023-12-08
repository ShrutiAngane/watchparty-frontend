import React from 'react'
import { Text,View,StyleSheet } from 'react-native'

const Message = ({item}) => {
  return (
    <>
      {!item.event&&<View style={[item.isMine ? styles.rightAligned : styles.leftAligned,
            item.text.length>=25?styles.standardWidth:'']}>
        <Text style={[styles.messageDetails,item.isMine ? styles.rightAligned : styles.leftAligned]}>{item.isMine ?`You ${item.timestamp}`:`Charlie ${item.timestamp}`}</Text>
        <View
          style={[
            styles.container,
          ]}>
          <Text style={styles.textContent}>{item.text}</Text>
        </View>
      </View>}
      {
        item.event && <Text style={{color:'silver',textAlign:'center',paddingBottom:10}}>{item.text}</Text>
      }
    </>
  );
}

const styles=StyleSheet.create({
    container:{
    backgroundColor: 'silver',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    marginBottom:10,
    marginRight:10,
    },
    standardWidth:{
      width:250,
    },
    textContent: {
        fontSize: 17,
        fontWeight: '500',
        flexShrink: 1,
        color:'#000000'
      },
    leftAligned:{
      alignSelf:'flex-start',
      width:'auto',
    },
    rightAligned:{
      alignSelf:'flex-end',
      marginRight:15,
    },
    messageDetails:{
      color:'silver',
      fontSize:15,
      fontStyle:'italic',
    }
})

export default Message
