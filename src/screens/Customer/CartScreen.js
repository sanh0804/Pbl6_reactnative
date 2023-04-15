
import React, { useState, useEffect } from "react";
import { Text, Image, View, StyleSheet, DevSettings, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import consts from "../../consts/consts"
import { AntDesign } from '@expo/vector-icons';
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Box, Heading, HStack } from "native-base";
import NumbericInput from "react-native-numeric-input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


function OrderScreen({ route, navigation }) {
    const Colors = consts.Colors
    const tempProduct = route.params
    // console.log(tempProduct)
    const [products, setproducts] = useState([])
    
    const [total, settotal] = useState(null)
    const [image, setimage] = useState("")
    const [isLoading, setisLoading] = useState(true)


    // const [data, setdata] = useState([])
    useEffect(() => {

        // console.log(item)
        // const unsubcribe = navigation.addListener('focus', () => {
        //     getDataFromDB();
        //     getTotal(products);
        // })
        // return unsubcribe
        // console.log(products)
        // modifyProductPrice(products)
        // getDataFromDB();
        // modifyProductPrice(products)
        getDataFromApi();
        getTotal(products);

    }, [navigation]);
    useEffect(() => {
        if (products) {
            console.log(products)
            setisLoading(false)
            // console.log(isLoading)
            // console.log("Da co data")
            // modifyProductPrice(products)
        }
    })

    //get data from api
    const getDataFromApi = async() => {
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
            console.log(res.data[0].orderDetails);
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


    //get data from local DB by ID
    const getDataFromDB = async () => {
        let items = JSON.parse( await AsyncStorage.getItem('cartItems'));
        console.log("test")
        console.log(items)
        

        // items = JSON.parse(items);
        // items = [... new Set(items)]
        // console.log(items)
        var data = [];
   
        if (items) {
            for (let i = 0; i < items.length; i++) {
                // console.log(items[i].id)
                // dem[parseInt(items[i])] += 1;
                // console.log(dem[parseInt(items[i])])

                    const apiURL = await consts.URL_API + "/item/" + items[i].id;
                    axios({
                        method: 'get',
                        url: apiURL,
                    }).then((response) => {
                        // console.log(response.data)
                        response.data.count = items[i].count
                        console.log(response.data)
                        data.push(response.data)

                        // dataImg.push(response.data[0].images[0].path)
                        getTotal(data)
                        setproducts(data)
                        // setimage(dataImg)
                        settotal(total + parseInt(response.data.price))
                    });
                
            }
        }


        // setproducts(items)

        return

    }

    const getTotal = (productData) => {
        let total = 0;
        for (let index = 0; index < productData.length; index++) {
            let productPrice = productData[index].price;
            // console.log(productPrice)
            total = total + parseInt(productPrice);
        }
        settotal(total)
        // console.log(total)
    };

    //remove item form cart
    const deleteItem = async (id) => {
        let itemArray = await AsyncStorage.getItem('cartItems');
        itemArray = JSON.parse(itemArray)
        // itemArray = [... itemArray]
        // console.log(itemArray)
        let array = itemArray
        for (let index = 0; index < array.length; index++) {
            if (array[index].id == id) {
                array.splice(index, 1)
            }
        }
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        console.log("??")
        getDataFromDB();
    }

    const modifyProductPrice = (products) => {
        for (let j = 0; j < products.length; j++) {
            let count = 0;
            let s = ""
            let Price = products[j].price.toString()
            for (let i = Price.length - 1; i>=0 ; i--) {
                if (count == 2 && i !=  0) {
                    s =  "." + Price[i]+ s
                    count = 0
                }
                else {
                    s = Price[i] + s
                    count += 1
                }
            }
            products[j].Price = s
            }

            
        // console.log(s)
    }

    // const 

    // const handleAddToCart = () => {

    // }


    // const 

    const rederItem = ({ item }) => {

        return (
            // <Text>?</Text>
            <Pressable
                style={{
                    flexDirection: "row",
                    flex: 1,
                    marginLeft: 3,
                }}
            >
                <View >
                    <Image
                        style={{ height: 100, width: 100, margin: 5, borderRadius: 10 }}
                        source={{ uri: item.itemImg }} resizeMode="contain"
                    ></Image>
                </View>

                <View style={{ flex: 1, width: "90%", marginLeft: 3, marginBottom: 5, marginRight: 4, justifyContent: "space-between" }}>
                    <Heading style={{ fontSize: 16, }}>{item.itemName}</Heading>
                    <View>
                        <Text >{item.quantity}x{item.price} đ</Text>
                        <View style={{ marginTop: 3, width: "90%", flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                            <NumbericInput
                                totalHeight={30}
                                totalWidth={110}
                                minValue={0}
                                step={1}
                                rounded="md"
                                borderColor={Colors.darkgray}
                                value={item.quantity}
                            ></NumbericInput>
                            <Pressable onPress={() => deleteItem(item.id)}>
                                <AntDesign name="delete" size={24} color="black" />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Pressable >

        )
    }



    return (
        <SafeAreaView style={{ flex:1, backgroundColor: Colors.white, justifyContent: "space-between" }}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => { navigation.goBack("ProductInfor") }} >
                    <AntDesign name="arrowleft" size={26} color="#FF6347" />
                </Pressable>
                <Heading fontSize={26} w="90%" textAlign="center" color="#FF6347" >Order Details</Heading>
            </View>
            <View flex={1} >
            {!isLoading && (
                <View  style={{flex: 1, h: "full"}}>
                    <View style={{flex:0.85}}>
                        {/* <Text>???</Text> */}
                        <FlatList
                            // marginLeft={2}
                            data={products}
                            renderItem={rederItem}
                            keyExtractor={product => product.id}
                            numColumns={1}
                         
                        ></FlatList>
                    </View>
                    <View style={{flex:0.15, borderRadius: 20, marginTop: 2}}>
                        <View style={{ alignItems: "flex-end", marginRight: 20 }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Tổng: {total}</Text>
                        </View>

                        <Pressable style={styles.buttonAdd} onPress={() => { navigation.navigate("Payment") }}>
                            <Text style={styles.buttonAddText}>Thanh Toán</Text>
                        </Pressable>
                    </View>
                </View>
            )}
            </View>
            
            {isLoading && (
                <></>
            )}
            
        </SafeAreaView>

    )
}

export default OrderScreen

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 5,
        flexDirection: 'row',
        borderRadius: 20,
        
        
        // justifyContent: 'space-between'
    },
    imageContainer: {
        flex: 0.45,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    detailsContainer: {
        flex: 0.55,
        backgroundColor: "#f2f2f2",
        margionHorizontal: 7,
        borderRadius: 20,
        marginTop: 30,
        padding: 30,
    },
    buttonAdd: {
        backgroundColor: "#FF6347",
        height: 55,
        alignItems: "center",
        borderRadius: 35,
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: Colors.main,
        justifyContent: "center"
    },
    buttonAddText: {
        fontSize: 20,
        fontWeight: '600',
        color: 'black',
        letterSpacing: 0.5
    },
})