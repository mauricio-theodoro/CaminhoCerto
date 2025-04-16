import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const Card = ({ tipo, nome, telefone, foto, onEdit, onDelete }) => {
  return (
    <View style={styles.card}>
      {/* Container da foto com fallback para imagem padrão */}
      <View style={styles.imageContainer}>
        <Image
          source={foto ? 
            { uri: `data:image/jpeg;base64,${foto}` } : 
            require('../assets/filha.png')
          }
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Informações do contato */}
      <View style={styles.infoContainer}>
        {/* Header com nome e tipo */}
        <View style={styles.header}>
          <Text style={styles.nome} numberOfLines={1} ellipsizeMode="tail">
            {nome}
          </Text>
          <Text style={styles.tipo}>({tipo})</Text>
        </View>

        {/* Detalhes do contato */}
        <Text style={styles.telefone}>{telefone}</Text>

        {/* Botões de ação */}
        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.button, styles.editButton]} 
            onPress={onEdit}
          >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.deleteButton]} 
            onPress={onDelete}
          >
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

Card.propTypes = {
  tipo: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  telefone: PropTypes.string.isRequired,
  foto: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    width: 72,
    height: 72,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E9ECEF',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  nome: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginRight: 8,
    maxWidth: '70%',
  },
  tipo: {
    fontSize: 14,
    color: '#FD7E14',
    fontStyle: 'italic',
  },
  telefone: {
    fontSize: 15,
    color: '#495057',
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#24CBAF',
  },
  deleteButton: {
    backgroundColor: '#F03E3E',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 14,
  },
});

export default React.memo(Card);