import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Linking, Image } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import * as SMS from 'expo-sms';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';


const largura = Math.round(Dimensions.get('window').width);
const altura = Math.round(Dimensions.get('window').height);

import onibusImg from '../../assets/onibusImagem.png';

function Main({ navigation }){ 

    //Mensagem a ser enviada nos módulos de SMS, Whatsapp e E-mail
    const mensagem = 'Olá, tudo bem? Venho através do App Inthegre-se!';

    //Função para enviar e-mail pelo app de correio eletrônico principal
    function sendMail() {
        MailComposer.composeAsync({
          subject: 'Venho através do App Inthegre-se!',
          recipients: ['glaysonwow@gmail.com'],
          body: mensagem,
        })
    }

    //Função para enviar mensagem pré-definida via Whatsapp
    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=55086999277101&text=${mensagem}`);
    }

    //Função para enviar mensagem pré-definida via SMS
    async function sendSMS() {        
        //Linking.openURL(`sms:55086999277101?body=${mensagem}`);
        const isAvailable = await SMS.isAvailableAsync();
        if (isAvailable) {
          const { result } = await SMS.sendSMSAsync(
            ['55086999277101'],
            mensagem
          );
        } else {
          // Criar alerta para informar se o serviço de SMS não funcionar.
        }
    }

    function navigateBack() {
      navigation.goBack()
    }

    return(
        <>
         
            <View style={styles.container}>
            
            <LinearGradient colors={['#04d361', '#05b353','#039143']} style={styles.header} /> 
                    <Image 
                          source={onibusImg} 
                          style={styles.img}
                      /> 
                  <View style={styles.containerMenu}>      
                    <TouchableOpacity onPress={sendWhatsapp} style={styles.botao}>
                                <FontAwesome name="whatsapp" size={50} color="#636363" /> 
                                <Text style={styles.textoBotao}>WHATSAPP</Text>
                                <FontAwesome name="angle-right" size={50} color="#636363" />
                     </TouchableOpacity>
                                   <View
                                      style={{
                                        borderBottomColor: '#636363',
                                        borderBottomWidth: 0.7,
                                        width: '85%',
                                      }}
                                    />
                            
                                    <TouchableOpacity onPress={sendMail} style={styles.botao}>
                                      <MaterialIcons name="email" size={50} color="#636363" /> 
                                      <Text style={styles.textoBotao}>E-MAIL</Text>
                                     <FontAwesome name="angle-right" size={50} color="#636363" />
                                    </TouchableOpacity>
                             <View
                                      style={{
                                        borderBottomColor: '#636363',
                                        borderBottomWidth: 0.7,
                                        width: '85%',
                                      }}
                                    />
                            
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('StransSite')
                                    }}  style={styles.botao}>
                                  <FontAwesome name="external-link" size={50} color="#636363" /> 
                                  <Text style={styles.textoBotao}>API INTHEGRA</Text>
                                  <FontAwesome name="angle-right" size={50} color="#636363" />
                                </TouchableOpacity>
                                    <View
                                      style={{
                                        borderBottomColor: '#636363',
                                        borderBottomWidth: 0.7,
                                        width: '85%',
                                      }}
                                    />
                            
                                <TouchableOpacity onPress={() => {
                                  navigation.navigate('GithubPage')
                                }}  style={styles.botao}>
                                    <FontAwesome name="github" size={50} color="#636363" /> 
                                    <Text style={styles.textoBotao}>GITHUB</Text>
                                   <FontAwesome name="angle-right" size={50} color="#636363" />
                                </TouchableOpacity>
                                <View
                                      style={{
                                        borderBottomColor: '#636363',
                                        borderBottomWidth: 0.7,
                                        width: '85%',
                                      }}
                                    />
                                <TouchableOpacity onPress={sendSMS} style={styles.botao}>
                                  <MaterialIcons name="textsms" size={50} color="#636363" /> 
                                  <Text style={styles.textoBotao}>SMS</Text>  
                                  <FontAwesome name="angle-right" size={50} color="#636363" />                               
                                </TouchableOpacity> 
                              
                      </View>
                            
                    </View> 
                    <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
                      <MaterialIcons name="arrow-back" size={35} color="#03290c" />
                    </TouchableOpacity>
                      
                  
              
    </>
    )}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',        
        backgroundColor: '#fff', 
                     
    },
    img:{
        width: 300,
        height: 300,
        position: 'absolute', 
        marginTop: 60,
        borderRadius: 150,
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
        width: '100%',
        marginTop: 25,    
        backgroundColor: '#fff',
        borderTopLeftRadius: 40,  
        borderTopRightRadius: 40,
             
        
    },
    botao:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        
        height: altura/10,
        width: '75%',        
        alignItems: "center",        
        backgroundColor: '#fff', 
    },
    backButton:{
      position: 'absolute',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',  
      marginTop: 45,
      marginLeft: 15,
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 3,
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
        color: '#03290c',
        fontSize: 20,          
        fontFamily: 'MavenProRegular',
        textAlign: 'center',
        justifyContent: 'center',
    },
    botoesCima: {
        flexDirection: 'row',       
        
    },
    smallText: {
        fontSize:12,       
        color: '#3b3b3b',        
    },     
    linearGradient: {
        flex: 1,
        
    },  
});


export default Main;