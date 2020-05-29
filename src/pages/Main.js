import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import { Dimensions } from 'react-native';

const largura = Math.round(Dimensions.get('window').width);
const altura = Math.round(Dimensions.get('window').height);

import logo from '../../assets/logo.png';

function Main({ navigation }){

    return(
        <>
         
            <View style={styles.container}>
             
            <LinearGradient 
                colors={['#04d361', '#05b353','#039143']} 
                style={styles.header}
            >  
            </LinearGradient>    
               <View style={styles.containerMenu}>
                            <View style={styles.botoesCima}>
                                <TouchableOpacity onPress={() => {
                                        navigation.navigate('MapaTodosVeiculos')
                                        }} style={styles.botao}>
                                    <MaterialIcons name="location-on" size={50} color="#26873e" />
                                    <Text style={styles.textoBotao}>RASTREADOR</Text>
                                    <Text style={styles.smallText}>Localização em tempo real</Text>
                                </TouchableOpacity> 
                                    
                            
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate('Linhas')
                                        }} style={styles.botao}>
                                        <MaterialIcons name="timeline" size={50} color="#26873e" />
                                        <Text style={styles.textoBotao}>LINHAS</Text>
                                        <Text style={styles.smallText}>Linhas de ônibus</Text>
                                </TouchableOpacity>
                             </View> 
                             <View style={styles.botoesCima}>
                                <TouchableOpacity style={styles.botao}>
                                    <MaterialIcons name="stop" size={50} color="#26873e" />
                                    <Text style={styles.textoBotao}>PARADAS</Text>
                                    <Text style={styles.smallText}>Paradas de ônibus</Text>
                                </TouchableOpacity> 
                                    {/* <View style = {styles.hr}></View>           */}
                            
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate('Sobre')
                                        }} style={styles.botao}>
                                        <MaterialIcons name="info" size={50} color="#26873e" />
                                        <Text style={styles.textoBotao}>SOBRE</Text>
                                        <Text style={styles.smallText}>Sobre o aplicativo</Text>
                                       
                                </TouchableOpacity>
                             </View>   
                      </View>
                    </View>      
            <Image 
                        source={logo} 
                        style={styles.logo}
                        />
              
    </>
)}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',        
        backgroundColor: '#ededed', 
                     
    },
    logo:{
        width: largura,
        height: 100,
        marginTop: 50,
        position: 'absolute',
        justifyContent: 'flex-start',

    },   
    header: {
        width: '100%',
        height: '30%',
        borderBottomLeftRadius: 300, 
        borderBottomRightRadius: 300,       
        transform: [
          {scaleX: 2}
        ]
    },
    containerMenu: {        
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
        marginTop: 25,
                    
    },
    botao:{
        height: altura/4.5,
        width: largura/2.4,
        margin: 10,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: '#ffffff', 
        borderRadius: 5,
        // borderWidth: 2,
        // borderColor: '#26873e',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        
    },
    textoBotao: {
        color: '#3b3b3b',
        fontFamily: 'MavenProBold',
        fontSize: 20,
        marginTop: 10,
        marginBottom: 5, 
        textAlign: 'center',
        justifyContent: 'center',
    },
    botoesCima: {
        flexDirection: 'row',       
        
    },
    smallText: {
        fontSize:12,       
        color: '#595959',
        fontFamily: 'MavenProSemiBold',       
    },     
    hr: {
        borderBottomColor: "#031521", 
        borderBottomWidth: 1,
        width: "100%"
  },
    linearGradient: {
        flex: 1,
        
    },
    
});

export default Main;