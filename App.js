/*Example of SQLite Database in React Native*/
import React from 'react';
//In Version 2+
//import {createStackNavigator} from 'react-navigation';
//In Version 3+
import {createStackNavigator,createAppContainer} from 'react-navigation';
import HomeScreen from './src/pages/HomeScreen';
import RegisterUser from './src/pages/RegisterUser';
import UpdateUser from './src/pages/UpdateUser';
import ViewUser from './src/pages/ViewUser';
import ViewAllUser from './src/pages/ViewAllUser';
import DeleteUser from './src//pages/DeleteUser';
 
const App = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
  View: {
    screen: ViewUser,
    navigationOptions: {
      title: 'Exibir Usuário',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
  ViewAll: {
    screen: ViewAllUser,
    navigationOptions: {
      title: 'Exibir todos os Usuários',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
  Update: {
    screen: UpdateUser,
    navigationOptions: {
      title: 'Atualizar Usuário',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
  Register: {
    screen: RegisterUser,
    navigationOptions: {
      title: 'Inserir novo Usuário',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
  Delete: {
    screen: DeleteUser,
    navigationOptions: {
      title: 'Deletar Usuário',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
});
//For React Navigation Version 2+
//export default App;
//For React Navigation Version 3+
export default createAppContainer(App);