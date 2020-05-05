import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import MapaTodosVeiculos from './pages/MapaTodosVeiculos';
import Paradas from './pages/Paradas';
import Sobre from './pages/Sobre';
import StransSite from './pages/StransSite';
import GithubPage from './pages/GithubPage';
import Linhas from './pages/Linhas';

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {                                
                headerShown: false,                                       
                headerBackTitleVisible: false, 
            },
        },
        MapaTodosVeiculos: {
            screen: MapaTodosVeiculos,
            navigationOptions: {                
                title: 'RASTREADOR DE ÔNIBUS    ',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: '#fff'
                }                       
            },
        },
        Paradas: {
            screen: Paradas,
            navigationOptions: {                
                title: 'PARADAS DE ÔNIBUS',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: '#fff'
                }                       
            },
        },
        Linhas: {
            screen: Linhas,
            navigationOptions: {                
                title: 'TODAS AS LINHAS DE ÔNIBUS',
                headerTitleAlign: 'center',                
                headerTitleStyle: {
                    color: '#fff'
                }                       
            },
        },
        Sobre: {
            screen: Sobre,
                         
            
        },
        StransSite: {
            screen: StransSite,
            navigationOptions: {
                title: 'SITE DA API DA STRANS',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: '#fff'
                },
            },            
        },
        GithubPage: {
            screen: GithubPage,
            navigationOptions: {
                title: 'CÓDIGO FONTE',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: '#fff'
                },
            },            
        },
    }, {
        defaultNavigationOptions: {            
           headerShown: false
        }
    })
);

export default Routes;