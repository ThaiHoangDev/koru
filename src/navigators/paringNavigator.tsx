import React from 'react';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import PairYourPot from '@Screens/paring/PairingScreen';
import Searching from '@Containers/Pairing/screens/Searching';
import ChooseYourWifi from '@Screens/paring/ChooseWifi';
import SelectBLTScreen from '@Screens/paring/SelectBLTScreen';
import ChoosePlant from '@Screens/paring/ChoosePlant';
import NamePlant from '@Screens/paring/NamePlant';
import TypePassword from '@Screens/paring/TypePassword';
import ConnectingWifi from '@Screens/paring/ConnectingWifi';

export type PairStackParamList = {
  ParingScreen: undefined;
  Searching: undefined;
  SelectBLT: undefined;
  ChooseWifi: undefined;
  ChoosePlant: undefined;
  NamePlant: undefined;
  TypePassword: undefined;
  ConnectingWifi: undefined;
};

const Stack = createStackNavigator<PairStackParamList>();

export const ParingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, presentation: 'transparentModal' }}
      initialRouteName="ParingScreen">
      <Stack.Screen name="ParingScreen" component={PairYourPot} options={{ headerShown: true }} />
      {/* <Stack.Screen name="Searching" component={Searching} /> */}
      <Stack.Screen name="SelectBLT" component={SelectBLTScreen} options={{ headerShown: true }} />
      <Stack.Screen
        name="ChooseWifi"
        component={ChooseYourWifi}
        options={{ headerShown: true, presentation: 'transparentModal' }}
      />
      <Stack.Screen name="ChoosePlant" component={ChoosePlant} options={{ headerShown: true, presentation: 'card' }} />
      <Stack.Screen name="NamePlant" component={NamePlant} options={{ headerShown: true, presentation: 'card' }} />
      <Stack.Screen
        name="TypePassword"
        component={TypePassword}
        options={{ headerShown: true, presentation: 'card' }}
      />
      <Stack.Screen
        name="ConnectingWifi"
        component={ConnectingWifi}
        options={{ headerShown: false, presentation: 'transparentModal' }}
      />
    </Stack.Navigator>
  );
};
