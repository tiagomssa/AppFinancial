import React, { Component } from 'react';
import { Text, View, TextInput, Button, Alert, Keyboard, ToastAndroid } from 'react-native';

export default class CriarFinancias extends Component {
  constructor(props) {
    super(props);
    this.enviarGasto = this.enviarGasto.bind(this);
    this.state = {
      descricao: "",
      valor: ""
    }
  }

  enviarGasto(){
    const {goBack} = this.props.navigation;
    if(this.state.descricao === "" || this.state.valor === ""){
      Alert.alert("Aviso!", "Preencher todos os campos!");
      return;
    }
    console.log(this.state.descricao);
    var data = {  method: 'POST', 
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }, body: JSON.stringify({
                    descricao: this.state.descricao,
                    valor: this.state.valor,
                  })
                };
    fetch('http://gastospessoais.atwebpages.com/ListFinancial.php', data)
    .then((response)  =>{
      console.log(response);
      if(response.status == 200) {
        //Alert.alert('Sucess', 'Cadastro realizado!');
        ToastAndroid.show('Inserted Sucess', 2000);
        this.setState({descricao: "", valor: ""});
        //goBack('Home');
        Keyboard.dismiss();
      }
      else{
        Alert.alert('Error', 'Nao cadastrado!');
        this.setState({descricao: "", valor: ""});
      }
    });
  }

  static navigationOptions = {
    title: 'Criar Gasto',
  };

  render() {
    
    return (
      <View style={{ alignItems: 'center', flexDirection: 'column',flex: 1}}>
      <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
      <TextInput
        ref='FirstInput'
        style={{height: 40, width: 300,  borderColor: '#E0FFFF', borderWidth: 2, borderLeftColor: '#E0FFFF', borderRightColor: '#E0FFFF', marginBottom:20, marginTop:60}}
        onChangeText={(descricao) => this.setState({descricao})}
        returnKeyType = {"next"}
        autoFocus = {true}
        placeholder='Descricao'
        placeholderTextColor='#A9A9A9'
        value={this.state.descricao}
        onSubmitEditing={(event) => { 
        this.refs.SecondInput.focus(); 
      }}
      />
      <TextInput
        ref='SecondInput'
        style={{height: 40, width: 300,  borderColor: '#E0FFFF', borderWidth: 2, borderLeftColor: '#E0FFFF', borderRightColor: '#E0FFFF'}}
        onChangeText={(valor) => this.setState({valor})}
        placeholder='Valor'
        placeholderTextColor='#A9A9A9'
        keyboardType='numeric'
        value={this.state.valor}
      />
      <View style={{padding: 10, width: 200, borderColor: '#E0FFFF'}}>
      <Button
        onPress={this.enviarGasto}
        title="Enviar"
        color="#32CD32"
      />
      </View>
      </View>
      </View>
    );
  }
}