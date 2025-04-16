// ContatoForm.js
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
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ContatoForm({ route, navigation }) {
  const contatoEditado = route.params?.contato;

  // Estados dos campos do formulário
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipo, setTipo] = useState('');
  const [foto, setFoto] = useState(null); // Armazena a imagem em base64

  // Solicita permissão para acessar a galeria ao montar o componente
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão negada',
          'Precisamos da permissão da galeria para carregar a foto.'
        );
      }
    })();
  }, []);

  // Preenche os campos se estiver editando
  useEffect(() => {
    if (contatoEditado) {
      setNome(contatoEditado.nome);
      setTelefone(contatoEditado.telefone);
      setTipo(contatoEditado.tipo);
      setFoto(contatoEditado.foto || null);
    }
  }, [contatoEditado]);

  // Função para selecionar imagem do dispositivo
  const selecionarFoto = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
        base64: true, // Captura a imagem em base64
      });
      if (!result.canceled) {
        setFoto(result.assets[0].base64);
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
    }
  };

  // Função para validar e enviar os dados (POST ou PUT)
  const salvarContato = async () => {
    if (!nome || !telefone || !tipo) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    const contatoData = { nome, telefone, tipo, foto };

    // Define URL e método conforme se for edição ou inclusão
    const urlBase = 'https://api-contato-dot-api-samples-423102.uc.r.appspot.com/api/contatos';
    const urlFinal = contatoEditado ? `${urlBase}/${contatoEditado.id}` : urlBase;
    const method = contatoEditado ? 'PUT' : 'POST';

    try {
      const response = await fetch(urlFinal, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 12121059',
        },
        body: JSON.stringify(contatoData),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar o contato');
      }

      Alert.alert(
        'Sucesso',
        `Contato ${contatoEditado ? 'atualizado' : 'adicionado'} com sucesso!`
      );
      navigation.goBack(); // Volta para a tela de listagem, onde a lista será atualizada automaticamente
    } catch (error) {
      console.error('Erro ao salvar contato:', error);
      Alert.alert('Erro', 'Não foi possível salvar o contato.');
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

        {/* Botão para selecionar foto do dispositivo */}
        <Text style={styles.label}>Foto</Text>
        <TouchableOpacity style={styles.btnFoto} onPress={selecionarFoto}>
          <Text style={styles.textoBtnFoto}>Selecionar Foto</Text>
        </TouchableOpacity>

        {/* Pré-visualização da foto, se houver */}
        {foto && (
          <Image
            source={{ uri: `data:image/jpeg;base64,${foto}` }}
            style={styles.fotoPreview}
          />
        )}

        {/* Botões de ação */}
        <TouchableOpacity style={styles.btnSalvar} onPress={salvarContato}>
          <Text style={styles.btnSalvarTexto}>💾 Salvar Contato</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnCancelar} onPress={() => navigation.goBack()}>
          <Text style={styles.btnCancelarTexto}>❌ Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#24CBAF',
    textAlign: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    color: '#2d3436',
    marginVertical: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
    color: '#2d3436',
  },
  btnFoto: {
    backgroundColor: '#24CBAF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  textoBtnFoto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  fotoPreview: {
    width: 80,
    height: 80,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
    borderColor: '#24CBAF',
    borderWidth: 2,
  },
  btnSalvar: {
    backgroundColor: '#24CBAF',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  btnSalvarTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  btnCancelar: {
    backgroundColor: '#e9ecef',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  btnCancelarTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3436',
  },
});
