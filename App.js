import React from 'react';
import { StatusBar, YellowBox } from 'react-native';


import Routes from './src/routes';

YellowBox.ignoreWarnings([
    'Unrecognized WebSocket'
]);

export default function App() {
  return (
    <>    
    <StatusBar barStyle="dark-content" backgroundColor="rgba(219, 219, 219, 0.6)"/> 
    <Routes />
    </>
  );
}
