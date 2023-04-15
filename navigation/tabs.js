import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../src/screens/Customer/HomeScreen';
import PaymentScreen from '../src/screens/Customer/PaymentScreen';
import ProfileScreen from '../src/screens/Customer/ProfileScreen';
import ResetPassword from '../src/components/Customer/Profile/ResetPassword';
import { Entypo, MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import EditProfileScreen from '../src/components/Customer/Profile/EditProfileScreen';
import profileNavigation from './profilenavigation';
import CartScreen from '../src/screens/Customer/CartScreen';
import HomeProduct from '../src/components/Customer/Home/HomeProduct';
import { AuthProvider } from '../src/context/AuthContext';
import OrderScreen from '../src/screens/Customer/OrderScreen';

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <AuthProvider>
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false


            }}
        >
            <Tab.Screen name="Home"
                component={HomeProduct}
                options={
                    {
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Entypo name="home" size={24} color="black" />
                                <Text style={{ fontSize: 10 }}>HOME</Text>
                            </View>
                        )
                    }}
            />


            <Tab.Screen
                name='Orders'
                component={OrderScreen}
                options={
                    {
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <MaterialIcons name="payment" size={24} color="black" />
                                <Text style={{ fontSize: 10 }}>ORDER</Text>
                            </View>
                        )
                    }}></Tab.Screen>
            <Tab.Screen
                name='Profile'
                component={ProfileScreen}
                options={
                    {
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Ionicons name="person" size={24} color="black" />
                                <Text style={{ fontSize: 10 }}>YOU</Text>
                            </View>
                        )
                    }}
            ></Tab.Screen>
            <Tab.Screen
                name='Cart'
                component={CartScreen}
                options={
                    {
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <FontAwesome name="shopping-cart" size={24} color="black" />
                                <Text style={{ fontSize: 10 }}>CART</Text>
                            </View>
                        )
                    }}
            ></Tab.Screen>
        </Tab.Navigator>
        </AuthProvider>
    )
}

export default Tabs