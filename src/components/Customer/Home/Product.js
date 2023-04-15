import React, { useState, useEffect } from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity, Pressable, Toast, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import consts from "../../../consts/consts"
import { AntDesign } from '@expo/vector-icons';
import { Colors } from "react-native/Libraries/NewAppScreen";
import NumbericInput from "react-native-numeric-input";
import { FlatList, Heading, HStack, ScrollView } from "native-base";

import { Fontisto } from '@expo/vector-icons';
import { set } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import ProductServices from "../../../../services/ProductServices";


export function Product({ route, navigation }) {
    const Colors = consts.Colors;
    const [product, setproduct] = useState({});
    const [item, setitem] = useState(route.params)
    const [image, setimage] = useState("https://assets.adidas.com/images/w_280,h_280,f_auto,q_auto:sensitive/f0614164005b4004a629ae7a018764f5_9366/áo-len-chui-đầu-3-sọc.jpg")
    const [count, setcount] = useState(1)
    const [cartProducts, setcartProducts] = useState([])
    const [isLoading, setisLoading] = useState(true)
    const [countProductCart, setcountProductCart] = useState(0)

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


    const handleAddToCart = async (id) => {
        console.log(count)
        
        setcount(countProductCart + 1);
        // let countArray = [];
        // let tmp = await AsyncStorage.getItem('countItemOnCart')
        // countArray = JSON.parse(tmp)
        // countArray.push(count)
        // await AsyncStorage.setItem('countItemOnCart', JSON.stringify(countArray));
        // console.log(await AsyncStorage.getItem('countItemOnCart'))

        // await AsyncStorage.setItem('cartItems', JSON.stringify([]));
        // console.log(await AsyncStorage.getItem('cartItems'))
        let itemArray = await AsyncStorage.getItem('cartItems');
        // console.log(itemArray)
        itemArray = JSON.parse(itemArray)
        
        if (itemArray) {
            let array = itemArray
            // let array = []
            // array.push(id);
            // const sett = new Set(array)
            const tmp = {
                count : count,
                id: id
            }
            array.push(tmp)
            try {
                await AsyncStorage.setItem('cartItems', JSON.stringify(array));
                Alert.alert("Item Added Successfully");
            } catch (error) {
                return error
            }
        }
        else {
            let array = [];
            // array.push(id);
            // const sett = new Set(array)
            const tmp = {
                count : count,
                id: id
            }
            array.push(tmp)
          
            try {
                await AsyncStorage.setItem('cartItems', JSON.stringify(array));
                Alert.alert(
                    "Item Added Successfully"
                );
            } catch (error) {
                return error
            }
        }

        let items = await AsyncStorage.getItem('cartItems');

        items = JSON.parse(items);
        console.log(items)
        
        console.log(items[0].count)
        product.count = count
        // console.log(product)
        console.log("end Products")



    }



    useEffect(() => {
        getProduct();
    }, [])

    useEffect(() => {
        console.log(product)
        if (product) {
            setisLoading(false)
            // setimage(product.image[0].path)
            modifyProductPrice(product)
        }
        console.log(isLoading)

    }, [product])


    const getProduct = async () => {
        console.log(item.id)
        const apiURL = consts.URL_API + "/item/" + item.id
        await axios({
            method: 'get',
            url: apiURL,
        }).then((response) => {
            console.log(response.data)
            setproduct(response.data)
            setimage(response.data.images[0].path)
            // settotal(total + parseInt(response.data[0].price))
        });
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <View style={styles.header}>
                <Pressable onPress={() => { navigation.goBack("Home") }} >
                    <AntDesign name="arrowleft" size={24} color="#FF6347" />
                </Pressable>
                <Pressable style={{ flexDirection: "row" }} onPress={() => { navigation.navigate("Cart", cartProducts) }} >
                    <View style={styles.countProduct} ><Text>{countProductCart}</Text></View>
                    <AntDesign name="shoppingcart" size={24} color="#FF6347" />
                </Pressable>

            </View>
            {isLoading && (
                <Text>NOT YET</Text>
            )}

            {!isLoading && (
                // <Text>{product.id}</Text>
                <View flex={1}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: image }}
                            style={{ height: "80%", width: "80%", resizeMode: "contain", flex: 1 }}
                        ></Image>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Pressable style={{ marginBottom: 15, flexDirection: "row" }} onPress={() => { navigation.navigate("Shop", product.shopId) }}>
                            <Fontisto name="shopping-store" size={18} color="#FF6347" />
                            <Text style={{ marginLeft: 10, color: "#FF6347" }}>{product.shopName}</Text>
                        </Pressable>
                        <ScrollView>
                            <View style={{

                                flexDirection: 'row',
                                justifyContent: 'space-between',

                            }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', }}>{product.name}</Text>

                            </View>
                            <View marginVertical={10}>
                                <Text style={{ fontWeight: "bold", fontSize: 15 }}>Size: {product.size}</Text>
                            </View>
                            <HStack space={2} alignItems="center" marginBottom={3} justifyContent="space-between">
                                <NumbericInput
                                    totalHeight={30}
                                    totalWidth={110}
                                    minValue={0}
                                    maxValue={100}
                                    step={1}
                                    rounded="md"
                                    borderColor={Colors.darkgray}
                                    value={count}

                                    onChange={value => setcount(value)}
                                ></NumbericInput>

                                <Text >{product.price} đ</Text>
                            </HStack>
                            <View>
                                <Heading fontSize={15} marginBottom={1}>About</Heading>
                                <Text  >{product.description}</Text>
                            </View>
                        </ScrollView>


                    </View>
                    <View>
                        <Pressable style={styles.buttonAdd} onPress={() => { handleAddToCart(product.id) }}>
                            <Text style={styles.buttonAddText}>Add to Cart</Text>
                        </Pressable>
                    </View>
                </View>
            )}


        </SafeAreaView>
    )
}
export default Product;
const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageContainer: {
        flex: 1,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
        height: "40%",
        width: "100%"
    },
    detailsContainer: {
        flex: 0.8,
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
    countProduct: {
        height: 17,
        width: 17,
        borderRadius: 17,
        backgroundColor: "red",
        position: "absolute",
        alignItems: "center"
    }
})