// src/navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LandingScreen from '../screens/LandingScreen';
import DishesScreen from '../screens/DishesScreen';
import ProductScreen from '../screens/ProductScreen';

const Stack = createStackNavigator();

const linking = {
  prefixes: ['http://localhost:8081'], // Use the appropriate URL for your local development
  config: {
    screens: {
      LandingScreen: '',
      ProductScreen: 'products',
      DishesScreen: 'dishes',
    },
  },
};

const AppNavigator = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="LandingScreen">
      <Stack.Screen
          name="LandingScreen"
          component={LandingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductScreen"
          component={ProductScreen}
          options={{ title: 'Ingredientes' }} // Adjust title if necessary
        />
        <Stack.Screen
          name="DishesScreen"
          component={DishesScreen}
          options={{ title: 'Menu' }} // Adjust title if necessary
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
