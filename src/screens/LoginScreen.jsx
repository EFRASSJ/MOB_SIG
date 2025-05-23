import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import LogoCompleto from '../../assets/LogoCompleto.png';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../IP';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor, ingrese su correo y contraseña.');
      return;
    }

    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });

      const token = response.data.token;
      if (token) {
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('userEmail', email);

        navigation.navigate('TablesScreen');
      } else {
        Alert.alert('Error', 'No se recibió un token válido.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'Credenciales inválidas o error de red.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={LogoCompleto} style={styles.logo} />

        <Text style={styles.label}>Correo:</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo"
          placeholderTextColor="#A0A0A0"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#A0A0A0"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9B1C31',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    width: '80%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#9B1C31',
    paddingVertical: 5,
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#9B1C31',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LoginScreen;
