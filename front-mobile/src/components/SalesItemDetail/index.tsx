import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import * as saleService from '../../services/sale-service';
import { RootStackParamList } from '../../types/RootStackParamList';
import { formatDate, formatPriece } from '../../utils/helpers';
import Header from '../Header';
import { SaleDTO } from '../../types/SaleDTO';

type SalesItemDetailRouteProp = RouteProp<RootStackParamList, 'SalesItemDetail'>;

export default function SalesItemDetail() {

  const route = useRoute<SalesItemDetailRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { sale } = route.params;
  const [currentSale, setCurrentSale] = useState(route.params.sale);

   // 2) useEffect que escuta mudanças em route.params.sale
   useEffect(() => {
    if (route.params.sale !== currentSale) {
      setCurrentSale(route.params.sale);
    }
  }, [route.params.sale]);
  

  const handleSendSMS = async () => {
    try {
      await saleService.sendNotificationRequest(sale.id);
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'SMS enviado com sucesso!',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Falha ao enviar SMS.',
      });
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirmar deleção',
      'Tem certeza que deseja deletar esta venda?',
      [
        {
          text: 'Cancelar',
          onPress: () => {
            Toast.show({
              type: 'info',
              text1: 'Ação cancelada',
              text2: 'A venda não foi deletada.',
            });
          },
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            try {
              await saleService.deleteById(sale.id);
              Toast.show({
                type: 'success',
                text1: 'Deletado',
                text2: 'Venda deletada com sucesso!',
              });
              navigation.goBack();
            } catch (error) {
              Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Não foi possível deletar a venda.',
              });
            }
          },
        },], { cancelable: false });
  };

  

  const handleEdit = () => {
    navigation.navigate('SalesEdit', {
      sale: currentSale,
      onSave: (updated) => setCurrentSale(updated)
    });
  };

  return (
    <>
      <Header title="Vendas" showBackButton />
      <View style={styles.container}>
        <View style={styles.detailBox}>
          <Text style={styles.label}>
            ID: <Text style={styles.value}>{currentSale.id}</Text>
          </Text>
          <Text style={styles.label}>
            Data: <Text style={styles.value}>{formatDate(currentSale.date)}</Text>
          </Text>
          <Text style={styles.label}>
            Vendedor: <Text style={styles.value}>{currentSale.sellerName}</Text>
          </Text>
          <Text style={styles.label}>
            Qtde Negócios: <Text style={styles.value}>{currentSale.deals}</Text>
          </Text>
          <Text style={styles.label}>
            Valor Total: <Text style={styles.value}>{formatPriece(currentSale.amount)}</Text>
          </Text>
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