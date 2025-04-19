import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Modal,
  StatusBar,
  Dimensions,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import api from '../IP';
import AwesomeAlert from 'react-native-awesome-alerts';

const { height } = Dimensions.get('window');

const TablesScreen = () => {
  const [mesaState, setMesaState] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    api.get('/api/mesa')
      .then(res => setMesaState(res.data))
      .catch(err => {
        console.error("Error al obtener mesas:", err);
        setAlertMessage('No se pudieron cargar las mesas');
        setAlertVisible(true);
      });
  }, []);

  const handlePressTable = (id) => {
    const table = mesaState.find(mesa => mesa.id === id);
    if (table.capacidad > 0) {
      setSelectedTable(table);
      setModalVisible(true);
    } else {
      setAlertMessage('Esta mesa no está habilitada.');
      setAlertVisible(true);
    }
  };

  const handleAddDishes = () => {
    setModalVisible(false);
    navigation.navigate('CreateAccountScreen', { mesa: selectedTable });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.tableItem, item.capacidad > 0 && styles.tableEnabled]}
      onPress={() => handlePressTable(item.id)}
    >
      <Image
        source={require('../../assets/mesa-de-comedor.png')}
        style={[styles.icon, item.capacidad > 0 && { tintColor: '#9B1C31' }]}
        resizeMode="contain"
      />
      <Text style={[styles.tableText, item.capacidad > 0 && { color: '#9B1C31' }]}>{item.mesa}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header title="Tus mesas" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <FlatList
          data={mesaState}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          scrollEnabled={false}
        />
      </ScrollView>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Opciones para {selectedTable?.mesa}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleAddDishes}>
              <Text style={styles.modalButtonText}>Agregar platillos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Sweet Alert (reemplazo) */}
      <AwesomeAlert
        show={alertVisible}
        title="Atención"
        message={alertMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => setAlertVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F5F5' },
  scroll: {
    minHeight: height,
    paddingBottom: 30
  },
  listContainer: {
    marginTop: -10,
    alignItems: 'center',
    paddingBottom: 20
  },
  tableItem: {
    width: 170,
    height: 170,
    backgroundColor: '#FFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 2,
    borderColor: '#DDD',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
  },
  tableEnabled: {
    borderColor: '#9B1C31',
    backgroundColor: '#F8E1E7',
  },
  icon: {
    width: 100,
    height: 100,
    tintColor: '#000',
  },
  tableText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  modalButton: {
    backgroundColor: '#9B1C31',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: { color: '#FFF', fontWeight: 'bold' },
  cancelButton: {
    backgroundColor: '#999',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  cancelButtonText: { color: '#FFF', fontWeight: 'bold' },
});

export default TablesScreen;
