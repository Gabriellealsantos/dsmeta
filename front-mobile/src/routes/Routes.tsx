import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../components/Home";
import VendaDetail from "../components/VendaDetail";
import VendasList from "../components/VendaList";

// Cria a instância do Stack Navigator
const Stack = createStackNavigator<{
  Home: undefined;
  VendasList: undefined;
  VendaDetail: { vendaId: number };
}>();

export default function Routes() {
  return (
    // Envolve toda a navegação do app
    <NavigationContainer>
      {/* Define o Stack Navigator */}
      <Stack.Navigator
        screenOptions={{
          // Estilo padrão para cada tela (cartão branco)
          cardStyle: { backgroundColor: "#FFF" },
          // Desativa o header padrão, já que usamos nosso próprio <Header />
          headerShown: false,
        }}
      >
        {/* Cada Stack.Screen mapeia uma rota para um componente */}
        <Stack.Screen
          name="Home"        // Nome da rota (usado no navigate)
          component={Home}   // Componente que será renderizado
        />
        <Stack.Screen
          name="VendasList"
          component={VendasList}
        />
        <Stack.Screen
          name="VendaDetail"
          component={VendaDetail}
          // Se a tela VendaDetail espera um parâmetro, 
          // já está tipado lá em RootStackParamList
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
