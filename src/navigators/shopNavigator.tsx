import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ShopScreen from '@Screens/shop/ShopScreen';

const Stack = createStackNavigator();

export const ShopNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ShopScreen">
      <Stack.Screen name="ShopScreen" component={ShopScreen} />
    </Stack.Navigator>
  );
};
