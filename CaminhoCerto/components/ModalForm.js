// ModalForm.js
import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function ModalForm({ visible, onClose, onSalvar, contatoEditando }) {
  // Estados locais para os campos do formulário
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipo, setTipo] = useState('');

  // Preenche os campos se for edição
  useEffect(() => {
    if (contatoEditando) {
      setNome(contatoEditando.nome || '');
      setTelefone(contatoEditando.telefone || '');
      setTipo(contatoEditando.tipo || '');
    } else {
      setNome('');
      setTelefone('');
      setTipo('');
    }
  }, [contatoEditando]);

  // Validação e envio dos dados
  const handleSalvar = () => {
    if (!nome || !telefone || !tipo) {
      alert('Preencha todos os campos!');
      return;
    }

    const contato = {
      id: contatoEditando ? contatoEditando.id : null,
      nome,
      telefone,
      tipo,
    };

    onSalvar(contato); // Envia para o App.js
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.form}>
          <Text style={styles.titulo}>
            {contatoEditando ? 'Editar Contato' : 'Novo Contato'}
          </Text>

          <TextInput
            placeholder="Nome"
            style={styles.input}
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            placeholder="Telefone"
            style={styles.input}
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="phone-pad"
          />

          <TextInput
            placeholder="Tipo (ex: trabalho, pessoal...)"
            style={styles.input}
            value={tipo}
            onChangeText={setTipo}
          />

          <View style={styles.botoes}>
            <TouchableOpacity style={styles.botaoCancelar} onPress={onClose}>
              <Text style={styles.textoBotao}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoSalvar} onPress={handleSalvar}>
              <Text style={styles.textoBotao}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// Estilos do formulário
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    backgroundColor: 'white',
    width: '85%',
    padding: 20,
    borderRadius: 10,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botaoCancelar: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  botaoSalvar: {
    backgroundColor: '#24CBAF',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
  },
});
