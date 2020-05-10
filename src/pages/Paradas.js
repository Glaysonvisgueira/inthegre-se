import React, { useState, useEffect} from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Alert, Modal, SafeAreaView  } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import api from '../services/Inthegra.js'
import { getHeaders, getToken, email, senha, api_key } from '../services/Inthegra';


function Main({ navigation }){

    const [currentRegion, setCurrentRegion] = useState(null); 
    const [modalVisible, setModalVisible] = useState(false);    
    const [todasParadas, setParadas] = useState([]);

    function navigateBack() {
        navigation.goBack()
      }

    class Parada{ 
        constructor(CodigoParada, Denomicao, Endereco, Lat, Long){
            this.CodigoParada = CodigoParada;
            this.Denomicao = Denomicao;
            this.Endereco = Endereco;
            this.Lat = Lat;
            this.Long = Long;                
            }  
        } 
   
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
        userLocationUpdateInterval="5000"        
        rotateEnabled={false}
        toolbarEnabled={false}
        loadingEnabled={true}
        >      

        
        </MapView>         
        <SafeAreaView style={styles.searchForm}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Procurar paradas"
          placeholderTextColor="#5a748c"
          autoCapitalize="words"
          autoCorrect={true}  
          maxLength={50}       
        />

        <TouchableOpacity style={styles.loadButton}>
          <MaterialIcons name="search" size={30} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>
           
           <View style={styles.containerButtons}>
           <TouchableOpacity  onPress={navigateBack} style={styles.backButton}>
                    <FontAwesome name="arrow-circle-left" size={35} color="#fff" /> 
                    
                </TouchableOpacity>
                
                    <TouchableOpacity onPress={() => {
                        setModalVisible(true);
                        }} style={styles.infoService}>
                        <MaterialIcons name="info" size={35} color="#fff" />
                    </TouchableOpacity>  
            </View>

            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert("Janela fechada.");
                    }}
                     >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>As informações exibidas por este aplicativo são fornecidas através da API de monitoramento de
                         frota da Superintendência Municipal de Transportes e Trânsito (STRANS) de Teresina - PI. Qualquer dúvida sobre o funcionamento da API. Para entrar em contato com o desenvolvedor, veja a sessão "Sobre" no menu principal.</Text>
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
              
      
      </>
    ) 
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    containerButtons :{
        flexDirection :'column',
        position: 'absolute',
        top: 45, 
        left: 15, 
        
    },
    infoService: {
        flexDirection :'column',
        width: 60,
        height: 60,
        backgroundColor: '#28405e',
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
    searchForm: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,        
        flexDirection: 'row',
        justifyContent: 'flex-end',
        
       
    },
    searchInput: {
        flex: 1,
        height: 50,       
        backgroundColor: '#FFF',
        color: '#28405e',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 17,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 3
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#28405e',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        shadowColor: "#000000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, 
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
        borderColor: "#28405e",
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        
        
    },
    openButton: {
        backgroundColor: "#28405e",
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
        color: '#28405e',
    },
    textLink: {
        color: '#0077ff',
    },
    backButton: {
        backgroundColor: '#28405e',
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
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
