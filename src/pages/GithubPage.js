import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

function GithubPage({ navigation }) {
    return <WebView style={{flex: 1}} source={{uri: 'https://github.com/Glaysonvisgueira/inthegre-se' }}/>
    
}

export default GithubPage;