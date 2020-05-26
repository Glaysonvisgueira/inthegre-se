import React, { useState, useEffect} from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Alert, Modal } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import api from '../services/Inthegra.js'
import { getHeaders, getToken, email, senha, api_key } from '../services/Inthegra';

import busIcon from '../../assets/vector-bus-icon.jpg'

function Main({ navigation }){

    const [currentRegion, setCurrentRegion] = useState(null);
    const [localizacoesAtuais, setLocalizacoes] = useState([]);
    const [quantidadeOnibus, setQuantidadeOnibus] = useState(null);  
    const [modalVisible, setModalVisible] = useState(false);

    function navigateBack() {
        navigation.goBack()
      }

    class Veiculo{ 
        constructor(CodigoVeiculo, Lat, Long, Hora, Linha){
            this.CodigoVeiculo = CodigoVeiculo;
            this.Lat = Lat;
            this.Long = Long;
            this.Hora = Hora;
            this.Linha = Linha;    
        }  
    }

    class Linha{ 
        constructor(CodigoLinha, Denomicao, Origem, Retorno, Circular){
            this.CodigoLinha = CodigoLinha;
            this.Denomicao = Denomicao;
            this.Origem = Origem;
            this.Retorno = Retorno;
            this.Circular = Circular;                
        }  
    } 
    
    useEffect(() => {
            async function localizarOnibus(){

                        var frota = [];
                        let config = getHeaders();
                        let token = await getToken().then(res =>{
                            config['headers']['X-Auth-Token'] = res.token;
                        });
                        const apiResponse = await api.get('/veiculos', config).then(response => {                            
                             for(var k in response.data){
                                var linha = new Linha(
                                    response.data[k]['Linha']['CodigoLinha'],
                                    response.data[k]['Linha']['Denomicao'],
                                    response.data[k]['Linha']['Origem'],
                                    response.data[k]['Linha']['Retorno'],
                                    response.data[k]['Linha']['Circular'],                                                                                                    
                                )
                                for(var i in response.data[k]['Linha']['Veiculos']){
                                    const veiculo = new Veiculo(
                                        response.data[k]['Linha']['Veiculos'][i]['CodigoVeiculo'],
                                        response.data[k]['Linha']['Veiculos'][i]['Lat'],
                                        response.data[k]['Linha']['Veiculos'][i]['Long'],
                                        response.data[k]['Linha']['Veiculos'][i]['Hora'],
                                        linha                                                                   
                                    )
                                    frota.push(veiculo);                                                                          
                                } 
                            }
                            
                            setLocalizacoes(frota); 
                            //console.log(localizacoesAtuais)                                                               
                        })      
                    }
                async function getQuantidadeOnibus(){
                    var totalOnibus =  await localizacoesAtuais.length;
                    setQuantidadeOnibus(totalOnibus);            
                }
                    localizarOnibus();
                    getQuantidadeOnibus();                
            }, [localizacoesAtuais]);
     
    //Carregar posição inicial do Mapview na posição atual do GPS do usuário.         
    useEffect(() => {
        async function loadInitialPosition(){
            const { granted } = await requestPermissionsAsync();  //Requisitar permisão para acessar posição.
            if (granted){
                const {coords} = await getCurrentPositionAsync({
                    enableHighAccurary: true,                     //Habilitar alta precisão do GPS.
                });
                const {latitude, longitude} = coords;                                 
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.07,
                    longitudeDelta: 0.07,
                })
            }
        }
        loadInitialPosition();
    }, []);

    if (!currentRegion){
        return null;
    }

    return(  
        <>
        <MapView 
            mapType={'standard'} 
            initialRegion={currentRegion} 
            style={styles.map} 
            showsUserLocation={true}
            userLocationPriority="high"
            showsMyLocationButton={false}
        >
        
        {localizacoesAtuais.map((veiculo, index) => (
          <Marker
            key={index}              
            coordinate={{ 
              longitude: parseFloat(veiculo.Long),
              latitude: parseFloat(veiculo.Lat), 
            }} 
          >
            <Image 
              style={styles.onibus} 
              source={busIcon}
            />
            <Callout>
                <View style={styles.callout}>
                    <Text style={styles.info}>Código do ônibus: <Text style={styles.infoRetorno}>{veiculo.CodigoVeiculo}</Text></Text>                
                    <Text style={styles.info}>Nome da linha: <Text style={styles.infoRetorno}>{veiculo.Linha.Denomicao}</Text> </Text>                    
                    <Text style={styles.info}>Hora de coleta da localização: <Text style={styles.infoRetorno}>{veiculo.Hora}</Text></Text>                     
                </View>
            </Callout>
        </Marker>
        ))}                    
        </MapView>         

            <View style={styles.containerText}>                
                <Text style={styles.text}>Quantidade de ônibus em rota: {quantidadeOnibus}</Text>               
            </View>
             <View style={styles.centeredView}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Janela fechada.");
                    }}
                     >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>As informações exibidas por este aplicativo são fornecidas através da API de monitoramento de
                         frota da Superintendência Municipal de Transportes e Trânsito (STRANS) de Teresina - PI. A atualização do posicionamentdo dos veículos acontece a cada trinta segundos.</Text>
                        <TouchableOpacity
                        style={styles.openButton}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                        >
                        <Text style={styles.textStyle}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </Modal>
    </View>

    <View style={styles.containerButtons}>
           
                <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
                      <MaterialIcons name="arrow-back" size={35} color="#048022" />
                    </TouchableOpacity>
                
                    <TouchableOpacity onPress={() => {
                        setModalVisible(true);
                        }} style={styles.infoService}>
                        <MaterialIcons name="info" size={35} color="#048022" />
                    </TouchableOpacity>  
                    
            </View>
              
      
      </>
    ) 
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    onibus: {
        width: 26,
        height: 26,
        borderRadius: 25,
        borderColor: '#048022',
        borderWidth: 2,        
    },
    callout: {
        width: 350,
        height: 75,
        padding: 4,       
    },    
    info: {
        fontSize: 13,
        color: '#048022',    
    },
    infoTitulo: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#000000',
        justifyContent: 'center',
        alignItems: 'center',       
    }, 
    containerButtons :{
        flexDirection :'column',
        position: 'absolute',
        top: 45, 
        left: 15, 
    },
    containerText: {
        flex: 1,   
        position: 'absolute',
        flexDirection: 'row',
        alignItems: "center",
        bottom: 40,
        left: 25, 
        right: 25, 
                           
    },
    text:{                
        fontWeight: 'bold',
        fontSize: 17,
        color: '#fff', 
        backgroundColor: '#048022',
        borderRadius: 5,
        padding: 5,        
        width: '100%',
        textAlign: 'center',      
    },
    infoRetorno:{
        fontWeight: 'bold',
        color: '#048022',
    },    
    centeredView: {
        position: 'absolute',
        justifyContent: 'center',        
        alignItems: "center",
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
  },
    modalView: {
        width: '85%',
        borderWidth: 1,
        borderColor: "#048022",        
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        
        
    },
    openButton: {
        backgroundColor: "#048022",
        borderRadius: 5,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        elevation: 3
    },
    textStyle: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontWeight: 'bold',
        marginBottom: 15,
        fontSize: 16,
        textAlign: "justify",
        color: '#048022',
    },
    infoService: {
        padding: 5,
        marginTop: 60,
        backgroundColor: '#fff',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,       
    },
    backButton:{
      position: 'absolute',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',  
    //   marginTop: 30,
    //   marginLeft: 15,
      backgroundColor: '#fff',
      borderRadius: 30,
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
     
});


export default Main;
