import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useState } from "react";
import consts from "../consts/consts";
// import axios from "axios";

export const AuthContext = createContext();




export const AuthProvider = ({ children }) => {



    const [isLoading, setisLoading] = useState(false);
    const [userInfor, setuserInfor] = useState({});
    const [keys, setkeys] = useState({})



    const register = (Email, Password, ConfirmPassword) => {
        axios
            .post(`${consts.URL_API}/user/register`, {
                Email,
                Password,
                ConfirmPassword
            })
            .then(res => {
                let usinf = res.data;
                console.log(usinf);
            })
            .catch(e => {
                console.log(e);
            })
    }






    const login = async(Email, Password) => {

        setisLoading(true)
        try {
            await axios.post(`${consts.URL_API}/user/login`, {
                Email,
                Password,
            })
            .then(res => {
                console.log(res.data);
                setkeys(res.data);
                console.log("?")
                console.log(keys);
                //TODO
                    // call auth service
                AsyncStorage.setItem('keys', JSON.stringify(keys));
                setisLoading(false);
            })
            .catch(e => {
                console.log(e);
                setisLoading(false)
            })

            // console.log("test")
            // console.log(keys)
            // AsyncStorage.setItem('keys', JSON.stringify(keys));
            // console.log(AsyncStorage.getItem('keys'))
            // console.log("end")
        } catch (error) {
            
        }
         
        // keys.accessToken ? navigation.navigate("Home") : alert("?")

    }



    const logout = async() => {
        setisLoading(true)
        console.log(keys.accessToken)
        axios
        .post(`${consts.URL_API}/user/logout`, 
        {},
        {
            headers: {Authorization: `Bearer ${keys.accessToken}`}
        },
        )
        .then(res => {
            // console.log("test")
            console.log(res.data);
            AsyncStorage.removeItem('keys');
            setkeys({})
            setisLoading(false);
        })
        .catch(e => {
            console.log(e);
            setisLoading(false)
        })
    }

    const getuserInfor = async() => {
        setisLoading(true)
        // console.log(keys.accessToken)
        AsyncStorage.setItem('keys',JSON.stringify(keys));
        console.log("test")
        try {
            const value = await AsyncStorage.getItem('keys');
            if (value !== null) {
                // We have data!!
                console.log(JSON.parse(value));
            }
        } catch (error) {
            // Error retrieving data
        }
            console.log("end")
        axios
        .get(`${consts.URL_API}/user`, 
        {
            headers: {'Authorization': `Bearer ${keys.accessToken}`}
        },
        )
        .then(res => {
            // console.log("test")
            // console.log(res.data);
            setuserInfor(res.data);
            setuserInfor(res.data);
            AsyncStorage.setItem('userInfor', JSON.stringify(userInfor));
            // setkeys({})
            setisLoading(false);
        })
        .catch(e => {
            console.log(e);
            setisLoading(false)
        })
    console.log(userInfor)
    AsyncStorage.setItem('userInfor', JSON.stringify(userInfor));
     
    }


    return (
        <AuthContext.Provider value={{register, login, isLoading, keys, getuserInfor , userInfor, logout}}>{children}</AuthContext.Provider>
    )
};