import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';

import terminalOnibus from '../../assets/terminal.png';

function Main({ navigation }){ 

    const mensagem = 'Olá, tudo bem? Venho através do App Inthegre-se!';

    function sendMail() {
        MailComposer.composeAsync({
          subject: 'Venho através do App Inthegre-se!',
          recipients: ['glaysonwow@gmail.com'],
          body: mensagem,
        })
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=55086999277101&text=${mensagem}`);
    }

    function navigateBack() {
      navigation.goBack()
    }

    return(
        <>          
          <View style={styles.containerMenu}> 
          <TouchableOpacity  onPress={navigateBack} style={styles.backButton}>
                    <FontAwesome name="arrow-circle-left" size={35} color="#fff" />                     
                </TouchableOpacity>
              <View style={styles.container}>
              <View style={styles.containerBotoes}>
                  <TouchableOpacity onPress={sendWhatsapp} style={styles.botao}>
                    <FontAwesome name="whatsapp" size={70} color="#28405e" /> 
                    <Text style={styles.textoBotao}>WHATSAPP</Text>
                    <FontAwesome name="angle-right" size={50} color="#28405e" />
                    
                </TouchableOpacity>
                <TouchableOpacity onPress={sendMail} style={styles.botao}>
                    <MaterialIcons name="email" size={70} color="#28405e" /> 
                    <Text style={styles.textoBotao}>E-MAIL</Text>
                    <FontAwesome name="angle-right" size={50} color="#28405e" />
                  
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('StransSite')
                    }} style={styles.botao}>
                    <FontAwesome name="external-link" size={70} color="#28405e" /> 
                    <Text style={styles.textoBotao}>API INTHEGRA</Text>
                    <FontAwesome name="angle-right" size={50} color="#28405e" />
                    
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('GithubPage')
                    }} style={styles.botao}>
                    <FontAwesome name="github" size={70} color="#28405e" /> 
                    <Text style={styles.textoBotao}>GITHUB</Text>
                    <FontAwesome name="angle-right" size={50} color="#28405e" />
                    
                </TouchableOpacity>
                
                </View>
              </View>
          </View>
          
          
        </>
    )}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
    },
    containerBotoes: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
        
    containerMenu: {              
        backgroundColor: 'rgba(219, 219, 219, 0.5)',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    botao:{
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 60,
        justifyContent: 'space-between',        
        marginHorizontal: 10,        
        height: '18%',
        width: '90%',
        marginBottom: 10,  
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,              
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,      
        alignItems: "center",
        backgroundColor: '#FFF',        
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textoBotao: {
        flexWrap: "wrap",
        color: '#28405e',
        fontSize: 20, 
        
        fontWeight: 'bold',
        
    },
    smallText: {
      fontSize: 12,
      color: '#28405e',
    },
    backButton: {
      backgroundColor: '#28405e',
      height: 60,
      width: 60,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 45,
      marginLeft: 15,
      borderRadius: 30,
      alignItems: "center",        
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    
    
});


export default Main;