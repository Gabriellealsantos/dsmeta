import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import * as saleService from '../../services/sale-service';
import { RootStackParamList } from '../../types/RootStackParamList';
import Header from '../Header';
import { SaleDTO } from '../../types/SaleDTO';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'SalesEdit'>;

type EditSaleRouteProp = RouteProp<RootStackParamList, 'SalesEdit'> & {
    params: {
      sale: SaleDTO;
      onSave?: (u: SaleDTO) => void;
    };
  };

export default function SalesEdit() {
    const route = useRoute<EditSaleRouteProp>();
    const navigation = useNavigation<NavigationProps>();
    const { sale, onSave } = route.params;

    const [sellerName, setSellerName] = useState(sale.sellerName);
    const [deals, setDeals] = useState(String(sale.deals));
    const [amount, setAmount] = useState(String(sale.amount));

    const handleSave = async () => {
        try {
            const updatedSale = {
                ...sale,
                sellerName,
                deals: Number(deals),
                amount: Number(amount),
            };

            await saleService.updateRequest(updatedSale);

            onSave && onSave(updatedSale);

            // Mostrar Toast de Sucesso
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Venda atualizada com sucesso!',
                visibilityTime: 3000,
                autoHide: true,
            });

            // Atualizar os parâmetros da tela anterior
            navigation.setParams({ sale: updatedSale });

            // Atualizar a página anterior ao voltar
            navigation.goBack();
        } catch (error) {
            // Mostrar Toast de Erro
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Erro ao atualizar a venda!',
                visibilityTime: 3000,
                autoHide: true,
            });
        }
    };

    const handleCancel = () => {
        navigation.goBack(); // Voltar sem salvar
    };

    return (
        <>
            <Header title="Editar" showBackButton />
            <View style={styles.container}>
                <TextInput
                    value={sellerName}
                    onChangeText={setSellerName}
                    style={styles.input}
                    placeholder="Nome do vendedor"
                />
                <TextInput
                    value={deals}
                    onChangeText={setDeals}
                    style={styles.input}
                    placeholder="Negócios"
                    keyboardType="numeric"
                />
                <TextInput
                    value={amount}
                    onChangeText={setAmount}
                    style={styles.input}
                    placeholder="Valor"
                    keyboardType="numeric"
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#32CD32' }]} onPress={handleSave}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#FF4500' }]} onPress={handleCancel}>
                        <Text style={styles.buttonText}>Cancelar</Text>
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
    input: {
        backgroundColor: '#FFF',
        marginBottom: 15,
        padding: 10,
        borderRadius: 8,
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
