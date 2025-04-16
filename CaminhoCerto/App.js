// App.js
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Telas do app
import HomeView from './home/HomeView';
import ContatosView from './contatos/ContatosView';
import ContatoForm from './contatos/ContatoForm';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={defaultOptions}>
          <Stack.Screen
            name="home"
            component={HomeView}
            options={homeOptions}
          />
          <Stack.Screen
            name="contatos"
            component={ContatosView}
            options={contatosOptions}
          />
          <Stack.Screen
            name="ContatoForm"
            component={ContatoForm}
            options={{ title: 'Gerenciar Contato' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const defaultOptions = {
  headerStyle: { backgroundColor: '#24CBAF' },
  headerTintColor: 'white',
  headerTitleAlign: 'center',
  headerTitleStyle: { fontWeight: '600', fontSize: 20 },
};

const homeOptions = {
  title: 'Bem-vindo ao Seu Agenda!',
};

const contatosOptions = {
  title: 'Gerenciador de Contatos',
};
