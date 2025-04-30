import React from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { formatDate, formatPriece } from '../../utils/helpers';
import { SaleDTO } from '../../types/SaleDTO';
import axios from 'axios';
import Header from '../Header';

type RootStackParamList = {
  SalesItemDetail: { sale: SaleDTO };
};

type SalesItemDetailRouteProp = RouteProp<RootStackParamList, 'SalesItemDetail'>;

export default function SalesItemDetail() {

  const route = useRoute<SalesItemDetailRouteProp>();
  console.log('Route params:', route.params);
  const { sale } = route.params;

  const handleSendSMS = async () => {
    try {
      await axios.post(`http://SEU_BACKEND_URL/sms`, {
        saleId: sale.id,
      });
      Alert.alert('Sucesso', 'SMS enviado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao enviar SMS.');
    }
  };

  const handleEdit = () => {
    Alert.alert('Editar', 'Funcionalidade de edição ainda não implementada.');
  };

  const handleDelete = () => {
    Alert.alert('Deletar', 'Funcionalidade de deleção ainda não implementada.');
  };

  return (
    <>
      <Header title="Vendas" showBackButton />
      <View style={styles.container}>
        <View style={styles.detailBox}>
          <Text style={styles.label}>ID: <Text style={styles.value}>{sale.id}</Text></Text>
          <Text style={styles.label}>Data: <Text style={styles.value}>{formatDate(sale.date)}</Text></Text>
          <Text style={styles.label}>Vendedor: <Text style={styles.value}>{sale.sellerName}</Text></Text>
          <Text style={styles.label}>Qtde Negócios: <Text style={styles.value}>{sale.deals}</Text></Text>
          <Text style={styles.label}>Valor Total: <Text style={styles.value}>{formatPriece(sale.amount)}</Text></Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#FFA500' }]} onPress={handleEdit}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#FF4500' }]} onPress={handleDelete}>
            <Text style={styles.buttonText}>Deletar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#32CD32' }]} onPress={handleSendSMS}>
            <Text style={styles.buttonText}>Enviar SMS</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A0944',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F3E8FF',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailBox: {
    backgroundColor: '#3B185F',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    color: '#D7BFFF',
    marginBottom: 8,
  },
  value: {
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});