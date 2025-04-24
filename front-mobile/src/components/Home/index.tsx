import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../types/RootStackParamList';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../Header';

// Define o tipo para a navegação da tela 'Home'
// Isso ajuda a ter autocomplete e segurança de tipo quando usamos o `navigate`
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

// Componente principal da tela Home
export default function Home() {
  // Hook para acessar o objeto de navegação tipado
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      {/* Cabeçalho da página, com título 'Home' */}
      <Header title='Home'/>
      
      {/* Conteúdo principal centralizado na tela */}
      <View style={styles.content}>
        
        {/* Botão com gradiente de fundo que leva para a lista de vendas */}
        <LinearGradient
          colors={['#2A0944', '#5A189A']} // Cores do gradiente
          style={[styles.button, styles.listButton]} // Aplica os estilos do botão
          start={{ x: 0, y: 0 }} // Início do gradiente (esquerda)
          end={{ x: 1, y: 0 }}   // Fim do gradiente (direita)
        >
          {/* Área tocável do botão */}
          <TouchableOpacity
            onPress={() => navigation.navigate('VendasList')} // Ação de navegação
            style={styles.touchableArea}
          >
            <Text style={styles.buttonText}>Listar Vendas</Text> {/* Texto do botão */}
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
}

// Estilos da tela Home
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda a tela
    backgroundColor: '#1A1A2E', // Cor de fundo escura
  },
  content: {
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
    padding: 20, // Espaçamento interno
  },
  button: {
    borderRadius: 12, // Cantos arredondados
    overflow: 'hidden', // Necessário para que o gradiente respeite o borderRadius
    marginVertical: 10, // Espaçamento vertical
    elevation: 4, // Sombra no Android
    shadowColor: '#000', // Cor da sombra (iOS)
    shadowOffset: { width: 0, height: 2 }, // Direção da sombra
    shadowOpacity: 0.4, // Opacidade da sombra
    shadowRadius: 4, // Desfoque da sombra
  },
  listButton: {
    width: '100%', // Ocupa toda a largura
    height: 60, // Altura maior para facilitar o toque
  },
  touchableArea: {
    flex: 1,
    justifyContent: 'center', // Centraliza o conteúdo
    alignItems: 'center',
    padding: 20, // Espaço interno
  },
  buttonText: {
    color: '#FFF', // Cor do texto
    fontSize: 18, // Tamanho do texto
    fontWeight: 'bold', // Negrito
  },
});
