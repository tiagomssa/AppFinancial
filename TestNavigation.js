import React, { Component } from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
// import { Icon } from 'react-native-elements';
import Financias from './Financias';
import CriarFinancias from './CriarFinancias';

export const Tabs = TabNavigator({
    Gastos: {
      screen: Financias,
    },
    CriarGasto: {
      screen: CriarFinancias,
      navigationOptions: {
        tabBarLabel: 'Criar Gastos',
      },
    },
  });

const Stack = StackNavigator({
    Gastos: { screen: Financias },
    CriarFinancias: { screen: CriarFinancias },
  });

export default class TestNavigation extends Component {
    render() {
      return <Tabs/>;
    }
  }
  