import React from 'react'
import { Box, Text, View, ScrollView } from "native-base"
import { Colors } from 'react-native/Libraries/NewAppScreen'
import HomeSearch from '../../components/Customer/Home/HomeSearch'
// import HomeProduct from '../../components/Customer/Home/HomeProduct'
import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'

import { createStackNavigator } from '@react-navigation/stack';

import Shop from "../../screens/Admin/Shop";
import OrderScreen from "./CartScreen";
import HomeProduct from "../../components/Customer/Home/HomeProduct";
import Product from "../../components/Customer/Home/Product";
import LoginScreen from '../Login/LoginScreen'
import Tabs from '../../../navigation/tabs'

const HomeScreen = ({ navigation }) => {
    const Stack = createStackNavigator();
    return (

  
        <NavigationContainer>
        {/* <Tabs></Tabs> */}
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
        >
          {/* <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen> */}
          <Stack.Screen name="Home" component={Tabs}></Stack.Screen>
          <Stack.Screen name="Cart" component={OrderScreen}></Stack.Screen>
          <Stack.Screen name="ProductInfor" component={Product}></Stack.Screen>
          <Stack.Screen name="Shop" component={Shop}></Stack.Screen>
        </Stack.Navigator>

       </NavigationContainer>
  

    )
}

export default HomeScreen