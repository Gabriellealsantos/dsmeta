import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';

interface HeaderProps {
    title: string;             
    showBackButton?: boolean;  
}


type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function Header({ title, showBackButton = false }: HeaderProps) {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    return (
        <LinearGradient
            colors={['#2A0944', '#5A189A']} 
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }} 
        >
            <View style={styles.headerContent}>
                {showBackButton && (
                    <TouchableOpacity 
                        style={styles.iconButton}
                        onPress={() => navigation.goBack()} 
                    >
                        <Ionicons name="arrow-back" size={24} color="#FFF" />
                    </TouchableOpacity>
                )}

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
        letterSpacing: 1.2, 
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1, 
    },
});