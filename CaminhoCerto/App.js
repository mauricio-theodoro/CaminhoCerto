import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Telas do app
import HomeView from './home/HomeView';
import ContatosView from './contatos/ContatosView';
import ContatoForm from './contatos/ContatoForm'; // <- Formulário para adicionar/editar contatos

// Criação da pilha de navegação
const Stack = createNativeStackNavigator();

export default function App() {
  // Lista de contatos
  const [contatos, setContatos] = useState([]);
  // Controle da exibição do modal
  const [modalVisible, setModalVisible] = useState(false);
  // Contato que está sendo editado
  const [contatoEditando, setContatoEditando] = useState(null);

  // Abre o modal para adicionar um novo contato
  const abrirModalAdicionar = () => {
    setContatoEditando(null);
    setModalVisible(true);
  };

  // Abre o modal para editar um contato existente
  const abrirModalEditar = (contato) => {
    setContatoEditando(contato);
    setModalVisible(true);
  };

  // Salva o contato (novo ou editado)
  const salvarContato = (contatoSalvo) => {
    if (contatoEditando) {
      // Atualiza o contato existente
      const atualizados = contatos.map((c) =>
        c.id === contatoEditando.id ? contatoSalvo : c
      );
      setContatos(atualizados);
    } else {
      // Adiciona um novo contato com ID único
      const novoContato = { ...contatoSalvo, id: Date.now() };
      setContatos([...contatos, novoContato]);
    }
    setModalVisible(false); // Fecha o modal após salvar
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={defaultOptions}>
          {/* Tela de boas-vindas */}
          <Stack.Screen name="home" component={HomeView} options={homeOptions} />

          {/* Tela de lista de contatos */}
          <Stack.Screen name="contatos" options={contatosOptions}>
            {(props) => (
              <ContatosView
                {...props}
                contatos={contatos}
                onAdicionar={abrirModalAdicionar}
                onEditar={abrirModalEditar}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                contatoEditando={contatoEditando}
                onSalvar={salvarContato}
              />
            )}
          </Stack.Screen>

          {/* Tela de formulário para contato individual */}
          <Stack.Screen
            name="ContatoForm"
            component={ContatoForm}
            options={{ title: 'Novo Contato' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

// Estilo padrão do cabeçalho de todas as telas
const defaultOptions = {
  headerStyle: {
    backgroundColor: '#24CBAF',
  },
  headerTintColor: 'white',
  headerTitleAlign: 'center',
};

// Opções específicas da tela inicial
const homeOptions = {
  title: 'Bem-vindo!',
};

// Opções específicas da tela de contatos
const contatosOptions = {
  title: 'Selecione um contato',
};
