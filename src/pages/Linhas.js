import React, { useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, SafeAreaView, TextInput  } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import api from '../services/Inthegra.js'
import { getHeaders, getToken, email, senha, api_key } from '../services/Inthegra';


function Linhas({ navigation }){

    const [linhasDeOnibus, setLinhas] = useState([]);
    const [totalLinhas, setTotalLinhas] = useState(0);

    function navigateBack() {
        navigation.goBack()
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
        //console.log(linhasDeOnibus);
    
    useEffect(() => {  
            localizarTodasLinhas();
            setTotalLinhas(linhasDeOnibus.length);          
    }, [linhasDeOnibus]); 

    return(
        <View style={styles.container}>
            <TouchableOpacity  onPress={navigateBack} style={styles.backButton}>
                    <FontAwesome name="arrow-circle-left" size={35} color="#fff" /> 
                    
                </TouchableOpacity>
          
            <View style={styles.textCountContainer}>
                <Text style={styles.textQtdLinhas}>Total de linhas: <Text style={{fontWeight:'bold'}}>{totalLinhas}</Text></Text>
            </View>            
            <View
            style={{
                borderBottomColor: '#28405e',
                borderBottomWidth: 1,
                marginTop: 10,
                marginHorizontal: 20,
            }}
            />
            <FlatList 
                data={linhasDeOnibus}                
                style={{marginTop: 15}}
                keyExtractor={(item, index) => index.toString()}
                 renderItem={({item: linha}) => (
                    <View style={styles.containerList}> 
                    <Text style={styles.textLinha}>Código da linha: <Text style={{fontWeight: 'bold'}}>{linha.CodigoLinha}</Text></Text>
                    <Text style={styles.textLinha}>Nome da linha: <Text style={{fontWeight: 'bold'}}>{linha.Denomicao}</Text></Text>
                    <Text style={styles.textLinha}>Origem: <Text style={{fontWeight: 'bold'}}>{linha.Origem}</Text></Text>
                    <Text style={styles.textLinha}>Retorno: <Text style={{fontWeight: 'bold'}}>{linha.Retorno}</Text></Text>                 
                   </View>
                 )} />
        <View style={{marginTop:110}}></View>
        <SafeAreaView style={styles.searchForm}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Procurar linha..."
          placeholderTextColor="#5a748c"
          autoCapitalize="words"
          autoCorrect={true}  
          maxLength={50}       
        />

        <TouchableOpacity style={styles.loadButton}>
          <MaterialIcons name="search" size={30} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>
          
        </View>
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(219, 219, 219, 0.5)',          
    },
    containerList: {
        padding: 15,
        borderRadius: 6,
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
    textLinha: {
        fontSize: 12,
        color: '#28405e',         
    },
    textQtdLinhas: {
        color: '#fff',
        fontSize:15,        
        fontWeight: 'bold',
        backgroundColor: '#28405e',
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 15,
    },
    textCountContainer: {
        alignItems: 'flex-end',
        marginTop: 0,
        marginRight: 30,        
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


export default Linhas;
