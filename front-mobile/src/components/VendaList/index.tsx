import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { fetchSales } from '../../services/sale-service';
import { RootStackParamList } from '../../types/RootStackParamList';
import { SaleDTO } from '../../types/SaleDTO';
import Header from '../Header';
import SalesFilter from '../SalesFilter';
import SalesList from '../SalesList';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'VendasList'>;

export default function VendasList() {
  const navigation = useNavigation<NavigationProps>();

  const [vendas, setVendas] = useState<SaleDTO[]>([]);
  const [error, setError] = useState('');

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [totalItems, setTotalItems] = useState(0);

  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setPage(0);
      setHasMore(true);
      loadSales(0);
    }, 500);

    return () => clearTimeout(delayDebounceFn); // limpa o timeout anterior
  }, [name]);

  const loadSales = async (pageNumber = 0) => {
    if (loadingMore || (pageNumber !== 0 && !hasMore)) return;

    try {
      if (pageNumber === 0 && vendas.length === 0) {
        setInitialLoading(true); // Só mostra splash se for a primeira carga de fato
      } else {
        setLoadingMore(true);
      }

      const response = await fetchSales({
        page: pageNumber,
        size: 10,
        minDate,
        maxDate,
        name
      });

      const salesData = response.data.content.map((sale: SaleDTO) => ({
        id: sale.id,
        sellerName: sale.sellerName,
        visited: sale.visited,
        deals: sale.deals,
        amount: sale.amount,
        date: new Date(sale.date),
      }));

      if (pageNumber === 0) {
        setVendas(salesData);
      } else {
        setVendas(prev => [...prev, ...salesData]);
      }

      setHasMore(!response.data.last); 
      setPage(pageNumber);
      setTotalItems(response.data.totalElements);
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

  const handleFilter = () => {
    setPage(0);
    setHasMore(true);
    loadSales(0);
  };

  return (
    <View style={styles.container}>
      <Header title="Vendas" showBackButton />

      <SalesFilter
        minDate={minDate}
        maxDate={maxDate}
        name={name}
        setMinDate={setMinDate}
        setMaxDate={setMaxDate}
        setName={setName}
        onFilter={handleFilter}
      />

      <SalesList
        sales={vendas}
        totalItems={totalItems}
        loadingMore={loadingMore}
        onEndReached={() => loadSales(page + 1)}
        onPressItem={(sale) => navigation.navigate('SalesItemDetail', { sale })}
      />

      {loadingMore && <ActivityIndicator style={{ marginVertical: 16 }} color="#fff" />}
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
  input: {
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 4,
    width: '100%',
  },
  button: {
    backgroundColor: '#5A189A',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  filterContainer: {
    paddingHorizontal: 10,
  },
  counterContainer: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#3B185F',
    marginHorizontal: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  counterText: {
    color: '#FFF',
    fontSize: 14,
  },
  allItemsText: {
    color: '#4CAF50',
    fontSize: 14,
    marginTop: 4,
  },
});
