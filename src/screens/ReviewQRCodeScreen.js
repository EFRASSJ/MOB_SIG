import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';

export default function ReviewQRCodeScreen({ route }) {
  const navigation = useNavigation();
  const mesaId = route.params?.mesaId || 'mesa_default';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gracias por tu compra 🎉</Text>
      <Text style={styles.text}>Escanea el código para dejar tu reseña</Text>
      <View style={styles.qrContainer}>
        <QRCode value={`https://mipagina.com/resena/${mesaId}`} size={200} />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TablesScreen')}>
        <Text style={styles.buttonText}>Volver al inicio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16, color: '#555', marginBottom: 20 },
  qrContainer: {
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 5,
  },
  button: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#9B1C31',
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
