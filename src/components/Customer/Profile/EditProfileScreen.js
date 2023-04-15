import React, { useState, useEffect } from 'react'
import { NativeBaseProvider, Text, View } from "native-base"
import { Avatar, Title, Caption, TouchableRipple } from 'react-native-paper'
import { StyleSheet, TextInput } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { TextInput } from 'react-native-gesture-handler'
import axios from 'axios'
import consts from '../../../consts/consts'

const EditProfileScreen = ({ navigation }) => {
    const [check, setcheck] = useState(true)
    const [username, setusername] = useState("")
    const [phonenumber, setphonenumber] = useState("")
    const [address, setaddress] = useState("")

    // const {getuserInfor} = useContext(AuthContext)

    const [userInfor, setuserInfor] = useState({})

    useEffect(() => {
        // console.log( AsyncStorage.getItem('keys'))
        // userInfor = JSON.parse(userInfor)
        // console.log(userInfor)

        // getDataFromDB();

    // //    getuserInfor();
    if (check) {
        getDataFromDB();
        // getWallet();
        setcheck(false)
    }
    })

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
    const updateUser = async(username, phonenumber, address) => {
        let token = await AsyncStorage.getItem('keys')
        token = JSON.parse(token)
        console.log(token)
         
        axios
            .put(`${consts.URL_API}/user`, {
                username,
                phonenumber,
                address
            },
            {
                headers: {'Authorization': `Bearer ${token.accessToken}`}
            },
            )
            .then(res => {
                let usinf = res.data;
                alert(usinf);
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <NativeBaseProvider>

            <SafeAreaView style={styles.container}>
                <View style={styles.userInforSection}>
                    <View style={{ marginTop: 15, flexDirection: 'row' }}>
                        <Avatar.Image
                            source={require('../../../../assets/favicon.png')}
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

                    <View style={{ marginTop: 30 }}>
                        <View style={styles.menuEdit}>
                            <FontAwesome name='user-o' size={20}></FontAwesome>
                            <TextInput
                                placeholder='User Name'
                                placeholderTextColor="#666"
                                style={styles.textInput}
                                value={username}
                                onChangeText={text => { setusername(text) }}
                            ></TextInput>
                        </View>

                        <View style={styles.menuEdit}>
                            <FontAwesome name='envelope-o' size={20}></FontAwesome>
                            <TextInput
                                placeholder={userInfor.email}
                                placeholderTextColor="#666"
                                style={styles.textInput}
                                editable={false}
                                
                            ></TextInput>
                        </View>

                        <View style={styles.menuEdit}>
                            <Feather name="phone" size={20} />
                            <TextInput
                                placeholder='Phone Number'
                                placeholderTextColor="#666"
                                style={styles.textInput}
                                value={phonenumber}
                                onChangeText={text => { setphonenumber(text) }}
                            ></TextInput>
                        </View>
                        <View style={styles.menuEdit}>
                            <Entypo name="location" size={20} />
                            <TextInput
                                placeholder='Address'
                                placeholderTextColor="#666"
                                style={styles.textInput}
                                value={address}
                                onChangeText={text => { setaddress(text) }}
                            ></TextInput>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.commandButton} onPress={() => { updateUser(username, phonenumber, address)}}>
                        <Text style={styles.panelButtonTitle}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView >
        </NativeBaseProvider>
    )
}

export default EditProfileScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInforSection: {
        paddingHorizotal: 30,
        marginBottom: 35,
        marginLeft: 20
    },
    menuEdit: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: "#f2f2f2",
        paddingBottom: 5,

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',

    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    inforBoxWrapper: {
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    inforBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: "#05375a",

    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
        marginRight: 20,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
})