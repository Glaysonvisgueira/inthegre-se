import React, { useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/Inthegra.js'
import { getHeaders, getToken, email, senha, api_key } from '../services/Inthegra';


const largura = Math.round(Dimensions.get('window').width);
const altura = Math.round(Dimensions.get('window').height);

function Main({ navigation }){ 

    const [linhasDeOnibus, setLinhas] = useState([]);
    const [totalLinhas, setTotalLinhas] = useState(0);

    class Linha{ 
        constructor(CodigoLinha, Denomicao, Origem, Retorno, Circular){
            this.CodigoLinha = CodigoLinha;
            this.Denomicao = Denomicao;
            this.Origem = Origem;
            this.Retorno = Retorno;
            this.Circular = Circular;                
        }  
    } 

    async function localizarTodasLinhas(){
        var linhas = [];
        let config = getHeaders();
        let token = await getToken().then(res =>{
            config['headers']['X-Auth-Token'] = res.token;
        });
        const resultado = await api.get('/linhas', config).then(response =>{    
            for(var k in response.data){
                var linha = new Linha(
                    response.data[k]['CodigoLinha'],
                    response.data[k]['Denomicao'],
                    response.data[k]['Origem'],
                    response.data[k]['Retorno'],
                    response.data[k]['Circular'],                                                                                                    
                ) 
                linhas.push(linha)    
                }
                setLinhas(linhas);
            })
        }

    function navigateBack() {
      navigation.goBack()
    }

    useEffect(() => {  
            localizarTodasLinhas();
            setTotalLinhas(linhasDeOnibus.length);          
    }, [linhasDeOnibus]); 

    return(
        <>
         
            <View style={styles.container}>
             
            <LinearGradient colors={['#6acc82', '#34ad52','#26873e', '#048022']} style={styles.header} /> 
                   
                  {/* <View style={styles.containerMenu}>       */}
                    <FlatList 
                        data={linhasDeOnibus}                
                        style={{marginTop: -120}}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item: linha}) => (
                            <View style={styles.containerList}> 
                            <Text style={styles.textLinha}>Código da linha: <Text style={{fontWeight: 'bold'}}>{linha.CodigoLinha}</Text></Text>
                            <Text style={styles.textLinha}>Nome da linha: <Text style={{fontWeight: 'bold'}}>{linha.Denomicao}</Text></Text>
                            <Text style={styles.textLinha}>Origem: <Text style={{fontWeight: 'bold'}}>{linha.Origem}</Text></Text>
                            <Text style={styles.textLinha}>Retorno: <Text style={{fontWeight: 'bold'}}>{linha.Retorno}</Text></Text>                 
                   </View>
                 )} /> 
                              
                      {/* </View> */}
                            
             </View> 
                    <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
                      <MaterialIcons name="arrow-back" size={35} color="#048022" />
                    </TouchableOpacity>

                    <View style={styles.textCountContainer}>
                        <Text style={styles.textQtdLinhas}>{totalLinhas} Linhas encontradas</Text> 
                    </View>
           
              
    </>
    )}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',        
        backgroundColor: '#d9d9d9',
    },
    textCountContainer: {
        position: 'absolute',
        flexDirection: 'row-reverse',        
        alignItems: 'flex-start',
        right: 25,
        top: 55,
    },
    textQtdLinhas: {
        color: '#048022',
        // position: 'absolute',
        fontSize:15,        
        fontWeight: 'bold',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 5,
        paddingHorizontal: 10,
         
    },
    logo:{
        width: largura,
        height: 100,
        marginTop: 50,
        position: 'absolute',
        justifyContent: 'flex-start',

    },
    containerList: {
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 10,
        marginHorizontal: 20,
        shadowColor: "#000000",
        shadowOffset: {
            width: 3,
            height: 3
            },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,       
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
        marginTop: '25%',
        width: '90%',
        position: 'absolute',       
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingHorizontal: 20,
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
    textLinha: {
        color: '#525252',
        fontSize: 12,
        justifyContent: 'center',
    },    
    smallText: {
        fontSize:12,       
        color: '#03290c',        
    },     
    linearGradient: {
        flex: 1,        
    },  
});


export default Main;