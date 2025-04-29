import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Props = {
    minDate: string;
    maxDate: string;
    name: string;
    setMinDate: (date: string) => void;
    setMaxDate: (date: string) => void;
    setName: (name: string) => void;
    onFilter: () => void;
};

export default function SalesFilter({
    minDate,
    maxDate,
    name,
    setMinDate,
    setMaxDate,
    setName,
    onFilter,
}: Props) {
    const [showMinDatePicker, setShowMinDatePicker] = useState(false);
    const [showMaxDatePicker, setShowMaxDatePicker] = useState(false);

    function handleDateChange(
        event: DateTimePickerEvent,
        selectedDate: Date | undefined,
        setter: (date: string) => void,
        setShow: (value: boolean) => void
    ) {
        setShow(Platform.OS === 'ios');
        if (selectedDate) {
            const formatted = selectedDate.toISOString().split('T')[0];
            setter(formatted);
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setShowMinDatePicker(true)} style={styles.input}>
                <Text style={{ color: '#000' }}>{minDate || 'Data inicial (YYYY-MM-DD)'}</Text>
            </TouchableOpacity>
            {showMinDatePicker && (
                <DateTimePicker
                    value={minDate ? new Date(minDate) : new Date()}
                    mode="date"
                    display="default"
                    onChange={(e, d) => handleDateChange(e, d, setMinDate, setShowMinDatePicker)}
                />
            )}

            <TouchableOpacity onPress={() => setShowMaxDatePicker(true)} style={styles.input}>
                <Text style={{ color: '#000' }}>{maxDate || 'Data final (YYYY-MM-DD)'}</Text>
            </TouchableOpacity>
            {showMaxDatePicker && (
                <DateTimePicker
                    value={maxDate ? new Date(maxDate) : new Date()}
                    mode="date"
                    display="default"
                    onChange={(e, d) => handleDateChange(e, d, setMaxDate, setShowMaxDatePicker)}
                />
            )}

            <TextInput
                placeholder="Nome do vendedor"
                placeholderTextColor="#000"
                style={styles.input}
                value={name}
                onChangeText={setName}
            />

            <TouchableOpacity onPress={onFilter} style={styles.button}>
                <Text style={styles.buttonText}>Filtrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
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
});
