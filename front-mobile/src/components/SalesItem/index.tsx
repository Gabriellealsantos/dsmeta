import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { formatDate, formatPriece } from '../../utils/helpers';
import { SaleDTO } from '../../types/SaleDTO';

interface Props {
  sale: SaleDTO;
  onPress: () => void;
}

export default function SalesItem({ sale, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <Text style={styles.cell}>{sale.id}</Text>
      <Text style={styles.cell}>{formatDate(sale.date)}</Text>
      <Text style={styles.cell}>{sale.sellerName}</Text>
      <Text style={styles.cell}>{sale.deals}</Text>
      <Text style={styles.cell}>{formatPriece(sale.amount)}</Text>
    </TouchableOpacity>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    justifyContent: 'center',
  },
  cell: {
    flex: 1,
    fontSize: 13,
    color: '#F3E8FF',
    textAlign: 'center',
    flexShrink: 1,
  },
});
