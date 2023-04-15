import React, { useState, useEffect } from 'react'
import { Text, View, Box, Image, Heading, ScrollView, Flex, Pressable, FlatList } from "native-base"
import { FontAwesome5 } from '@expo/vector-icons';
import consts from '../../../consts/consts';
import { HStack, Input } from 'native-base';
import categoriesServices from "../../../../services/CategoryServices"
import { Feather } from '@expo/vector-icons';
import unicodeSort from '@ivanhanak_com/js-sort-unicode';
import Animated from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';

import Tabs from '../../../../navigation/tabs';
import Spinner from 'react-native-loading-spinner-overlay';


function HomeProduct({ navigation }) {
    const Colors = consts.Colors;
    // let products = ProductServices.getAll();
    const [products, setproducts] = useState([]);
    const [fullData, setfullData] = useState([]);
    const categories = categoriesServices.getAll() || [];
    const [query, setQuery] = useState('');
    const [sortVisible, setsortVisible] = useState(true);
    const [categoryName, setcategoryName] = useState("")
    const [isLoading, setisLoading] = useState(false)

    // let fullData = ProductServices.getAll();
    


    const getProducts = () => {


        const apiURL = consts.URL_API + "/item"
        fetch(apiURL)
            .then((res) => res.json())
            .then((resJson) => {
                setproducts(resJson)
                setfullData(resJson)
            }).catch((err) => {
                console.log("ERROR: ", err);
            })
    }

    const getProductsByCategory = (id) => {
        // setisLoading(true);
        var tmpArray = []
        const apiURL = consts.URL_API + `/category/${id}/item`
        fetch(apiURL)
            .then((res) => res.json())
            .then((resJson) => {
                // tmpArray.push(resJson)
                console.log(resJson.items)
                setproducts(resJson.items)
                setfullData(resJson.items)
            }).catch((err) => {
                console.log("ERROR: ", err);
            })
    }

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        // console.log(products)
        if (products != null) {
            setisLoading(false)
            // setimage(product.image[0].path)
            modifyProductPrice(products)
        }
        console.log(isLoading)

    }, [products])

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
            <View flex={1} key={item.id}>
               
                <Pressable key={item.id}
                    bg={Colors.white}
                    borderRadius={20}
                    pt={0.3}
                    my={3}
                    pb={2}
                    overflow="hidden"
                    // alignItems="center"
                    mx={2}
                    h={180}
                    onPress={() => { navigation.navigate("ProductInfor", item) }}
                >
                    <Image w="full" h={24} source={{ uri: item.images[0].path }} alt={item.name} resizeMode="contain"></Image>
                    <Box px={4} pt={1}>
                        <Heading mt={1} numberOfLines={2} isTruncated size="sm" bold>
                            {item.name}
                        </Heading>
                        
                        <Text mt={1}>{item.Price}đ</Text>
                    </Box>

                </Pressable>

            </View>
        )
    }


    return (
        <View bg={Colors.gray} flex={1} flexDirection="column">
            
            {/* SREARCH */}
            <View flex={0.13} bg={Colors.gray}>
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
                </HStack>

            </View >

            <View flex={1}>
                {/* Heading */}
                <View bg={Colors.gray}>
                    <View marginY={2} w="full" alignItems="center">
                        <Heading>Danh mục sản phẩm</Heading>
                    </View>
                </View >
                {/* List category */}
                <View height="17%" alignItems="center">
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
                                                onPress={() => { getProductsByCategory(category.id) }}
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

                {/*Heading of list product  */}
                <View w="95%" flexDirection="row" justifyContent="space-between" marginLeft={4} marginTop={0}>
                    <View flexDirection="row">
                        <Text fontWeight="bold" marginBottom={1} >Có thể bạn sẽ thích </Text>
                        <FontAwesome5 name="arrow-right" size={16} color="black" />
                    </View>
                    <Pressable marginRight={6} onPress={() => handleSort()}>
                        <Text>Sắp xếp</Text>
                    </Pressable>
                </View>

                {/* SORT */}
                <View justifyItems="center" w="90%" marginLeft={4} px={2} paddingBottom={2} >
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



                <View flex={1}>
                <Spinner visible={isLoading}></Spinner>
                    {/* LIST PRODUCT */}
                    {isLoading && (
                        <></>
                    )}
                    {!isLoading && (
                        <View flex={1} marginTop={0}>
                            <FlatList
                                marginLeft={2}
                                w="95%"
                                data={products}
                                renderItem={rederItem}
                                keyExtractor={product => product.id}
                                numColumns={2}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}

                            >

                            </FlatList>
                        </View>
                    )}

                </View>

            </View>



        </View>
    )
}

export default HomeProduct

