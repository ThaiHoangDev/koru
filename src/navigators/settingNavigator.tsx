import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingScreen from '@Screens/setting/SettingScreen';

export type SettingStackParamList = {
  SettingScreen: undefined;
};
const Stack = createStackNavigator<SettingStackParamList>();

export const SettingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SettingScreen">
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
    </Stack.Navigator>
  );
};
