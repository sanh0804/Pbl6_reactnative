import React from 'react'
import { NativeBaseProvider, Text, View } from "native-base"
import { Avatar, Title, Caption, TouchableRipple } from 'react-native-paper'
import styles from "../../../styles/components/Customer/Profile"
import { SafeAreaView } from 'react-native-safe-area-context'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';






const HomeProfile = ({ navigation }) => {
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
                </View>

                <View style={styles.userInforSection}>
                    <View style={styles.row}>
                        <Entypo name="location" size={20} color="#777" />
                        <Text style={{ color: '#777', marginLeft: 15 }}>64 Nhon Hoa 5, Hoa An, Cam Le</Text>
                    </View>
                    <View style={styles.row}>
                        <FontAwesome name="phone" size={20} color="#777" />
                        <Text style={{ color: '#777', marginLeft: 15 }}>+84842770868</Text>
                    </View>
                    <View style={styles.row}>
                        <FontAwesome name="envelope" size={20} color="#777" />
                        <Text style={{ color: '#777', marginLeft: 15 }}>dosanh001@gmail.com</Text>
                    </View>
                </View>


                <View style={styles.inforBoxWrapper}>
                    <View style={[styles.inforBox, {
                        borderRightColor: '#ddd',
                        borderRightWidth: 1,
                    }]}>
                        <Title>$999</Title>
                        <Caption>Wallet</Caption>
                    </View>
                    <View style={styles.inforBox}>
                        <Title>9</Title>
                        <Caption>Orders</Caption>
                    </View>
                </View>


                <View style={styles.menuWrapper}>
                    <TouchableRipple onPress={() => { }}>
                        <View style={styles.menuItem}>
                            <FontAwesome name="money" size={25} color="#FF6347" />
                            <Text style={styles.menuItemText}>Wallet</Text>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => { }}>
                        <View style={styles.menuItem}>
                            <FontAwesome name="list-alt" size={25} color="#FF6347" />
                            <Text style={styles.menuItemText}>Orders</Text>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => { }}>
                        <View style={styles.menuItem}>
                            <FontAwesome name="question" size={25} color="#FF6347" />
                            <Text style={styles.menuItemText}>  Help</Text>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => { }}>
                        <View style={styles.menuItem}>
                            <FontAwesome name="cog" size={25} color="#FF6347" />
                            <Text style={styles.menuItemText}>Settings</Text>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => { }}>
                        <View style={styles.menuItem}>
                            <MaterialIcons name="logout" size={25} color="#FF6347" />
                            <Text style={styles.menuItemText}>Log out</Text>
                        </View>
                    </TouchableRipple>
                </View>
            </SafeAreaView >
        </NativeBaseProvider>
    )
}

export default HomeProfile


