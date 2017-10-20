import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ListView,
  TouchableHighlight,
  Keyboard
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import Financias from './Financias';
import CriarFinancias from './CriarFinancias';


const image = require('./assets/menu.png');

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 5,
    padding: 5,
  },
  container: {
    flex: 0.88,
    backgroundColor: '#E0FFFF'
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  }
});

export default class Basic extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.getNameMonthCurrent = this.getNameMonthCurrent.bind(this);
    this.state = {
      isOpen: false,
      selectedItem: 'Gastos'
    };
  }

  getNameMonthCurrent(){
    var month =  new Date().getMonth() + 1;
    switch(month) {
      case 1:
          return "Janeiro";
          break;
      case 2:
          return "Fevereiro";
          break;
      case 3:
          return "Marco";
          break;
      case 4:
          return "Abril";
          break;
      case 5:
          return "Maio";
          break;
      case 6:
          return "Junho";
          break;
      case 7:
          return "Julho";
          break;
      case 8:
        return "Agosto";
        break;
      case 9:
        return "Setembro";
        break;
      case 10:
        return "Outubro";
        break;
      case 11:
        return "Novembro";
        break;
      case 12:
        return "Dezembro";
        break;
      default:
          break;
  }
  }

  toggle() {
    Keyboard.dismiss();
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
    });

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
    const monthName = this.getNameMonthCurrent();
    const screenCurrent = this.state.selectedItem == "Gastos" ? <Financias/> : <CriarFinancias/>;

    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
      <View style={{flex: 0.12, backgroundColor: '#87CEFA'}} >
        <TouchableHighlight>
        <Text style={styles.welcome}>{monthName}
        </Text>
        </TouchableHighlight>
        </View>
        <View style={styles.container}>
        {screenCurrent}
        </View>
        <TouchableOpacity
          onPress={this.toggle}
          style={styles.button}
        >
          <Image
            source={image}
            style={{ width: 32, height: 32 }}
          />
        </TouchableOpacity>
      </SideMenu>
    );
  }
}