import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import Card from './Card';

// Lista de contatos - idealmente pode vir de uma API futuramente
const contatos = [
  { id: '1', tipo: 'FILHA', nome: 'Larissa', telefone: '(31) 9 9999-9999' },
  { id: '2', tipo: 'MÃE', nome: 'Anete', telefone: '(31) 9 9999-9999' },
  { id: '3', tipo: 'PAI', nome: 'Luciano', telefone: '(31) 9 9999-9999' },
  { id: '4', tipo: 'ESPOSA', nome: 'Maria', telefone: '(31) 9 9999-9999' },
  { id: '5', tipo: 'IRMÃO', nome: 'José', telefone: '(31) 9 9999-9999' },
];

export default function ContatosView() {
  return (
    <View style={styles.container}>
      {/* Cabeçalho do app */}
      <Text style={styles.header}>📇 Meus Contatos</Text>

      {/* Lista de contatos com FlatList para performance */}
      <FlatList
        data={contatos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cardsContainer}
        renderItem={({ item }) => (
          <Card tipo={item.tipo} nome={item.nome} telefone={item.telefone} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

// Estilo da tela principal
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#fd3707',
    padding: 15,
    borderRadius: 12,
    textAlign: 'center',
    marginBottom: 25,
    elevation: 5,
  },
  cardsContainer: {
    paddingBottom: 30,
  },
});
