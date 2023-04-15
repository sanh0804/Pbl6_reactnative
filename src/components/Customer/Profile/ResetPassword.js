import React from 'react'
import { NativeBaseProvider, Text, View } from "native-base"
import { Avatar, Title, Caption, TouchableRipple } from 'react-native-paper'
import { StyleSheet, TextInput } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'

import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler'
// import { TextInput } from 'react-native-gesture-handler'


const ResetPassword = ({ navigation }) => {
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
                                Do Sanh
                            </Title>
                            <Caption style={styles.caption}>@do_sanh</Caption>
                        </View>
                    </View>

                    <View style={{ marginTop: 30, alignItems: 'center' }}>

                        <View style={styles.menuEdit}>
                            <Feather name="unlock" size={20} />
                            <TextInput
                                placeholder='Old Password'
                                placeholderTextColor="#666"
                                style={styles.textInput}
                            ></TextInput>
                        </View>

                        <View style={styles.menuEdit}>
                            <Feather name="lock" size={20} />
                            <TextInput
                                placeholder='New Password'
                                placeholderTextColor="#666"
                                style={styles.textInput}
                            ></TextInput>
                        </View>

                        <View style={styles.menuEdit}>
                            <MaterialIcons name="done" size={20} />
                            <TextInput
                                placeholder='Confirm New Password'
                                placeholderTextColor="#666"
                                style={styles.textInput}
                            ></TextInput>
                        </View>

                    </View>
                    <TouchableOpacity style={styles.commandButton}>
                        <Text style={styles.panelButtonTitle}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView >
        </NativeBaseProvider>
    )
}

export default ResetPassword


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