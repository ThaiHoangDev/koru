import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@Screens/home/HomeScreen';
// import PlantDetail from '@Screens/home/PlantDetail';

export type HomeStackParamList = {
  HomeScreen: undefined;
  Paring: undefined;
  PlantDetail: undefined;
  FanSpeedScreen: undefined;
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
