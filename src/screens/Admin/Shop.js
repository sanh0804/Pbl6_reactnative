import React, { useState, useEffect } from 'react'
import { Text, View, Box, Image, Heading, ScrollView, Flex, Pressable, FlatList } from "native-base"
import { FontAwesome5 } from '@expo/vector-icons';
import ProductServices from "../../../services/ProductServices"
import consts from '../../consts/consts';
import { HStack, Input } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Dimensions } from 'react-native'
import categoriesServices from "../../../services/CategoryServices"
import { Feather } from '@expo/vector-icons';
import unicodeSort from '@ivanhanak_com/js-sort-unicode';
import Animated from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';
import { Avatar, Title, Caption, TouchableRipple } from 'react-native-paper'
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';


function Shop({ route, navigation}) {

    const shopId = route.params
    const Colors = consts.Colors;
    // let products = ProductServices.getAll();
    const [shop, setshop] = useState({});
    const [isLoading, setisLoading] = useState(true);
    // const categories = categoriesServices.getAll() || [];
    const [query, setQuery] = useState('');
    const [sortVisible, setsortVisible] = useState(true);
    const [products, setproducts] = useState([]);
    const [categories, setcategories] = useState([]);
    const [avtShop, setavtShop] = useState("")
    // let fullData = ProductServices.getAll();

    // const getDataFromDB = () => {
    //     const apiURL = consts.URL_API + "/item"
    //     fetch(apiURL)
    //         .then((res) => res.json())
    //         .then((resJson) => {
    //             setproducts(resJson)
    //             setfullData(resJson)
    //         }).catch((err) => {
    //             console.log("ERROR: ", err);
    //         })
    // }

    const getShop = (id) => {
        const apiURL = consts.URL_API + "/shop/" + id
        fetch(apiURL)
            .then((res) => res.json())
            .then((resJson) => {
                setshop(resJson)
                setavtShop(resJson.images[0].path)
                // setfullData(resJson)
            }).catch((err) => {
                console.log("ERROR: ", err);
            })
    }
    
    const getItemShop = (id) => {
        const apiURL = consts.URL_API + "/shop/" + id + "/item"
       
            axios({
                method: 'get',
                url: apiURL,
            }).then((response) => {
                // console.log(response.data.address)
                
                setproducts(response.data[0].items)
                
                // setimage(dataImg)
                // settotal(total + parseInt(response.data[0].price))
            });
    }

    const getCategoryShop = (id) => {
        const apiURL = consts.URL_API + "/shop/" + id + "/category"
        console.log(apiURL)
        axios({
            method: 'get',
            url: apiURL,
        }).then((response) => {
            // console.log(response.data[0].categories)
            
            setcategories(response.data[0].categories)
            // setimage(dataImg)
            // settotal(total + parseInt(response.data[0].price))
        });
    }

    const getProductsByCategory = (id) => {
        // setisLoading(true);
        var tmpArray = []
        const apiURL = consts.URL_API + `/category/${id}/item`
        fetch(apiURL)
            .then((res) => res.json())
            .then((resJson) => {
                // tmpArray.push(resJson)
                // console.log(resJson.items)
                setproducts(resJson.items)
                setfullData(resJson.items)
            }).catch((err) => {
                console.log("ERROR: ", err);
            })
    }

    const getChildCategory = (id) => {
        console.log(id)
        const apiURL = consts.URL_API + `/category/1`
        fetch(apiURL)
            .then((res) => res.json())
            .then((resJson) => {
                // tmpArray.push(resJson)
                console.log(resJson.categories)
                // setproducts(resJson.items)
                // setfullData(resJson.items)
            }).catch((err) => {
                console.log("ERROR: ", err);
            })
    }


    useEffect(() => {
        getShop(shopId)
        getItemShop(shopId)
        getCategoryShop(shopId)
    }, []);

    useEffect(() => {
        if (shop) {
            setisLoading(false)
        }
        if (categories) {
            console.log(categories)
        }
    }, []);

    const handleSearch = (text) => {
        if (text) {
            const newData = fullData.filter((item) => {
                const itemData = item.name ? item.name.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setproducts(newData);
            setQuery(text);
        } else {
            setproducts(fullData);
            setQuery(text)
        }
    };

    const handleSort = () => {
        if (!sortVisible) {
            setsortVisible(true)
        } else {
            setsortVisible(false)
        }

    }
    const sortByName = () => {
        const tmp = [...products].sort((a, b) => unicodeSort(a, b, "name"))
        setproducts(tmp)
    }
    const sortIncreaseByPrice = () => {
        const tmp = [...products].sort((a, b) => a.price > b.price ? 1 : -1)
        setproducts(tmp)
    }
    const sortDecreaseByPrice = () => {
        const tmp = [...products].sort((a, b) => a.price > b.price ? -1 : 1)
        setproducts(tmp)
    }
    const sortByDate = () => {
        const tmp = [...products].sort((a, b) => unicodeSort(a, b, "dateCreated"))
        setproducts(tmp)
        console.log(tmp)
    }

    const rederItem = ({ item }) => {
        return (
            <View flex={1}>

                <Pressable key={item.id}
                    bg={Colors.white}
                    borderRadius={20}
                    pt={0.3}
                    my={3}
                    pb={2}
                    overflow="hidden"
                    // alignItems="center"
                    mx={2}

                >
                    <Image w="full" h={24} source={{ uri: item.images[0].path }} alt={item.name} resizeMode="contain"></Image>
                    <Box px={4} pt={1}>
                        <Heading mt={1} numberOfLines={2} isTruncated size="sm" bold>
                            {item.name}
                        </Heading>
                        <Text mt={1}>{item.price / 1000}.000đ</Text>
                    </Box>

                </Pressable>

                <View>

                </View>

            </View>
        )
    }


    return (
        <View bg={Colors.gray} h="full">
            {/* SEARCH */}
            <View bg={Colors.gray}>
                <HStack
                    space={2}
                    w="full"
                    px={2}
                    bg={Colors.white}
                    py={1}
                    alignItems="center"
                    safeAreaTop
                >
                    <Pressable>
                        <Feather name="search" size={24} color="black" />
                    </Pressable>
                    <Input

                        value={query}
                        onChangeText={text => handleSearch(text)}
                        placeholder='Nhập tên sản phẩm ...'
                        w="85%"
                        bg={Colors.white}
                        type="search"
                        h={12}
                        borderWidth={0}

                    ></Input>
                    <Pressable onPress={() => navigation.goBack("Home")}>
                        <Entypo marginRight={5} name="home" size={24} color="black" />
                    </Pressable>
                </HStack>
            </View >

            {/* HEADER SHOP */}
            <View style={{ marginLeft: 15 }}>
                <View style={{ marginTop: 15, flexDirection: 'row' }}>
                    <Avatar.Image
                        source={{uri: avtShop}}
                        size={80}
                    >
                    </Avatar.Image>
                    <View style={{ marginLeft: 20 }}>
                        <View flexDirection="row" >
                            <Title style={[
                                { marginTop: 15, marginBottom: 2 }]}>
                                {shop.name}
                            </Title>
                         
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <FontAwesome name="check-circle" size={20} color="green" />
                            <Caption style={{ marginLeft: 2 }} >Online</Caption>
                        </View>

                    </View>
                </View>
            </View>

            {/* CATEGORIES */}
            <View height="17%" alignItems="center">
                    <Heading margin={1}>Danh mục sản phẩm</Heading>
                    <View alignItems="center" height="90%" w="90%" marginBottom={0} justifyContent="center">
                        <ScrollView
                            horizontal="true"
                            automaticallyAdjustContentInsets={false}
                            flex={1}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        >
                            <Flex
                                direction="row"
                                // flexWrap="wrap"
                                px={3}
                                justifyContent="space-between"
                            >
                                <View width="20%"
                                            height="20%"
                                            alignItems="center"
                                            key={0}
                                        >
                                    <Pressable key={0}
                                        width={20}
                                        height={20}
                                        bg={Colors.white}
                                        borderRadius={40}
                                        overflow="hidden"
                                        onPress={() => { getProducts() }}
                                    >
                                        <Image w="full" h={20} source={{ uri: "https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2020/09/i-2-90545873-this-new-clothes-sharing-platform-lets-you-borrow-clothes-from-someone-elseand8217s-closet.jpg" }} alt={"allCategory"} resizeMode="cover"></Image>
                                    </Pressable>
                                    <Heading textAlign="center" fontSize={15} mt={1} numberOfLines={2} isTruncated size="sm" bold>
                                        All
                                    </Heading>
                                </View>
                                {
                                    categories.map((category) => (
                                        <View width="20%"
                                            height="20%"
                                            alignItems="center"
                                            key={category.id}
                                        >
                                            <Pressable key={category.id}
                                                width={20}
                                                height={20}
                                                bg={Colors.white}
                                                borderRadius={40}
                                                overflow="hidden"
                                                onPress={() => { getChildCategory(category.id) }}
                                            >
                                                <Image w="full" h={20} source={{ uri: category.imagePath }} alt={category.name} resizeMode="cover"></Image>
                                            </Pressable>
                                            <Heading textAlign="center" fontSize={15} mt={1} numberOfLines={2} isTruncated size="sm" bold>
                                                {category.name}
                                            </Heading>
                                        </View>
                                    ))
                                }
                            </Flex>
                        </ScrollView>
                    </View>
                </View>

            

                {/* <View bg={Colors.gray}>

                    
                    <View margin={4} w="full" >
                        <Heading>Danh mục sản phẩm</Heading>
                    </View>
                </View >
                <View height={40} marginBottom={0}>

                    <View>
                        <Flex
                            direction="row"
                            flexWrap="wrap"
                            px={3}
                            justifyContent="space-between"
                        >
                            {
                                categories.map((category) => (
                                    <View width={20}
                                        height={20}
                                        alignItems="center"

                                    >
                                        <Pressable key={category.id}
                                            width={12}
                                            height={10}
                                            bg={Colors.white}
                                            borderRadius={40}
                                            overflow="hidden"
                                            onPress={() => navigation.navigate("")}
                                        >
                                            <Image w="full" h={10} source={require("../../../assets/Adidas_Logo.png")} alt={category.name} resizeMode="contain"></Image>
                                        </Pressable>
                                        <Heading textAlign="center" fontSize={8} mt={1} numberOfLines={2} isTruncated size="sm" bold>
                                            {category.name}
                                        </Heading>
                                    </View>
                                ))
                            }
                        </Flex>
                    </View>
                </View> */}
                <View w="95%" flexDirection="row" justifyContent="space-between" marginLeft={4} marginTop={0}>
                    <View flexDirection="row">
                        <Heading fontWeight="bold" marginBottom={1} >Sản phẩm </Heading>
                    </View>
                    <Pressable marginRight={6} onPress={() => handleSort()}>
                        <Text>Sắp xếp</Text>
                    </Pressable>
                </View>

                <View justifyItems="center" w="90%" marginLeft={4} px={2} >
                    {!sortVisible && (
                        <Animated.View px={3} flexDirection="row" justifyContent="space-between">
                            <Pressable onPress={() => { sortByName() }}><Text>Tên</Text></Pressable>
                            <Pressable flexDirection="row" onPress={() => { sortIncreaseByPrice() }}>
                                <Text mx={2}>Giá tăng</Text>
                                <AntDesign name="arrowup" size={18} color="black" />
                            </Pressable>

                            <Pressable flexDirection="row" onPress={() => { sortDecreaseByPrice() }}>
                                <Text mx={2}>Giá giảm</Text>
                                <AntDesign name="arrowdown" size={18} color="black" />
                            </Pressable>
                            <Pressable onPress={() => { sortByDate() }}><Text>Ngày</Text></Pressable>
                        </Animated.View>
                    )}
                </View>
                <FlatList
                    marginLeft={2}
                    w="95%"
                    data={products}
                    renderItem={rederItem}
                    keyExtractor={product => product.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                ></FlatList>
           
        </View>
    )
}

export default Shop

