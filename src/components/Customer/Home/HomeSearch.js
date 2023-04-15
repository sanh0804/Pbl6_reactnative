
import React from 'react'
import Colors from "../../../consts/consts";
import { Text, View, HStack, Input, Box, Image, Heading, VStack } from "native-base"
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { Feather } from '@expo/vector-icons';



function HomeSearch() {
    return (
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
                    placeholder='Searching for something ...'
                    w="85%"
                    bg={Colors.white}
                    type="search"
                    h={12}
                    borderWidth={0}
                ></Input>
            </HStack>

        </View >
    )
}

export default HomeSearch