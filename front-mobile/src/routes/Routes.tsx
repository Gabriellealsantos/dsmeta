import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../components/Home";
import SalesItemDetail from "../components/SalesItemDetail";
import VendasList from "../components/VendaList";
import { SaleDTO } from "../types/SaleDTO";
import SalesEdit from "../components/SalesEdit";
import { RootStackParamList } from "../types/RootStackParamList";

// Cria a instância do Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <NavigationContainer>
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
          name="SalesItemDetail"
          component={SalesItemDetail}
        // Se a tela VendaDetail espera um parâmetro, 
        // já está tipado lá em RootStackParamList
        />
         <Stack.Screen
          name="SalesEdit"
          component={SalesEdit}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
