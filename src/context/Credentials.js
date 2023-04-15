import AsyncStorage from '@react-native-community/async-storage'
import consts from '../consts/consts'
import { userIn } from './AuthContext'

var jwt_decode = require('jwt-decode')




async function getAccessUsingRefresh (refreshToken) {
    const URL = consts.URL_API + "/user/refresh-token"
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(refreshToken)
  }).then(res => res.json())
}

async function getVerifiedKeys (keys) {
  console.log('Loading keys from storage')

  if (keys) {
    console.log('checking access')

    if (!isTokenExpired(keys.accessToken)) {
      console.log('returning access')

      return keys
    } else {
      console.log('access expired')

      console.log('checking refresh expiry')

      if (!isTokenExpired(keys.refreshToken)) {
        console.log('fetching access using refresh')

        const response = await getAccessUsingRefresh(keys.refreshToken)

        await AsyncStorage.setItem('keys', JSON.stringify(response))

        console.log('UPDATED ONE')

        return response
      } else {
        console.log('refresh expired, please login')

        return null
      }
    }
  } else {
    console.log('access not available please login')

    return null
  }
}

function isTokenExpired (token) {
  var decoded = jwt_decode(token)

  if (decoded.exp < Date.now() / 1000) {
    return true
  } else {
    return false
  }
}

const setCredentials = async keys => {
  try {
    await AsyncStorage.setItem('keys', JSON.stringify(keys))
  } catch (e) {
    console.log(e)
  }
}

const getCredentials = async () => {
  try {
    let credentials = await AsyncStorage.getItem('keys')

    let cred = await getVerifiedKeys(JSON.parse(credentials))

    if (credentials != null && cred != null) {
      return cred
    } else {
      return null
    }
  } catch (e) {
    console.log(e)
  }
  return null
}