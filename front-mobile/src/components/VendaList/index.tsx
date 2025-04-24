import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Header from '../Header';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/RootStackParamList';
import { formatDate, formatPriece } from '../../utils/helpers';
import { SaleDTO } from '../../types/SaleDTO';
import { fetchSales } from '../../services/sale-service';

// Interface representando uma venda que será exibida na lista
interface Venda {
  id: number;
  data: Date;
  vendedor: string;
  visitas: number;
  vendas: number;
  total: number;
}

// Tipo da prop de navegação usada na tela
type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'VendasList'>;

export default function VendasList() {
  const navigation = useNavigation<NavigationProps>();

  // Estado que guarda a lista de vendas
  const [vendas, setVendas] = useState<Venda[]>([]);

  // Estado para controlar o carregamento (loading)
  const [loading, setLoading] = useState(true);

  // Estado para controlar se houve erro
  const [error, setError] = useState('');

  // useEffect é executado uma vez quando o componente é montado
  useEffect(() => {
    loadSales();
  }, []);

  // Função que busca as vendas na API e atualiza os estados
  const loadSales = async () => {
    try {
      const response = await fetchSales(); // Chamada para API
      const salesData = response.data.content.map((sale: SaleDTO) => ({
        id: sale.id,
        data: new Date(sale.date),
        vendedor: sale.sellerName,
        visitas: sale.visited,
        vendas: sale.deals,
        total: sale.amount
      }));
      setVendas(salesData); // Atualiza a lista com os dados da API
    } catch (err) {
      setError('Erro ao carregar vendas'); // Se der erro, atualiza o estado de erro
      console.error(err);
    } finally {
      setLoading(false); // Finaliza o loading em qualquer situação
    }
  };

  // Função que renderiza cada item da lista
  const renderItem = ({ item }: { item: Venda }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => navigation.navigate('VendaDetail', { vendaId: item.id })} // Navega para a tela de detalhes
    >
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{formatDate(item.data)}</Text>
      <Text style={styles.cell}>{item.vendedor}</Text>
      <Text style={styles.cell}>{item.vendas}</Text>
      <Text style={styles.cell}>{formatPriece(item.total)}</Text>
    </TouchableOpacity>
  );

  // Exibe o indicador de carregamento enquanto os dados estão sendo buscados
  if (loading) return <Loading />;

  // Exibe mensagem de erro caso tenha falhado ao buscar os dados
  if (error) return <Error message={error} />;

  return (
    <View style={styles.container}>
      <Header title="Vendas" showBackButton />

      {/* FlatList para exibir os dados em lista vertical */}
      <FlatList
        data={vendas} // Lista de dados
        keyExtractor={(item) => item.id.toString()} // Gera chave única
        renderItem={renderItem} // Função que renderiza cada item
        ListHeaderComponent={
          // Cabeçalho da tabela
          <View style={[styles.row, styles.headerRow]}>
            <Text style={styles.headerCell}>ID</Text>
            <Text style={styles.headerCell}>Data</Text>
            <Text style={styles.headerCell}>Vendedor</Text>
            <Text style={styles.headerCell}>Vendas</Text>
            <Text style={styles.headerCell}>Total</Text>
          </View>
        }
      />
    </View>
  );
}

// Componente para mostrar carregando (loading)
function Loading() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#5A189A" />
    </View>
  );
}

// Componente que mostra erro caso a requisição falhe
function Error({ message }: { message: string }) {
  return (
    <View style={styles.container}>
      <Header title="Vendas" showBackButton />
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
}

// Estilização usando StyleSheet
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: '#2A0944',
    marginHorizontal: 10,
    marginVertical: 4,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    justifyContent: 'center',
  },
  headerRow: {
    backgroundColor: '#3B185F',
  },
  cell: {
    flex: 1,
    fontSize: 13,
    color: '#F3E8FF',
    textAlign: 'center',
    flexShrink: 1,
  },
  headerCell: {
    flex: 1,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
});
