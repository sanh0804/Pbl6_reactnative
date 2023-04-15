
import React from 'react'
import WebView from 'react-native-webview'



function VnPayScreen({route, navigation}) {
    const link = route.params
    return (
         <WebView
        originWhitelist={['*']}
        source={{ uri: link }}
      />

    )
}

export default VnPayScreen