import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
} from 'react-native';
import api from '../IP';
import AwesomeAlert from 'react-native-awesome-alerts';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateAccountScreen({ navigation, route }) {
  const [productos, setProductos] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const mesaId = route.params?.mesa?.id || "mesa_default";

  useEffect(() => {
    api.get('/api/producto')
      .then(res => setProductos(res.data))
      .catch(err => console.error("Error al cargar productos", err));
  }, []);

  const toggleProducto = (producto) => {
    const existe = seleccionados.find(p => p.id === producto.id);
    if (existe) {
      setSeleccionados(seleccionados.filter(p => p.id !== producto.id));
    } else {
      setSeleccionados([...seleccionados, producto]);
    }
  };

  const confirmarOrden = async () => {
    if (seleccionados.length === 0) {
      alert("Selecciona al menos un platillo");
      return;
    }

    setShowAlert(true);
  };

  const enviarOrden = async () => {
    const orden = {
      mesaId: { id: mesaId },
      productos: seleccionados.map(p => ({ id: p.id }))
    };

    try {
      await api.post('/api/orden', orden);
      setShowAlert(false);
      navigation.navigate('ConfirmAccount', { seleccionados });
    } catch (error) {
      console.error("Error al guardar orden", error);
      alert("No se pudo guardar la orden");
    }
  };

  const total = seleccionados.reduce((acc, p) => Number(acc) + (Number(p.precio) || 0), 0);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, seleccionados.some(p => p.id === item.id) && styles.itemSelected]}
      onPress={() => toggleProducto(item)}
    >
      <Text style={styles.itemText}>{item.nombre}</Text>
      <Text style={styles.itemPrice}>${Number(item.precio || '0.00').toFixed(2)} MXN</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Selecciona los platillos</Text>
      <FlatList
        data={productos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <Text style={styles.total}>Total: ${Number(total).toFixed(2)} MXN</Text>

      <TouchableOpacity style={styles.button} onPress={confirmarOrden}>
        <Text style={styles.buttonText}>Confirmar orden</Text>
      </TouchableOpacity>

      <AwesomeAlert
        show={showAlert}
        showCancelButton={true}
        showConfirmButton={true}
        title="¿Estás seguro?"
        message="¿Deseas confirmar la orden?"
        confirmText="Sí"
        cancelText="No"
        confirmButtonColor="#9B1C31"
        cancelButtonColor="#999"
        onCancelPressed={() => setShowAlert(false)}
        onConfirmPressed={enviarOrden}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  item: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#EEE',
    borderRadius: 6
  },
  itemSelected: {
    backgroundColor: '#9B1C31'
  },
  itemText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16
  },
  itemPrice: {
    color: '#333',
    fontSize: 14,
    marginTop: 4
  },
  total: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#9B1C31'
  },
  button: {
    backgroundColor: '#9B1C31',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center'
  },
  buttonText: { color: '#FFF', fontWeight: 'bold' }
});
