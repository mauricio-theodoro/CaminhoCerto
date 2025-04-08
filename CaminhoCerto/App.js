import HomeView from './home/HomeView';
import ContatosView from './contatos/ContatosView';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={HomeView} />
        <Stack.Screen name="contatos" component={ContatosView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
