import React, { useContext, useEffect, useState } from 'react'
import { Text, View, Box, Heading, VStack, Input, Button } from "native-base"
import { Svg, Image, Ellipse, ClipPath } from 'react-native-svg';
import { StyleSheet, Dimensions } from "react-native"
import Colors from "../../consts/consts";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { TextInput } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay, runOnJS } from 'react-native-reanimated';
import styles from '../../styles/screens/Login/style';
import { AuthContext } from '../../context/AuthContext';

import axios from 'axios';
import consts from '../../consts/consts';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const { height, width } = Dimensions.get("window")
    const imagePosition = useSharedValue(1)
    const [isSignUp, setIsSignUp] = useState(false)
    const [isForgotPassword, setIsForgotPassWord] = useState(false)
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    
    const {register}  = useContext(AuthContext);
    const {login} = useContext(AuthContext);
    const {keys} = useContext(AuthContext);
    const {isLoading} = useContext(AuthContext);
    const {logout} = useContext(AuthContext);
    const {getuserInfor} = useContext(AuthContext)
    const [check, setcheck] = useState(true)

    useEffect(() => {
        if (keys.accessToken && check)
        {
            // let userInf = JSON.parse( AsyncStorage.getItem('userInfor'));
            // console.log(userInf)
            navigation.navigate("Home");
            getuserInfor()
            // let userInf =  AsyncStorage.getItem('userInfor');
            // console.log(userInf)
            // console.log("ok")
            setcheck(false)
        }
      
        })
        



    const imageAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(imagePosition.value, [0, 1], [-height / 1.5, 0])
        return {
            transform: [{ translateY: withTiming(interpolation, { duration: 1000 }) }]
        }
    })


    const signInHandler = () => {
        imagePosition.value = 0
        if (isSignUp) {
            runOnJS(setIsSignUp)(false)
        }
        if (isForgotPassword) {
            runOnJS(setIsForgotPassWord)(false)
        }
        // navigation.navigate("Home")
    }

    const signUpHandler = () => {
        imagePosition.value = 0
        if (!isSignUp) {
            runOnJS(setIsSignUp)(true)
        }
        if (isForgotPassword) {
            runOnJS(setIsForgotPassWord)(false)
        }
    }

    const forgotPasswordHandler = () => {
        imagePosition.value = 0
        if (isSignUp) {
            runOnJS(setIsSignUp)(false)
        }
        if (!isForgotPassword) {
            runOnJS(setIsForgotPassWord)(true)
        }
    }

    const sendNewPasswordHandler = () => {
        alert("Mật khẩu mới đã được gửi về email của bạn!")
    }


    const buttonAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0])
        return {
            opacity: withTiming(imagePosition.value, { duration: 500 }),
            transform: [{ translateY: withTiming(interpolation, { duration: 1000 }) }]
        }
    })

    const buttonCloseAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360])
        return {
            opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
            transform: [{ rotate: withTiming(interpolation + "deg", { duration: 1000 }) }]
        }
    })

    const buttonForgotAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0])
        return {
            opacity: withTiming(imagePosition.value, { duration: 500 }),
            transform: [{ translateY: withTiming(interpolation, { duration: 1000 }) }]
        }
    })

    const formAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: imagePosition.value === 0 ? withDelay(400, withTiming(1, { duration: 800 })) : withTiming(0, { duration: 300 })
        }
    })

    const loginHandle = async(email, password) => {
        await login(email, password);

        // getuserInfor();
        
        // keys.acceessToken ? navigation.navigate("Home")  : alert("Sai tài khoản hoặc mật khẩu !")
    }



    return (
        <View style={styles.root}>
            <Spinner visible={isLoading}></Spinner>
            <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
                <Svg
                    height={height + 100}
                    width={width}
                >
                    <ClipPath id='clipPathId'>
                        <Ellipse cx={width / 2} rx={height + 100} ry={height + 100}></Ellipse>
                    </ClipPath>
                    <Image
                        href={require('../../../assets/icon.png')}
                        height={height + 100}
                        width={width + 100}
                        preserveAspectRatio='xMidyMid slice'
                        // px={1}
                        clipPath="url(#clipPathId)"
                    ></Image>
                </Svg>
                <Animated.View style={[styles.closeButtonContainer, buttonCloseAnimatedStyle]}>
                    <Text onPress={() => imagePosition.value = 1}>X</Text>
                </Animated.View>
            </Animated.View>

            <View style={styles.bottomContainer}>
                <Animated.View style={buttonAnimatedStyle}>
                    <Pressable style={styles.buttonSignIn} onPress={signInHandler}>
                        <Text style={styles.buttonText}>Đăng nhập</Text>
                    </Pressable>
                </Animated.View>
                <Animated.View style={buttonAnimatedStyle}>
                    <Pressable style={styles.buttonSignIn} onPress={signUpHandler}>
                        <Text style={styles.buttonText}>Đăng kí</Text>
                    </Pressable>
                </Animated.View>
                <Animated.View style={buttonAnimatedStyle} alignItems="center">
                    <Pressable onPress={forgotPasswordHandler}>
                        <Text color="#fff">Quên mật khẩu ?</Text>
                    </Pressable>
                </Animated.View>


                <Animated.View style={[styles.inputContainer, formAnimatedStyle]}>
                    {!isForgotPassword && (
                        <Animated.View>
                            <Pressable onPress={() => { getuserInfor() }}>
                                <Text>.</Text>
                            </Pressable>

                            <Text marginLeft={7} fontWeight="bold" marginBottom={1} fontSize={18}>Nhập email và mật khẩu</Text>
                            <TextInput
                                placeholder='Tài khoản'
                                style={styles.textInput}
                                value={email}
                                onChangeText={text => setemail(text)}
                            ></TextInput>

                            <TextInput
                                placeholder='Mật khẩu'
                                // type='password'
                                style={styles.textInput}
                                value={password}
                                onChangeText={text => setpassword(text)}
                                secureTextEntry
                            ></TextInput>
                            {isSignUp && (
                                <View>
                                    <TextInput
                                        placeholder='Xác nhận mật khẩu'
                                        type='password'
                                        style={styles.textInput}
                                        value={confirmPassword}
                                        onChangeText={text => setconfirmPassword(text)}
                                        secureTextEntry
                                    ></TextInput>
                                    <Button style={styles.button}  >
                                        <View>
                                            <Pressable onPress={() => { register(email, password, confirmPassword) }}>
                                                <Text style={styles.text} >Đăng kí</Text>
                                            </Pressable>
                                        </View>
                                    </Button>
                                </View>


                            )}

                            {!isSignUp && (
                                <Pressable style={styles.button} onPress={() => { loginHandle(email, password) }} >
                                    <View>
                                        <Pressable  >
                                            <Text style={styles.text}>Đăng nhập</Text>
                                        </Pressable>
                                    </View>
                                </Pressable>
                            )}
                        </Animated.View>
                    )}

                    {isForgotPassword && (
                        <Animated.View>
                            <Text marginLeft={7} fontWeight="bold" marginBottom={1} fontSize={18}>Nhập email để tiếp tục</Text>
                            <TextInput
                                placeholder='Email'
                                style={styles.textInput}
                            ></TextInput>

                            <Animated.View style={styles.buttonSignIn}>
                                <Pressable onPress={sendNewPasswordHandler}>
                                    <Text style={styles.text}>{"Gửi yêu cầu"}</Text>
                                </Pressable>
                            </Animated.View>
                        </Animated.View>
                    )}





                </Animated.View>
            </View>
        </View >

    )
}


// STYLE



export default LoginScreen