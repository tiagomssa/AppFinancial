import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, ScrollView } from 'react-native';

export default class Financias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      total: 0
    }
  }

  componentDidMount() {
    return fetch('http://gastospessoais.atwebpages.com/ListFinancial.php')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.financias),
        }, function() {
          // do something with new state
          var totalItems = 0;
          var items = responseJson.financias;
          if(items !== undefined){
            for(var i=0; i<items.length; i++){
                totalItems+=parseFloat(items[i].Valor);
            }
            this.setState({total: totalItems});
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ alignItems: 'center', flexDirection: 'column', width: '100%', height: 400, paddingTop: 10}}>
      <ScrollView>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <View style={{flexDirection: 'row', alignItems: 'center',borderBottomWidth: 1, borderBottomColor: '#cbd2d9', paddingTop:10, backgroundColor: '#f0ffff'}}>
                    <Text style={{padding: 10, color:'black', fontSize: 18, fontWeight: 'bold', fontStyle: 'italic'} }>{rowData.Descricao}: R${rowData.Valor}</Text>
                    </View>}
        />
        </ScrollView>
        <View style={{flexDirection: 'row', backgroundColor: 'gray', padding: 10}}>
        <Text style={{ color:'black', fontSize: 20, fontWeight: 'bold'} }>Total Gasto: </Text>
        <Text style={{color:'black',fontWeight: 'bold', fontSize: 20} }>R${this.state.total} </Text>
        </View>
      </View>
    );
  }
}