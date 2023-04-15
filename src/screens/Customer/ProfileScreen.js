import React, { useContext, useEffect, useState } from 'react'
import { NativeBaseProvider, Text, View } from "native-base"
import { Avatar, Title, Caption, TouchableRipple } from 'react-native-paper'
import styles from "../../styles/screens/Customer/ProfileScreenStyle"
import { SafeAreaView } from 'react-native-safe-area-context'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext, AuthProvider } from '../../context/AuthContext'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { Pressable } from 'react-native'
import axios from 'axios'
import consts from '../../consts/consts'




const ProfileScreen = ({ navigation }) => {
    const [wallet, setwallet] = useState("");
    const [countOders, setcountOrders] = useState("")
    const {loguot} = useContext(AuthContext);
    const [check, setcheck] = useState(true)
    // const {getuserInfor} = useContext(AuthContext)

    const [userInfor, setuserInfor] = useState({})

    useEffect(() => {
        // console.log( AsyncStorage.getItem('keys'))
        // userInfor = JSON.parse(userInfor)
        // console.log(userInfor)

        // getDataFromDB();

    //    getuserInfor();
    if (check) {
        getDataFromDB();
        getWallet();
        setcheck(false)
    }
    })

    
    const getWallet = async() => {
        let token = await AsyncStorage.getItem('keys')
        token = JSON.parse(token)
        console.log(token)
        axios
        .get(`${consts.URL_API}/user/wallet`, 
        {
            headers: {'Authorization': `Bearer ${token.accessToken}`}
        },
        )
        .then(res => {
            // console.log("test")
            // console.log(res.data.length);
            setwallet(res.data);
            // AsyncStorage.setItem('userInfor', JSON.stringify(userInfor));
            // setkeys({})
            // setisLoading(false);
        })
        .catch(e => {
            console.log(e);
            // setisLoading(false)
        })

        axios
        .get(`${consts.URL_API}/user/order`, 
        {
            headers: {'Authorization': `Bearer ${token.accessToken}`}
        },
        )
        .then(res => {
            // console.log("test")
            // console.log(res.data.length);
            setcountOrders(res.data.length);
            // AsyncStorage.setItem('userInfor', JSON.stringify(userInfor));
            // setkeys({})
            // setisLoading(false);
        })
        .catch(e => {
            console.log(e);
            // setisLoading(false)
        })

      }



    // const handleLogout = () => {
    //     loguot();
    // }




    const getDataFromDB = async () => {
        // let userInfo = await AsyncStorage.getItem('userInfor')
        // userInfo = JSON.parse(userInfo)
        // await setuserInfor(userInfo)
        // console.log(userInfo)
        let token = await AsyncStorage.getItem('keys')
        token = JSON.parse(token)
        axios
        .get(`${consts.URL_API}/user`, 
        {
            headers: {'Authorization': `Bearer ${token.accessToken}`}
        },
        )
        .then(res => {
            // console.log("test")
            console.log(res.data);
            setuserInfor(res.data);
            // setuserInfor(res.data);
            // AsyncStorage.setItem('userInfor', JSON.stringify(res.data));
            // setkeys({})
            // setisLoading(false);
        })
        .catch(e => {
            console.log(e);
            // setisLoading(false)
        })
        }



    

    return (
     <AuthProvider>
        <NativeBaseProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.userInforSection}>
                    <View style={{ marginTop: 15, flexDirection: 'row' }}>
                        <Avatar.Image
                            source={require('../../../assets/favicon.png')}
                            size={80}
                        >
                        </Avatar.Image>
                        <View style={{ marginLeft: 20 }}>
                            <Title style={[styles.title,
                            { marginTop: 15, marginBottom: 5 }]}>
                                {userInfor.name}
                            </Title>
                            <Caption style={styles.caption}>{userInfor.email}</Caption>
                        </View>
                    </View>
                </View>

                <View style={styles.userInforSection}>
                    <View style={styles.row}>
                        <Entypo name="location" size={20} color="#777" />
                        <Text style={{ color: '#777', marginLeft: 15 }}>{userInfor.address}</Text>
                    </View>
                    <View style={styles.row}>
                        <FontAwesome name="phone" size={20} color="#777" />
                        <Text style={{ color: '#777', marginLeft: 19 }}>{userInfor.phoneNumber}</Text>
                    </View>
                    <View style={styles.row}>
                        <FontAwesome name="envelope" size={20} color="#777" />
                        <Text style={{ color: '#777', marginLeft: 15 }}>{userInfor.email}</Text>
                    </View>
                </View>


                <View style={styles.inforBoxWrapper}>
                    <View style={[styles.inforBox, {
                        borderRightColor: '#ddd',
                        borderRightWidth: 1,
                    }]}>
                        <Title>{wallet}</Title>
                        <Caption>Wallet</Caption>
                    </View>
                    <Pressable style={styles.inforBox} onPress={() =>  {navigation.navigate("Orders")}}>
                        <Title>{countOders}</Title>
                        <Caption>Orders</Caption>
                    </Pressable>
                </View>


                <View style={styles.menuWrapper}>
                    <TouchableRipple onPress={() => { }}>
                        <View style={styles.menuItem}>
                            <FontAwesome name="money" size={25} color="#FF6347" />
                            <Text style={styles.menuItemText}>Ví</Text>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => { navigation.navigate("Orders") }}>
                        <View style={styles.menuItem}>
                            <FontAwesome name="list-alt" size={25} color="#FF6347" />
                            <Text style={styles.menuItemText}>Hoá đơn</Text>
                        </View>
                    </TouchableRipple>
                    {/* <TouchableRipple onPress={() => { }}>
                        <View style={styles.menuItem}>
                            <FontAwesome name="question" size={25} color="#FF6347" />
                            <Text style={styles.menuItemText}>  Help</Text>
                        </View>
                    </TouchableRipple> */}
                    <Pressable onPress={() => { navigation.navigate("EditProfile")}}>
                        <View style={styles.menuItem}>
                            <FontAwesome name="cog" size={25} color="#FF6347" />
                            <Text style={styles.menuItemText}>Sửa thông tin</Text>
                        </View>
                    </Pressable>
                    <TouchableRipple onPress={() => { loguot() }}>
                        <View style={styles.menuItem}>
                            <MaterialIcons name="logout" size={25} color="#FF6347" />
                            <Text style={styles.menuItemText}>Đăng xuất</Text>
                        </View>
                    </TouchableRipple>
                </View>
            </SafeAreaView >
        </NativeBaseProvider>
        </AuthProvider>

    )
}

export default ProfileScreen


