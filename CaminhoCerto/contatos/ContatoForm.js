import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

export default function ContatoForm({ route, navigation }) {
  // Pega contato vindo da navegação (se houver)
  const contatoEditado = route.params?.contato;

  // Estados do formulário
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipo, setTipo] = useState('');

  // Preenche os campos se estiver editando
  useEffect(() => {
    if (contatoEditado) {
      setNome(contatoEditado.nome);
      setTelefone(contatoEditado.telefone);
      setTipo(contatoEditado.tipo);
    }
  }, [contatoEditado]);

  // Função assíncrona para salvar o contato na API
  const salvarContato = async () => {
    if (!nome || !telefone || !tipo) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const contatoData = { nome, telefone, tipo };

    try {
      const response = await fetch(
        contatoEditado
          ? `https://api-contato-dot-api-samples-423102.uc.r.appspot.com/api/contatos/${contatoEditado.id}`
          : 'https://api-contato-dot-api-samples-423102.uc.r.appspot.com/api/contatos',
        {
          method: contatoEditado ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 12121059',
          },
          body: JSON.stringify(contatoData),
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao salvar o contato');
      }

      Alert.alert(
        'Sucesso',
        `Contato ${contatoEditado ? 'atualizado' : 'adicionado'}!`
      );
      navigation.goBack(); // Volta para a lista
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar o contato');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.titulo}>
          {contatoEditado ? '✏️ Editar Contato' : '📌 Novo Contato'}
        </Text>

        {/* Campo Nome */}
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome"
          value={nome}
          onChangeText={setNome}
        />

        {/* Campo Telefone */}
        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o telefone"
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={setTelefone}
        />

        {/* Campo Tipo */}
        <Text style={styles.label}>Tipo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Família, Trabalho..."
          value={tipo}
          onChangeText={setTipo}
        />

        {/* Botão Salvar */}
        <TouchableOpacity style={styles.botaoSalvar} onPress={salvarContato}>
          <Text style={styles.botaoTexto}>💾 Salvar</Text>
        </TouchableOpacity>

        {/* Botão Cancelar */}
        <TouchableOpacity
          style={styles.botaoCancelar}
          onPress={() => navigation.goBack()}>
          <Text style={styles.botaoTexto}>❌ Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Estilos visuais
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd',
  },
  scroll: {
    padding: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#24CBAF',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  botaoSalvar: {
    backgroundColor: '#24CBAF',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  botaoCancelar: {
    backgroundColor: '#888',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
