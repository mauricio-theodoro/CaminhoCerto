import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function CustomButton({ title = '?', color = 'red', onPress }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
