import React, { useState, useEffect } from 'react'
import { Heading, Text, View, } from "native-base"

import WebView from 'react-native-webview'
import { TextInput,  Pressable } from 'react-native'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native'
import consts from '../../consts/consts'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import VnPayScreen from './VnPayScreen'
import { useNavigation } from '@react-navigation/native';


const Colors = consts.Colors
function PaymentScreen({route,navigation}) {
  // const navigation = useNavigation(); 
  const [Country, setCountry] = useState("")
  const [City, setCity] = useState("")
  const [Address, setAddress] = useState("")
  const [BankCode, setBankCode] = useState("")
  const [PhoneNumber, setPhoneNumber] = useState("")
  const [Bank, setBank] = useState("")
  const [Total, setTotal] = useState("")
  const [inforPay, setinforPay] = useState({})
  const [orderDetails, setorderDetails] = useState([])
  const [products, setproducts] = useState([])
  const [check1, setcheck1] = useState(true)
  const [check2, setcheck2] = useState(1)
  const [link, setlink] = useState("https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=5000000&vnp_BankCode=NCB&vnp_Bill_Address=30+Tr%C6%B0%E1%BB%9Dng+Chinh&vnp_Bill_City=%C4%90%C3%A0+N%E1%BA%B5ng&vnp_Bill_Country=Vi%E1%BB%87t+Nam&vnp_Bill_Mobile=2222222222&vnp_Command=pay&vnp_CreateDate=20221227214057&vnp_CurrCode=VND&vnp_Inv_Address=30+Tr%C6%B0%E1%BB%9Dng+Chinh&vnp_Inv_Company=%C4%90%C3%A0+N%E1%BA%B5ng&vnp_Inv_Phone=2222222222&vnp_Inv_Taxcode=Vi%E1%BB%87t+Nam&vnp_IpAddr=117.2.120.33%3A52808&vnp_Locale=vn&vnp_OrderInfo=%C4%90%C6%A1n+h%C3%A0ng%3A+%232CLOTHYORD-64&vnp_ReturnUrl=https%3A%2F%2Fcommerce-2clothy.azurewebsites.net%2Fapi%2Fpayment%2Fsuccess&vnp_TmnCode=4TF6AEFA&vnp_TxnRef=%232CLOTHYORD-64&vnp_Version=2.1.0&vnp_SecureHash=809f62db930d2d573b93109cb40345b74b308d55eac1020b3dcbea707c2f76bf66a5796be60395372a42c9c2ae925a148d2fe8cfd9fbf10ae680d14de8e0dcba")

  const getCart = async() => {
    console.log("cart")
    let token = await AsyncStorage.getItem('keys')
        token = JSON.parse(token)
        // console.log(token)
        axios
        .get(`${consts.URL_API}/cart`, 
        {
            headers: {'Authorization': `Bearer ${token.accessToken}`}
        },
        )
        .then(res => {
            // console.log("test")
            // console.log(res.data[0].orderDetails);
            // console.log(res.data.shopId);
            setproducts(res.data[0].orderDetails);
            // AsyncStorage.setItem('countOders', JSON.stringify(userInfor));
            // setkeys({})
            // setisLoading(false);
        })
        .catch(e => {
            console.log(e);
            // setisLoading(false)
        })
  }
  const getorderDetails = () => {
    let s = 0
    let array = [];
    let tmp = {};
    for (let i =0; i<products.length; i++) {
      tmp.ItemId = products[i].id;
      tmp.Quantity = products[i].quantity;
      s += parseInt(products[i].price )* parseInt(products[i].quantity )
      array.push(tmp)
      console.log(array)
      setorderDetails(array)
      // console.log(s)
      setTotal(s)
    }
  }
  
  const handlePay = async() => {
   setinforPay(
    {
      Address : Address,
      City: City,
      Country: Country,
      BankCode: BankCode,
      PaymentId: 6,
      PhoneNumber: PhoneNumber,
      Total: Total,
      ShopId: 1,
      Details: [
      {   
          "ShopId": 1,
          "OrderDetails":
          orderDetails
      }
      ]
    }
   )
    console.log(inforPay)
    console.log(orderDetails)

    let token = await AsyncStorage.getItem('keys')
    token = JSON.parse(token)
    
    let ShopId = 1
    let PaymentId = 2
    var Details = [
      {   
          ShopId,
          orderDetails
      }
      ]

    console.log(Details)

   try {
    await axios.post(`${consts.URL_API}/payment/vnpay`, {
      Address,
      City,
      Country,
      BankCode,
      PaymentId,
      PhoneNumber,
      Total,
      Details
    },
    {
      headers: {'Authorization': `Bearer ${token.accessToken}`}
    },
    
    )
    .then(res => {
        console.log("paydone")
        console.log(res.data);
        setlink(res.data)

    })
    .catch(e => {
        console.log(e);

    })
} catch (error) {
    
}

  // navigation.navigate("Home");
  navigation.navigate("VnPay", link)

  }



  useEffect(() => {
  if (check1)
  {
          
  getCart(); 
  // setcheck2(1)
  setcheck1(false)
  
  }
})
useEffect(() => {

  
    if (products && check2 < 250) {
        getorderDetails();
        // console.log(products.length)
        
        setcheck2(check2+1)
        console.log(check2)
    }
})


    return (
         <SafeAreaView style={styles.container}>
          <Heading style={styles.title}>Thông tin thanh toán</Heading>
          <Text style={styles.textLabel}>Quốc gia</Text>
          <TextInput 
           style={styles.textInput} placeholder=""
           value={Country}
           onChangeText = {text => {setCountry(text)}}
           ></TextInput>

          <Text style={styles.textLabel} >Thành Phố</Text>
          <TextInput style={styles.textInput}
           value={City}
           onChangeText = {text => {setCity(text)}}
          ></TextInput>

          <Text style={styles.textLabel}>Địa chỉ cụ thể</Text>
          <TextInput style={styles.textInput}
          value={Address}
          onChangeText = {text => {setAddress(text)}}
          ></TextInput>

          <Text style={styles.textLabel}>Số điện thoại</Text>
          <TextInput style={styles.textInput}
           value={PhoneNumber}
           onChangeText = {text => {setPhoneNumber(text)}}
          ></TextInput>

          <Text style={styles.textLabel}>Ngân hàng</Text>
          <TextInput style={styles.textInput}
           value={BankCode}
           onChangeText = {text => {setBankCode(text)}}
          ></TextInput>

          <Text style={styles.textLabel}>Tên chủ thẻ</Text>
          <TextInput style={styles.textInput}></TextInput>

          <Text style={styles.textLabel}>Số thẻ</Text>
          <TextInput style={styles.textInput}></TextInput>

          <Text style={styles.textLabel}>Ngày hết hạn</Text>
          <TextInput style={styles.textInput}></TextInput>
          <Pressable style={styles.buttonAdd} onPress={() => { handlePay(Country, City, Address, BankCode, PhoneNumber) }}>
            <Text style={styles.buttonAddText}>Thanh Toán</Text>
          </Pressable>
         </SafeAreaView>
    )
}

export default PaymentScreen


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