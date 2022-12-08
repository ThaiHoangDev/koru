import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@Screens/home/HomeScreen';
import { PlantProps } from '@Containers/Home/store/interfaces';

export type HomeStackParamList = {
  HomeScreen: undefined;
  Paring: { screen: 'NamePlant' } | undefined;
  PlantDetail: { uuid: string } | undefined;
  FanSpeedScreen: { plant?: PlantProps } | undefined;
  SoilDetailScreen: { plant?: PlantProps } | undefined;
  EditPlantInfo: { currentPlant: PlantProps } | undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true, presentation: 'transparentModal' }}
      initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};
