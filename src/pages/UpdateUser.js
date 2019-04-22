import React from 'react';
import { View, YellowBox, ScrollView, KeyboardAvoidingView, Alert, } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
 
export default class UpdateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_user_id: '',
      user_name: '',
      user_contact: '',
      user_address: '',
    };
  }
  searchUser = () => {
    const {input_user_id} =this.state;
    console.log(this.state.input_user_id);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_user where user_id = ?',
        [input_user_id],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len',len);
          if (len > 0) {
            console.log(results.rows.item(0).user_contact);
            this.setState({
             user_name:results.rows.item(0).user_name,
            });
            this.setState({
             user_contact:results.rows.item(0).user_contact,
            });
            this.setState({
             user_address:results.rows.item(0).user_address,
            });
          }else{
            alert('Usuário não encontrado');
            this.setState({
              user_name:'',
              user_contact:'',
              user_address:'',
            });
          }
        }
      );
    });
  };
  updateUser = () => {
    var that=this;
    const { input_user_id } = this.state;
    const { user_name } = this.state;
    const { user_contact } = this.state;
    const { user_address } = this.state;
    if (user_name){
      if (user_contact){
        if (user_address){
          db.transaction((tx)=> {
            tx.executeSql(
              'UPDATE table_user set user_name=?, user_contact=? , user_address=? where user_id=?',
              [user_name, user_contact, user_address, input_user_id],
              (tx, results) => {
                console.log('Results',results.rowsAffected);
                if(results.rowsAffected>0){
                  Alert.alert( 'Sucesso', 'Usuário atualizado com Sucesso',
                    [
                      {text: 'Ok', onPress: () => that.props.navigation.navigate('HomeScreen')},
                    ],
                    { cancelable: false }
                  );
                }else{
                  alert('Erro ao atualizar usuário');
                }
              }
            );
          });
        }else{
          alert('Informe o endereço');
        }
      }else{
        alert('Informe o telefone');
      }
    }else{
      alert('Informe o nome');
    }
  };
 
  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
            <Mytextinput
              placeholder="Informe o ID do usuário"
              style={{ padding:10 }}
              onChangeText={input_user_id => this.setState({ input_user_id })}
            />
            <Mybutton
              title="Pesquisar usuário"
              customClick={this.searchUser.bind(this)}
            />
            <Mytextinput
              placeholder="Digite o Nome"
              value={this.state.user_name}
              style={{ padding:10 }}
              onChangeText={user_name => this.setState({ user_name })}
            />
            <Mytextinput
              placeholder="Digite o Telefone"
              value={''+ this.state.user_contact}
              onChangeText={user_contact => this.setState({ user_contact })}
              maxLength={10}
              style={{ padding:10 }}
              keyboardType="numeric"
            />
            <Mytextinput
              value={this.state.user_address}
              placeholder="Digite o Endereço"
              onChangeText={user_address => this.setState({ user_address })}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{textAlignVertical : 'top', padding:10}}
            />
            <Mybutton
              title="Atualizar Usuário"
              customClick={this.updateUser.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}