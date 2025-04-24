import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types/RootStackParamList';
import Header from '../Header';

type VendaDetailRouteProp = RouteProp<RootStackParamList, 'VendaDetail'>;

export default function VendaDetail() {
  const route = useRoute<VendaDetailRouteProp>();
  const { vendaId } = route.params;

  // Aqui você buscaria os detalhes da venda usando o ID. Pode ser um find no MOCK ou chamada à API
  return (
    <View style={styles.container}>
      <Header title="Detalhes da Venda" showBackButton />
      <Text style={styles.text}>Detalhes da venda ID: {vendaId}</Text>
      {/* Exibir mais informações aqui futuramente */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
    padding: 20,
  },
  text: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 20,
  },
});
