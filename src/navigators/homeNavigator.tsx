import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@Screens/home/HomeScreen';

export type HomeStackParamList = {
  HomeScreen: undefined;
  Paring: undefined;
};

const Stack = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true, presentation: 'transparentModal' }}
      initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};
