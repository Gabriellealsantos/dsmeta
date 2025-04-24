import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Header from '../Header';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/RootStackParamList';
import { formatDate, formatPriece } from '../../utils/helpers';
import { SaleDTO } from '../../types/SaleDTO';
import { fetchSales } from '../../services/sale-service';

interface Venda {
  id: number;
  data: Date;
  vendedor: string;
  visitas: number;
  vendas: number;
  total: number;
}

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'VendasList'>;

export default function VendasList() {
  const navigation = useNavigation<NavigationProps>();

  const [vendas, setVendas] = useState<Venda[]>([]);
  const [error, setError] = useState('');

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    loadSales(0);
  }, []);

  const loadSales = async (pageNumber = 0) => {
    // não carrega se não houver mais ou já estiver carregando páginas extras
    if ((!hasMore && pageNumber !== 0) || loadingMore) return;

    try {
      if (pageNumber === 0) {
        setInitialLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await fetchSales(pageNumber);
      const salesData = response.data.content.map((sale: SaleDTO) => ({
        id: sale.id,
        data: new Date(sale.date),
        vendedor: sale.sellerName,
        visitas: sale.visited,
        vendas: sale.deals,
        total: sale.amount
      }));

      if (pageNumber === 0) {
        setVendas(salesData);
      } else {
        setVendas(prev => [...prev, ...salesData]);
      }

      setHasMore(!response.data.last);
      setPage(pageNumber);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar vendas');
    } finally {
      setInitialLoading(false);
      setLoadingMore(false);
    }
  };

  // Splash inicial
  if (initialLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5A189A" />
      </View>
    );
  }

  // Erro
  if (error) {
    return (
      <View style={styles.container}>
        <Header title="Vendas" showBackButton />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Venda }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => navigation.navigate('VendaDetail', { vendaId: item.id })}
    >
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{formatDate(item.data)}</Text>
      <Text style={styles.cell}>{item.vendedor}</Text>
      <Text style={styles.cell}>{item.vendas}</Text>
      <Text style={styles.cell}>{formatPriece(item.total)}</Text>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={[styles.row, styles.headerRow]}>
      <Text style={styles.headerCell}>ID</Text>
      <Text style={styles.headerCell}>Data</Text>
      <Text style={styles.headerCell}>Vendedor</Text>
      <Text style={styles.headerCell}>Vendas</Text>
      <Text style={styles.headerCell}>Total</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Vendas" showBackButton />

      <FlatList
        data={vendas}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        onEndReached={() => loadSales(page + 1)}
        onEndReachedThreshold={0.10}
        ListFooterComponent={
          loadingMore
            ? <ActivityIndicator style={{ marginVertical: 16 }} color="#fff" />
            : null
        }
      />
    </View>
  );
}

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
