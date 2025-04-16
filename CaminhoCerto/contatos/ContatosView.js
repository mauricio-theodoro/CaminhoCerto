import React, { useEffect, useState, memo } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import Card from './Card';

const ContatoItem = memo(({ item, onEdit, onDelete }) => {
  // Ações do swipe
  const renderRightActions = () => (
    <View style={styles.swipeActions}>
      <TouchableOpacity
        style={[styles.swipeButton, styles.editSwipe]}
        onPress={() => onEdit(item)}
      >
        <Ionicons name="create-outline" size={20} color="white" />
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.swipeButton, styles.deleteSwipe]}
        onPress={() => onDelete(item)}
      >
        <Ionicons name="trash-outline" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      friction={2}
      rightThreshold={40}
    >
      <Card
        nome={item.nome}
        telefone={item.telefone}
        tipo={item.tipo}
        foto={item.foto}
        onEdit={() => onEdit(item)}
        onDelete={() => onDelete(item)}
      />
    </Swipeable>
  );
});

const ContatosView = ({ navigation }) => {
  const [contatos, setContatos] = useState([]);
  const [contatosFiltrados, setContatosFiltrados] = useState([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  // Busca contatos na API
  const fetchContatos = async () => {
    try {
      const response = await fetch(
        'https://api-contato-dot-api-samples-423102.uc.r.appspot.com/api/contatos',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer 12121059',
          },
        }
      );

      const data = await response.json();
      
      const contatosAdaptados = data.map((contato) => ({
        id: contato.id.toString(),
        nome: contato.nome,
        telefone: contato.telefone,
        tipo: contato.tipo || 'Pessoal',
        foto: contato.foto || null,
      }));

      setContatos(contatosAdaptados);
      setContatosFiltrados(contatosAdaptados);
    } catch (error) {
      console.error('Erro na requisição:', error);
      Alert.alert('Erro', 'Não foi possível carregar os contatos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) fetchContatos();
  }, [isFocused]);

  // Filtra contatos conforme busca
  useEffect(() => {
    const termo = busca.toLowerCase().trim();
    const filtrados = contatos.filter(contato =>
      contato.nome.toLowerCase().includes(termo) ||
      contato.tipo.toLowerCase().includes(termo)
    );
    setContatosFiltrados(filtrados);
  }, [busca, contatos]);

  // Handlers para edição e exclusão
  const handleEdit = (contato) => {
    navigation.navigate('ContatoForm', { contato });
  };

  const handleDelete = async (contato) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Deseja excluir permanentemente ${contato.nome}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(
                `https://api-contato-dot-api-samples-423102.uc.r.appspot.com/api/contatos/${contato.id}`,
                {
                  method: 'DELETE',
                  headers: {
                    Authorization: 'Bearer 12121059',
                  },
                }
              );

              if (response.ok) {
                setContatos(prev => prev.filter(c => c.id !== contato.id));
              } else {
                throw new Error('Falha na exclusão');
              }
            } catch (error) {
              console.error('Erro na exclusão:', error);
              Alert.alert('Erro', 'Não foi possível excluir o contato');
            }
          },
        },
      ]
    );
  };

  // Renderização do item da lista
  const renderItem = ({ item }) => (
    <ContatoItem
      item={item}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );

  return (
    <View style={styles.container}>
      {/* Campo de busca */}
      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Buscar por nome ou tipo..."
        placeholderTextColor="#6C757D"
        value={busca}
        onChangeText={setBusca}
        clearButtonMode="while-editing"
      />

      {/* Lista de contatos */}
      <FlatList
        data={contatosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {loading ? 'Carregando...' : 'Nenhum contato encontrado'}
          </Text>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
      />

      {/* Botão flutuante */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('ContatoForm')}
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

// Estilos atualizados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DEE2E6',
    color: '#212529',
  },
  listContent: {
    paddingBottom: 80,
  },
  separator: {
    height: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6C757D',
    marginTop: 40,
    fontSize: 16,
  },
  swipeActions: {
    flexDirection: 'row',
    height: '100%',
  },
  swipeButton: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editSwipe: {
    backgroundColor: '#24CBAF',
  },
  deleteSwipe: {
    backgroundColor: '#F03E3E',
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    backgroundColor: '#24CBAF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default ContatosView;