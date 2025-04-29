// components/SalesList.tsx
import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import SalesItem from '../SalesItem/index';
import { SaleDTO } from '../../types/SaleDTO';

type Props = {
  sales: SaleDTO[];
  totalItems: number;
  loadingMore: boolean;
  onEndReached: () => void;
  onPressItem: (id: number) => void;
};

export default function SalesList({ sales, totalItems, loadingMore, onEndReached, onPressItem }: Props) {
  const renderItem = ({ item }: { item: SaleDTO }) => (
    <SalesItem sale={item} onPress={() => onPressItem(item.id)} />
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
    <>
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>
          Mostrando {sales.length} de {totalItems} itens
        </Text>
        {sales.length >= totalItems && (
          <Text style={styles.allItemsText}>Todos os itens foram carregados</Text>
        )}
      </View>

      <FlatList
        data={sales}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loadingMore ? <ActivityIndicator style={{ marginVertical: 16 }} color="#fff" /> : null}
      />
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: '#2A0944',
    marginHorizontal: 10,
    marginVertical: 4,
    borderRadius: 10,
    justifyContent: 'center',
  },
  headerRow: {
    backgroundColor: '#3B185F',
  },
  headerCell: {
    flex: 1,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
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
