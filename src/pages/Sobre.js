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
          <View style={styles.containerImage}> 
              <Image 
                  source={terminalOnibus} 
                  style={styles.imagem}
              />
          </View>
          <View style={styles.containerMenu}> 
          <TouchableOpacity  onPress={navigateBack} style={styles.backButton}>
                    <FontAwesome name="arrow-circle-left" size={35} color="#28405e" /> 
                    
                </TouchableOpacity>
              <View style={styles.container}>
              <View style={styles.containerBotoes}>
                  <TouchableOpacity style={styles.botao}>
                    <FontAwesome name="whatsapp" size={70} color="#28405e" /> 
                    <Text style={styles.textoBotao}>WHATSAPP</Text>
                    <Text style={styles.smallText}>Entre em contato</Text> 
                </TouchableOpacity>
                <TouchableOpacity style={styles.botao}>
                    <MaterialIcons name="email" size={70} color="#28405e" /> 
                    <Text style={styles.textoBotao}>E-MAIL</Text>
                    <Text style={styles.smallText}>Entre em contato</Text> 
                </TouchableOpacity>
                <TouchableOpacity style={styles.botao}>
                    <FontAwesome name="external-link" size={70} color="#28405e" /> 
                    <Text style={styles.textoBotao}>API INTHEGRA</Text>
                    <Text style={styles.smallText}>Site da API Inthegra</Text> 
                </TouchableOpacity>
                <TouchableOpacity  style={styles.botao}>
                    <FontAwesome name="github" size={70} color="#28405e" /> 
                    <Text style={styles.textoBotao}>GITHUB</Text>
                    <Text style={styles.smallText}>Repositório do código fonte</Text> 
                </TouchableOpacity>
                </View>
              </View>
          </View>
          
          
        </>
    )}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'flex-end',
    },
    containerBotoes: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerImage: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 50,           
    },
    imagem: {        
        width: 250,
        height: 250,        
        borderRadius: 200,
        borderColor: '#000'                       
    },    
    containerMenu: {              
        backgroundColor: 'rgba(219, 219, 219, 0.5)',
        position: 'absolute',
        width: '100%',
        height: '100%', 
                    
    },
    botao:{
        flexDirection: 'column',
        justifyContent: 'center',        
        margin: 5,
        
        height: '40%',
        width: '45%',                
        borderRadius: 5,        
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
        color: '#28405e',
        fontSize: 20, 
        marginTop: 5, 
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
    },
    smallText: {
      fontSize: 12,
      color: '#28405e',
    },
    backButton: {
      backgroundColor: '#FFF',
      height: 60,
      width: 60,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 15,
      marginLeft: 15,
      borderRadius: 30,
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
    
    
});


export default Main;