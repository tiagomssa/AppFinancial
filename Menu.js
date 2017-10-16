import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';

const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#B0C4DE',
    padding: 10,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 10,
    fontWeight: 'bold',
    color: 'black'
  },
  item: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 5,
    color: 'black'
  },
});

export default function Menu({ onItemSelected }) {
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{ uri }}
        />
        <Text style={styles.name}>Tiago</Text>
      </View>

      <Text
        onPress={() => onItemSelected('Gastos')}
        style={styles.item}
      >
        Gastos
      </Text>

      <Text
        onPress={() => onItemSelected('CriarGasto')}
        style={styles.item}
      >
        Criar Gasto
      </Text>
    </ScrollView>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};