import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';



import Routes from './src/routes';

//Carregar os arquivos de fontes
const getFonts = () => Font.loadAsync({
    MavenProRegular: require('./assets/fonts/MavenPro-Regular.ttf'),
    MavenProSemiBold: require('./assets/fonts/MavenPro-SemiBold.ttf'),
    MavenProBold: require('./assets/fonts/MavenPro-Bold.ttf'),   
  })

export default function App() {
  
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if(fontsLoaded){
    return (
      <>    
        <StatusBar barStyle="dark-content" translucent={true} backgroundColor="transparent" /> 
        <Routes />
      </>
    );
  }else{
    return(
      <AppLoading 
      startAsync={getFonts}
      onFinish={ () => setFontsLoaded(true)}
    />
    );
  }

  
}
