import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.inthegra.strans.teresina.pi.gov.br/v1',
});

export default api;

//Dados para autenticação na API da STRANS para conseguir acessar os dados da frota.    
const email = ''    
const senha = ''
const api_key = ''

//Retornar o Header para acessar a API.
function getHeaders(){
    var config = {
        headers:{
            'Content-Type': 'application/json',
            'Accept-Language': 'en',
            'Date': 'Wed, 13 Apr 2016 12:07:37 GMT',
            'X-Api-Key': api_key,
        }
    };
    return config;
    }

  //Coletar o Token de autorização para acessar a API.
    async function getToken(){     
        var dados = '';
        const apiResponse = await api.post('/signin',{
        email: email, password: senha
    }, getHeaders()).then(function(response){
        dados = response.data;
        return dados;
    }).catch(function (error) {
        console.log(error);
        return Promise.reject(error);
    });
        return dados;
    }

export {
  getHeaders,
  getToken,
  email,
  senha,
  api_key,
};
