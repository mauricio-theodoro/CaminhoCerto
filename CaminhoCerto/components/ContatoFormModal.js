import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const ContatoFormModal = ({ visible, onClose, onSubmit, contatoParaEditar }) => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipo, setTipo] = useState('');
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    if (contatoParaEditar) {
      setNome(contatoParaEditar.nome);
      setTelefone(contatoParaEditar.telefone);
      setTipo(contatoParaEditar.tipo);
      setFoto(contatoParaEditar.foto || null);
    } else {
      resetCampos();
    }
  }, [contatoParaEditar]);

  const resetCampos = () => {
    setNome('');
    setTelefone('');
    setTipo('');
    setFoto(null);
  };

  const handleSelecionarFoto = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissão para acessar a galeria é necessária!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0].base64) {
        setFoto(result.assets[0].base64);
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      alert('Erro ao carregar a imagem');
    }
  };

  const handleSubmit = () => {
    if (!nome || !telefone || !tipo) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const contatoData = {
      id: contatoParaEditar?.id || Date.now().toString(),
      nome,
      telefone,
      tipo,
      foto: foto || null,
    };

    onSubmit(contatoData);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.titulo}>
            {contatoParaEditar ? 'Editar Contato' : 'Novo Contato'}
          </Text>

          {/* Seletor de Foto */}
          <TouchableOpacity
            style={styles.fotoContainer}
            onPress={handleSelecionarFoto}
            activeOpacity={0.8}
          >
            {foto ? (
              <Image
                source={{ uri: `data:image/jpeg;base64,${foto}` }}
                style={styles.fotoPreview}
              />
            ) : (
              <View style={styles.fotoPlaceholder}>
                <Ionicons name="camera" size={32} color="#24CBAF" />
                <Text style={styles.fotoTexto}>Adicionar Foto</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Campos do Formulário */}
          <TextInput
            placeholder="Nome completo"
            value={nome}
            onChangeText={setNome}
            style={styles.input}
            autoCapitalize="words"
          />
          
          <TextInput
            placeholder="Telefone"
            value={telefone}
            onChangeText={setTelefone}
            style={styles.input}
            keyboardType="phone-pad"
          />
          
          <TextInput
            placeholder="Tipo (ex: Família, Trabalho)"
            value={tipo}
            onChangeText={setTipo}
            style={styles.input}
          />

          {/* Botões de Ação */}
          <View style={styles.botoesContainer}>
            <TouchableOpacity
              style={[styles.botao, styles.botaoCancelar]}
              onPress={onClose}
            >
              <Text style={styles.botaoTexto}>Cancelar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.botao, styles.botaoSalvar]}
              onPress={handleSubmit}
            >
              <Text style={styles.botaoTexto}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 15,
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2d3436',
  },
  fotoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f8f9fa',
    alignSelf: 'center',
    marginBottom: 25,
    borderWidth: 2,
    borderColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  fotoPreview: {
    width: '100%',
    height: '100%',
  },
  fotoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fotoTexto: {
    color: '#24CBAF',
    fontSize: 14,
    marginTop: 8,
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
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 10,
  },
  botao: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoSalvar: {
    backgroundColor: '#24CBAF',
  },
  botaoCancelar: {
    backgroundColor: '#e9ecef',
  },
  botaoTexto: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
  },
});

export default ContatoFormModal;