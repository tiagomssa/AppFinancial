import React, { Component } from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native';

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
        Alert.alert('Sucess', 'Cadastro realizado!');
        this.setState({descricao: "", valor: ""});
        this.refs.FirstInput.focus(); 
      }
      else{
        Alert.alert('Error', 'Nao cadastrado!');
        this.setState({descricao: "", valor: ""});
      }
    });
  }

  render() {

    return (
      <View style={{ alignItems: 'center', flexDirection: 'column', paddingTop: 20}}>
      <Text style={{fontSize: 20, width: 200, backgroundColor: 'gray', color: 'black', textAlign: 'center', padding:10, fontWeight: 'bold',}}>Novo Gasto</Text>
      <TextInput
        ref='FirstInput'
        style={{height: 40, width: 200,  borderColor: 'gray', borderWidth: 3, borderLeftColor: 'gray', borderRightColor: 'gray'}}
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
        style={{height: 40, width: 200,  borderColor: 'gray', borderWidth: 3, borderLeftColor: 'gray', borderRightColor: 'gray'}}
        onChangeText={(valor) => this.setState({valor})}
        placeholder='Valor'
        placeholderTextColor='#A9A9A9'
        keyboardType='numeric'
        value={this.state.valor}
      />
      <View style={{padding: 10, width: 200, backgroundColor: 'gray'}}>
      <Button
        onPress={this.enviarGasto}
        title="Enviar"
        color="#32CD32"
      />
      </View>
      </View>
    );
  }
}