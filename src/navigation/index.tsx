import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { CreateScreen } from '../screens/CreateScreen';
import { ProductsScreen } from '../screens/ProductsScreen';
import { ProductDetailsScreen } from '../screens/ProductDetailsScreen';
import { AdditionalDetailsScreen } from '../screens/AdditionalDetailsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Products"
        screenOptions={{
          headerShown: true,
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name="Products"
          component={ProductsScreen}
          options={{
            title: 'Digital Products',
          }}
        />
        <Stack.Screen
          name="Create"
          component={CreateScreen}
          options={{
            title: 'Create Product',
          }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{
            title: 'Product Details',
          }}
        />
        <Stack.Screen
          name="AdditionalDetails"
          component={AdditionalDetailsScreen}
          options={{
            title: 'Additional Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
