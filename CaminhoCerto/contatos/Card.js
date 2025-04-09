import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Foto from '../assets/filha.png'; // Imagem local do contato

/**
 * Componente de cartão de contato
 * @param {string} tipo - Grau de parentesco
 * @param {string} nome - Nome do contato
 * @param {string} telefone - Número de telefone
 * @param {function} onPress - Ação ao clicar no cartão
 * @param {function} onEdit - Ação ao clicar em "Editar"
 * @param {function} onDelete - Ação ao clicar em "Excluir"
 */
export default function Card({ tipo, nome, telefone, onPress, onEdit, onDelete }) {
  return (
    // Container principal do cartão (sem TouchableOpacity externo para evitar conflito com botões)
    <View style={styles.card}>
      {/* Imagem do contato */}
      <Image source={Foto} style={styles.image} />

      {/* Informações do contato */}
      <View style={styles.infoContainer}>
        {/* Nome e tipo (grau de parentesco) */}
        <View style={styles.headerRow}>
          <Text style={styles.nome}>{nome}</Text>
          <Text style={styles.tipo}>({tipo})</Text>
        </View>

        {/* Número de telefone */}
        <Text style={styles.telefone}>{telefone}</Text>

        {/* Botões de ação */}
        <View style={styles.actionRow}>
          {/* Botão Editar */}
          {onEdit && (
            <TouchableOpacity style={styles.btnEditar} onPress={onEdit}>
              <Text style={styles.textoBtn}>Editar</Text>
            </TouchableOpacity>
          )}

          {/* Botão Excluir */}
          {onDelete && (
            <TouchableOpacity style={styles.btnExcluir} onPress={onDelete}>
              <Text style={styles.textoBtn}>Excluir</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

// Estilos do componente
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 15,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#24CBAF',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  tipo: {
    fontSize: 14,
    color: '#fd3707',
    fontStyle: 'italic',
  },
  telefone: {
    fontSize: 15,
    color: '#555',
    marginBottom: 8,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10, // funciona em versões recentes do React Native
  },
  btnEditar: {
    backgroundColor: '#24CBAF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
  },
  btnExcluir: {
    backgroundColor: '#fd3707',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  textoBtn: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
