import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CheckoutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Aquí podrías mostrar un resumen del pedido antes de pagar.</Text>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18 },
});
