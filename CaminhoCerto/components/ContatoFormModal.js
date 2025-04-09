import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ContatoFormModal = ({ visible, onClose, onSubmit, contatoParaEditar }) => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipo, setTipo] = useState('');

  // Preenche os campos se for edição
  useEffect(() => {
    if (contatoParaEditar) {
      setNome(contatoParaEditar.nome);
      setTelefone(contatoParaEditar.telefone);
      setTipo(contatoParaEditar.tipo);
    } else {
      setNome('');
      setTelefone('');
      setTipo('');
    }
  }, [contatoParaEditar]);

  const handleSalvar = () => {
    if (!nome || !telefone || !tipo) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    const novoContato = {
      id: contatoParaEditar ? contatoParaEditar.id : Date.now(),
      nome,
      telefone,
      tipo,
    };

    onSubmit(novoContato);
    onClose(); // fecha o modal após o envio
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.titulo}>{contatoParaEditar ? 'Editar Contato' : 'Novo Contato'}</Text>
          
          <TextInput
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
            style={styles.input}
          />
          <TextInput
            placeholder="Telefone"
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
            style={styles.input}
          />
          <TextInput
            placeholder="Tipo (ex: Pessoal, Trabalho)"
            value={tipo}
            onChangeText={setTipo}
            style={styles.input}
          />

          <View style={styles.botoes}>
            <TouchableOpacity style={styles.btnCancelar} onPress={onClose}>
              <Text style={styles.textoBotao}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSalvar} onPress={handleSalvar}>
              <Text style={styles.textoBotao}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ContatoFormModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    fontSize: 16,
    paddingVertical: 5,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnSalvar: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  btnCancelar: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  textoBotao: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
