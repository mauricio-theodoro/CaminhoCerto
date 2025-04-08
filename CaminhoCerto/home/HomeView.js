import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import CustomButton from './CustomButton';
import Header from './Header';

export default function HomeView({navigation}) {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.menu}>
        <CustomButton
          title="SOS"
          color="red"
          onPress={() => navigation.navigate('contatos')}
        />
        <CustomButton title="REGISTRO" color="#24CBAF" />
        <CustomButton title="RASTREIO" color="#24CBAF" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'blue',
    //marginTop: Constants.statusBarHeight,
  },
  menu: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 10,
  },
});
