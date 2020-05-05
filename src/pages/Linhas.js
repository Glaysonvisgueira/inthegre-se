import React, { useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList  } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../services/Inthegra.js'
import { getHeaders, getToken, email, senha, api_key } from '../services/Inthegra';


function Linhas(){

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
        console.log(linhasDeOnibus);
    
    useEffect(() => {  
            localizarTodasLinhas();
            setTotalLinhas(linhasDeOnibus.length);          
    }, [linhasDeOnibus]); 

    return(
        <View style={styles.container}>
            <View style={styles.textCountContainer}>
                <Text style={styles.textQtdLinhas}>Total de linhas: <Text style={{fontWeight:'bold'}}>{totalLinhas}</Text></Text>
            </View>            
            <View
            style={{
                borderBottomColor: '#a2a2a3',
                borderBottomWidth: 2,
                marginTop: 10,
                marginHorizontal: 10,
            }}
            />
            <FlatList 
                data={linhasDeOnibus}                
                style={{marginTop: 32}}
                keyExtractor={(item, index) => index.toString()}
                 renderItem={({item: linha}) => (
                    <View style={styles.containerList}> 
                    <Text style={styles.textLinha}>Código da linha: <Text style={{fontWeight: 'bold'}}>{linha.CodigoLinha}</Text></Text>
                    <Text style={styles.textLinha}>Nome da linha: <Text style={{fontWeight: 'bold'}}>{linha.Denomicao}</Text></Text>
                    <Text style={styles.textLinha}>Origem: <Text style={{fontWeight: 'bold'}}>{linha.Origem}</Text></Text>
                    <Text style={styles.textLinha}>Retorno: <Text style={{fontWeight: 'bold'}}>{linha.Retorno}</Text></Text>                 
                   </View>
                 )} />
        </View>
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#e0e0e0',
          
    },
    containerList: {
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 10,
        marginHorizontal: 10,
        shadowColor: "#000000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,       
    },
    textLinha: {
        fontSize: 12,
        color: '#282929', 
        
    },
    textQtdLinhas: {
        color: '#fff',
        fontSize:15,        
        fontWeight: 'bold',
        backgroundColor: '#17161B',
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 15,
    },
    textCountContainer: {
        alignItems: 'flex-end',
        marginTop: 20,
        marginRight: 30,        
    },
});


export default Linhas;
