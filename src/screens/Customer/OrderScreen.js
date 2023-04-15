import React, { useState, useEffect } from 'react'
import { Box, Heading, HStack, ScrollView, Text, View, } from "native-base"

import WebView from 'react-native-webview'
import { TextInput,  Pressable } from 'react-native'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native'
import consts from '../../consts/consts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { FlatList } from 'react-native'

const Colors = consts.Colors
function OrderScreen (route, {navigation}) {
    const [isLoading, setisLoading] = useState(true)
    const [orders, setorders] = useState([]);
    const [wallet, setwallet] = useState("")
    useEffect(() => {
        
        getOrders();
     
    })
    useEffect(() => {
        if (orders) {
            // console.log(products)
            setisLoading(false)
            // console.log(isLoading)
            // console.log("Da co data")
            // modifyProductPrice(products)
            // setBgColor();
        }
    })
  const getOrders = async() => {
    let token = await AsyncStorage.getItem('keys')
    token = JSON.parse(token)
    console.log(token)
    axios
        .get(`${consts.URL_API}/user/order`, 
        {
            headers: {'Authorization': `Bearer ${token.accessToken}`}
        },
        )
        .then(res => {
            // console.log("test")
            // console.log(res.data.length);
            setorders(res.data);
            // AsyncStorage.setItem('countOders', JSON.stringify(userInfor));
            // setkeys({})
            // setisLoading(false);
        })
        .catch(e => {
            console.log(e);
            // setisLoading(false)
        })
  }
  
  const setBgColor = () => {
    
        for (let j = 0; j < orders.length; j++) {
           
            let s = ""
            let status = orders[j].statusName.toString()
            // console.log(status)
            if (status == "Đã Huỷ") {
                orders[j].bgcolor = "#db041d"
                // orders[j].bgcolor =  "#00fc5d"
            }
            else {
                orders[j].bgcolor =  "#00fc5d"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
            }
            if(status == "Đang Giao"){
                orders[j].bgcolor =  "#FF6347"
            }
            // console.log(orders[j].bgcolor)

            }

  }

  const rederItem = ({ item }) => {

    return (
        // <Text>?</Text>
       
        <View style={{height: 70, width: "85%", backgroundColor: item.bgcolor, padding: 5, borderRadius:15, marginVertical: 8, marginLeft: 15}}>
            <Pressable
            style={{
                flexDirection: "row",
                flex: 1,
                marginLeft: 3,
            }}
        >
            <View style={{ flex: 1, width: "90%", marginLeft: 3, marginBottom: 5, marginRight: 4, justifyContent: "space-between" }}>
                <Text fontWeight="bold">{item.address}</Text>
                <Text fontStyle="italic">{item.statusName}</Text>
                <Text>{item.dateCreated}</Text>
            </View>
        </Pressable >
        </View>
    )
}

    return (
        <SafeAreaView style={{ flex:1, backgroundColor: Colors.white, justifyContent: "space-between" }}>
        {/* Header */}
        {/* <View style={styles.header}>
            <Pressable onPress={() => { navigation.goBack("Profile") }} >
                <AntDesign name="arrowleft" size={26} color="#FF6347" />
            </Pressable>
            <Heading fontSize={26} w="90%" textAlign="center" color="#FF6347" >Orders</Heading>
        </View> */}
        <View flex={1} >
        {!isLoading && (
            <View  style={{flex: 1, h: "full"}}>

                <Heading color="#FF6347" alignSelf="center">ORDERS</Heading>
                <View >
                    {/* <Text>???</Text> */}
                    <FlatList
                        // marginLeft={2}
                        data={orders}
                        renderItem={rederItem}
                        keyExtractor={order => order.id}
                        numColumns={1}
                    ></FlatList>
                </View>
                <Pressable onPress={setBgColor()}><Text>.</Text></Pressable>
            </View>
        )}
        </View>
        
        {isLoading && (
            <></>
        )}

    </SafeAreaView>

        //  <SafeAreaView style={styles.container}>
          
        //   <Pressable style={styles.buttonAdd} onPress={() => { getOrders() }}>
        //     <Text style={styles.buttonAddText}>Get Orders</Text>
        //   </Pressable>
        //  </SafeAreaView>
    )
}

export default OrderScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  title: {
    alignSelf: 'center',
    marginBottom: 2
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 25,
    paddingLeft: 20
 
},
textLabel: {
  
  marginHorizontal: 20,
  fontWeight: 'bold'


},
buttonAdd: {
  backgroundColor: "#FF6347",
  height: 55,
  alignItems: "center",
  borderRadius: 35,
  marginHorizontal: 20,
  marginTop: 20,
  borderWidth: 1,
  borderColor: Colors.black,
  justifyContent: "center"
},
buttonAddText: {
  fontSize: 20,
  fontWeight: '600',
  color: 'black',
  letterSpacing: 0.5
},
})