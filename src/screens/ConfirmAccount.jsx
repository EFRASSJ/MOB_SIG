import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ConfirmAccount() {
  const route = useRoute();
  const navigation = useNavigation();
  const { seleccionados = [] } = route.params;

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.nombre}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Resumen de tu orden</Text>
      <FlatList
        data={seleccionados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No se seleccionaron platillos.</Text>}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ReviewQRCodeScreen', { mesaId: seleccionados[0]?.mesaId || "mesa_default" })}
      >
        <Text style={styles.buttonText}>Continuar a reseña (QR)</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  item: {
    backgroundColor: '#EEE',
    padding: 12,
    borderRadius: 6,
    marginVertical: 6
  },
  itemText: { fontSize: 16, color: '#333' },
  empty: { textAlign: 'center', marginTop: 20, color: '#777' },
  button: {
    backgroundColor: '#9B1C31',
    padding: 12,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold'
  }
});
