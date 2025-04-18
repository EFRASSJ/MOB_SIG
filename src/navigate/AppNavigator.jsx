import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';

// Screens
import LoginScreen from '../screens/LoginScreen';

import CreateAccountScreen from '../screens/CreateAccountScreen';
import ConfirmAccount from "../screens/ConfirmAccount";
import CheckoutScreen from "../screens/CheckoutScreen";
import ReviewQRCodeScreen from "../screens/ReviewQRCodeScreen";
import TablesScreen from '../screens/TablesScreeen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#9B1C31" />
      <Stack.Navigator screenOptions={{ headerTitle: "", headerShown: false }}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
            statusBarStyle: 'light-content',
            statusBarBackgroundColor: '#9B1C31',
          }}
        />
        <Stack.Screen
          name="TablesScreen"
          component={TablesScreen}
          options={{
            headerShown: false,
            statusBarStyle: 'light-content',
            statusBarBackgroundColor: '#9B1C31',
          }}
        />
        <Stack.Screen
          name="CreateAccountScreen"
          component={CreateAccountScreen}
          options={{
            headerShown: false,
            statusBarStyle: 'dark-content',
            statusBarBackgroundColor: '#FFF',
          }}
        />
        <Stack.Screen
          name="ConfirmAccount"
          component={ConfirmAccount}
          options={{
            headerShown: false,
            statusBarStyle: 'dark-content',
            statusBarBackgroundColor: '#FFF',
          }}
        />
        <Stack.Screen
          name="CheckoutScreen"
          component={CheckoutScreen}
          options={{
            headerShown: false,
            statusBarStyle: 'dark-content',
            statusBarBackgroundColor: '#FFF',
          }}
        />
        <Stack.Screen
          name="ReviewQRCodeScreen"
          component={ReviewQRCodeScreen}
          options={{
            headerShown: false,
            statusBarStyle: 'dark-content',
            statusBarBackgroundColor: '#FFF',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
