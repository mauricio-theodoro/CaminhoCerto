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

const ContatoItem = memo(({ item, onEdit, onDelete }) => {
  const renderRightActions = () => (
    <View style={styles.swipeActions}>
      <TouchableOpacity
        onPress={() => onEdit(item)}
        style={[styles.actionButton, styles.editButton]}>
        <Text style={styles.actionText}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onDelete(item)}
        style={[styles.actionButton, styles.deleteButton]}>
        <Text style={styles.actionText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.card}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.telefone}>{item.telefone}</Text>
        <Text style={styles.tipo}>{item.tipo}</Text>
      </View>
    </Swipeable>
  );
});

export default function ContatosView({ navigation }) {
  const [contatos, setContatos] = useState([]);
  const [contatosFiltrados, setContatosFiltrados] = useState([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const fetchContatos = async () => {
    try {
      const response = await fetch('https://api-contato-dot-api-samples-423102.uc.r.appspot.com/api/contatos', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer 12121059',
        },
      });

      const data = await response.json();

      const contatosAdaptados = data.map((contato) => ({
        id: contato.id,
        nome: contato.nome,
        telefone: contato.telefone,
        tipo: contato.tipo || 'Pessoal',
      }));

      setContatos(contatosAdaptados);
      setContatosFiltrados(contatosAdaptados);
    } catch (error) {
      console.error('Erro ao buscar contatos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os contatos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchContatos();
    }
  }, [isFocused]);

  const handleEdit = (contato) => {
    navigation.navigate('ContatoForm', { contato });
  };

  const handleDelete = (contato) => {
    Alert.alert(
      'Confirmar exclusão',
      `Tem certeza que deseja excluir ${contato.nome}?`,
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
                setContatos((prev) => prev.filter((c) => c.id !== contato.id));
                setContatosFiltrados((prev) => prev.filter((c) => c.id !== contato.id));
              } else {
                throw new Error('Erro ao excluir contato');
              }
            } catch (error) {
              console.error('Erro ao excluir contato:', error);
              Alert.alert('Erro', 'Não foi possível excluir o contato.');
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    navigation.setOptions({
      title: loading || contatos.length === 0 ? 'Crie um contato' : '📇 Meus Contatos',
    });
  }, [contatos, loading, navigation]);

  useEffect(() => {
    const termo = busca.toLowerCase();
    const filtrados = contatos.filter(
      (c) =>
        c.nome.toLowerCase().includes(termo) ||
        c.tipo.toLowerCase().includes(termo)
    );
    setContatosFiltrados(filtrados);
  }, [busca, contatos]);

  const renderItem = ({ item }) => (
    <ContatoItem item={item} onEdit={handleEdit} onDelete={handleDelete} />
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>📇 Meus Contatos</Text>
        <Text>Carregando contatos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBusca}
        placeholder="🔍 Buscar por nome ou tipo..."
        value={busca}
        onChangeText={setBusca}
        placeholderTextColor="#999"
      />

      <FlatList
        data={contatosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.cardsContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={<Text style={styles.header}>📇 Meus Contatos</Text>}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum contato encontrado.</Text>}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('ContatoForm')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#24CBAF',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 12,
    textAlign: 'center',
    marginBottom: 20,
    elevation: 5,
  },
  inputBusca: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
  },
  cardsContainer: {
    paddingBottom: 80,
  },
  separator: {
    height: 15,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  telefone: {
    fontSize: 16,
    color: '#555',
  },
  tipo: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  swipeActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  editButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    right: 25,
    bottom: 30,
    backgroundColor: '#24CBAF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
