import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image,  } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


import teresina from '../../assets/teresina.png';
import logo from '../../assets/logo.png';

function Main({ navigation }){ 
    return(
        <>
         
        <View style={styles.containerImage}> 
            <Image 
                source={teresina} 
                style={styles.ponte}
                //blurType="dark"
                //blurAmount={1}
                blurRadius={1}
            />
        </View>
        <View style={{position: 'absolute', marginLeft: 30,marginTop: 29,}}>
            <Text>Versão: 0.6.2</Text>
            </View>
        <View style={styles.containerMenu}>
                <Image 
                    source={logo} 
                    style={styles.logo}                    
                />
                <View style={{margin: 65}}></View> 
            <TouchableOpacity onPress={() => {
                navigation.navigate('MapaTodosVeiculos')
                }} style={styles.botao}>
                <MaterialIcons name="location-on" size={50} color="#28405e" />
                <Text style={styles.textoBotao}>RASTREADOR</Text>
                <View>
                    <FontAwesome name="angle-right" size={50} color="#28405e" />
                </View>
              </TouchableOpacity>
             
            <View
                style={{
                    borderBottomColor: '#28405e',
                    borderBottomWidth: 1,
                    marginHorizontal: 20,                   
                }}
                />
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Linhas')
                    }} style={styles.botao}>
                    <MaterialIcons name="timeline" size={50} color="#28405e" />
                    <Text style={styles.textoBotao}>LINHAS</Text>
                    <View>
                        <FontAwesome name="angle-right" size={50} color="#28405e" />
                    </View>
              </TouchableOpacity>
                
            <View
                style={{
                    borderBottomColor: '#28405e',
                    borderBottomWidth: 1,
                    marginHorizontal: 20,                    
                }}
            />
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Paradas')
                    }} style={styles.botao}>
                <FontAwesome name="stop-circle-o" size={50} color="#28405e" />
                <Text style={styles.textoBotao}>PARADAS</Text>
                <View>
                    <FontAwesome name="angle-right" size={50} color="#28405e" />
                </View>
              </TouchableOpacity>
             
            <View
                style={{
                    borderBottomColor: '#28405e',
                    borderBottomWidth: 1,
                    marginHorizontal: 20,                   
                }}
                />
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Sobre')
                    }} style={styles.botao}>
                <MaterialIcons name="info-outline" size={50} color="#28405e" />
                <Text style={styles.textoBotao}>SOBRE</Text>                             
                
                    <FontAwesome name="angle-right" size={50} color="#28405e" />                 
                    
              </TouchableOpacity>
                               
        </View>
              
    </>
)}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',            
    },
    containerImage: {
        flex: 1,           
        flexDirection: 'column',
        justifyContent: 'flex-end',                   
    },
    ponte: {        
        width: '100%',
        height: "30%",        
        borderTopLeftRadius: 200,
        borderTopRightRadius: 200,                
    },    
    containerMenu: {              
        backgroundColor: 'rgba(219, 219, 219, 0.5)',
        position: 'absolute',
        width: '100%',
        height: '100%',              
    },
    botao:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 50,
        marginTop: 20,
        marginBottom: 20,
        height: 40,                 
        borderRadius: 5,        
        alignItems: "center",        
        // shadowColor: "#000000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
    },
    textoBotao: {
        color: '#28405e',
        fontSize: 20,  
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
    },
    smallText: {
        fontSize:12,       
        color: '#657b9e',        
    },
    logo: {
        marginTop: 30,        
        height: 100,
        width: '100%',
        position: 'absolute',
        alignItems: "center", 
        justifyContent: 'center',
    },    
});

export default Main;