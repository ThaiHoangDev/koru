import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@Screens/home/HomeScreen';

const Stack = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName="Home" >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};
