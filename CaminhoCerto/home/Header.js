import { View, Text, Image, StyleSheet } from 'react-native';

import Logo from '../assets/logo.png';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Caminho Certo</Text>
      <Image source={Logo} style={styles.img} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#24CBAF',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    paddingTop: 40,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    elevation: 10,
  },
  text: {
    color: 'white',
    fontSize: 28,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  img: {
    height: 130,
    width: 130,
    borderRadius: 100,
  },
});
