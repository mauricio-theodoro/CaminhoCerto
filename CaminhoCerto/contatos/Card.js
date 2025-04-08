import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Foto from '../assets/filha.png'; // Imagem local do contato (pode ser personalizada futuramente)

/**
 * Componente de cartão de contato
 * @param {string} tipo - Grau de parentesco (ex: MÃE, FILHA)
 * @param {string} nome - Nome do contato
 * @param {string} telefone - Número de telefone
 * @param {function} onPress - Função ao clicar no cartão (opcional)
 * @param {function} onEdit - Função para editar (pode ser usada no futuro)
 * @param {function} onDelete - Função para deletar (pode ser usada no futuro)
 */
export default function Card({ tipo, nome, telefone, onPress, onDelete, onEdit }) {
  return (
    // Cartão clicável
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.card}>
        {/* Imagem do contato (círculo com borda colorida) */}
        <Image source={Foto} style={styles.image} />

        {/* Informações do contato: nome, tipo e telefone */}
        <View style={styles.infoContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.nome}>{nome}</Text>
            <Text style={styles.tipo}>({tipo})</Text>
          </View>
          <Text style={styles.telefone}>{telefone}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// Estilos para o componente de cartão
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',               // alinha imagem e informações lado a lado
    backgroundColor: '#fff',           // fundo branco
    borderRadius: 12,                  // bordas arredondadas
    padding: 12,                       // espaçamento interno
    marginBottom: 15,                  // espaçamento entre os cartões
    alignItems: 'center',             // centraliza verticalmente os itens
    elevation: 4,                      // sombra no Android
    shadowColor: '#000',              // sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 32.5,                // torna a imagem circular
    marginRight: 15,                   // espaço entre imagem e texto
    borderWidth: 2,
    borderColor: '#fd3707',           // borda laranja estilizada
  },
  infoContainer: {
    flex: 1,                           // ocupa todo o espaço restante
    flexDirection: 'column',
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',             // nome e tipo lado a lado
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
  },
});
