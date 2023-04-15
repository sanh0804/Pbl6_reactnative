import React, { useContext } from "react"

import { NativeBaseProvider } from "native-base"
// import LoginScreen from "./src/screens/Login/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";

import { Product } from "./src/components/Customer/Home/Product";


import { createStackNavigator } from '@react-navigation/stack';

import Shop from "./src/screens/Admin/Shop";
import CartScreen from "./src/screens/Customer/CartScreen";
import HomeProduct from "./src/components/Customer/Home/HomeProduct";
import LoginScreen from "./src/screens/Login/LoginScreen";

import { AuthProvider } from "./src/context/AuthContext";
import HomeScreen from "./src/screens/Customer/HomeScreen"
// import { Provider } from 'react-redux';
// import { store } from '~/app/store';
import WebView from "react-native-webview";
import { SafeAreaView } from "react-native";
import Tabs from './navigation/tabs';
import PaymentScreen from "./src/screens/Customer/PaymentScreen";
import ProfileScreen from "./src/screens/Customer/ProfileScreen";
import EditProfileScreen from "./src/components/Customer/Profile/EditProfileScreen";
import VnPayScreen from "./src/screens/Customer/VnPayScreen";


const Stack = createStackNavigator();
const App = () => {


  return (
    
      // <WebView
      //   originWhitelist={['*']}
      //   source={{ uri: 'http://sandbox.vnpayment.vn/tryitnow/Home/CreateOrder' }}
      // />

    // <NativeBaseProvider >
    //   <NavigationContainer>
    //     {/* <Tabs></Tabs> */}
    //     <Stack.Navigator
    //       screenOptions={{ headerShown: false }}
    //     >
    //       {/* <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen> */}
    //       <Stack.Screen name="Home" component={HomeProduct}></Stack.Screen>
    //       <Stack.Screen name="Cart" component={OrderScreen}></Stack.Screen>
    //       <Stack.Screen name="ProductInfor" component={Product}></Stack.Screen>
    //       <Stack.Screen name="Shop" component={Shop}></Stack.Screen>
    //       <Stack.Screen name="Payment" component={PaymentScreen}></Stack.Screen>
    //     </Stack.Navigator>
    //   </NavigationContainer>
    //   {/* <LoginScreen></LoginScreen> */}

    //   {/* <HomeScreen></HomeScreen> */}

    //   {/* <Product></Product> */}
    //   {/* <HomeProfile></HomeProfile> */}

    //   {/* <Shop></Shop> */}
    //   {/* <OrderScreen></OrderScreen> */}
    // </NativeBaseProvider >
    <AuthProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator  screenOptions={{ headerShown: false }}>
            
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen name="Cart" component={CartScreen}></Stack.Screen>
            <Stack.Screen name="Payment" component={PaymentScreen}></Stack.Screen>
            <Stack.Screen name="VnPay" component={VnPayScreen}></Stack.Screen>
            <Stack.Screen name="ProductInfor" component={Product}></Stack.Screen>
            <Stack.Screen name="Shop" component={Shop}></Stack.Screen>
          <Stack.Screen name="Profile" component={ProfileScreen}></Stack.Screen>
          <Stack.Screen name="EditProfile" component={EditProfileScreen}></Stack.Screen>
          
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </AuthProvider>
  )
}

export default App;