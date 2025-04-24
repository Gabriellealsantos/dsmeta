import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';

// Interface para definir as propriedades que o Header pode receber
interface HeaderProps {
    title: string;              // Título a ser exibido no cabeçalho
    showBackButton?: boolean;  // Indica se o botão de voltar deve ser mostrado (opcional)
}

// Tipagem para navegação na tela Home (usada no botão de voltar)
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

// Componente funcional Header
export default function Header({ title, showBackButton = false }: HeaderProps) {
    // Hook que retorna o objeto de navegação tipado
    const navigation = useNavigation<HomeScreenNavigationProp>();

    return (
        // Gradiente como fundo do header
        <LinearGradient
            colors={['#2A0944', '#5A189A']} // Cores do gradiente
            style={styles.container}
            start={{ x: 0, y: 0 }} // Começo do gradiente
            end={{ x: 1, y: 0 }}   // Fim do gradiente
        >
            <View style={styles.headerContent}>
                {/* Renderiza o botão de voltar se showBackButton for true */}
                {showBackButton && (
                    <TouchableOpacity 
                        style={styles.iconButton}
                        onPress={() => navigation.goBack()} // Volta para a tela anterior
                    >
                        <Ionicons name="arrow-back" size={24} color="#FFF" />
                    </TouchableOpacity>
                )}

                {/* Centraliza o título no header */}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </View>
        </LinearGradient>
    );
}

// Estilos do cabeçalho
const styles = StyleSheet.create({
    container: {
        height: 90,        // Altura total do header
        paddingTop: 30,    // Padding para não encostar na borda superior (status bar)
    },
    headerContent: {
        flex: 1,
        flexDirection: 'row',      // Alinha os itens na horizontal
        alignItems: 'center',      // Centraliza verticalmente
        paddingHorizontal: 20,     // Padding lateral
    },
    titleContainer: {
        position: 'absolute',      // Posição absoluta para centralizar o título
        left: 0,
        right: 0,
        top: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#FFF',
        letterSpacing: 1.2, // Espaçamento entre letras
        textShadowColor: 'rgba(0, 0, 0, 0.3)', // Sombra leve para o texto
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20, // Botão circular
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Fundo levemente visível
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1, // Garante que o botão fique acima do título centralizado
    },
});
