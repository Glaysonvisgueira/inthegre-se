import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

function StransSite({ navigation }) {
    return <WebView style={{flex: 1}} source={{uri: 'https://inthegra.strans.teresina.pi.gov.br/' }}/>
    
}

export default StransSite;