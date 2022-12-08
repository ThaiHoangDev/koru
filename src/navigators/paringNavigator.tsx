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
      <Stack.Screen
        name="ParingScreen"
        component={(props: any) => <PairYourPot {...props} />}
        options={{ headerShown: true }}
      />
      <Stack.Screen name="Searching" component={(props: any) => <Searching {...props} />} />
      <Stack.Screen
        name="SelectBLT"
        component={(props: any) => <SelectBLTScreen {...props} />}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="ChooseWifi"
        component={(props: any) => <ChooseYourWifi {...props} />}
        options={{ headerShown: true, presentation: 'transparentModal' }}
      />
      <Stack.Screen
        name="ChoosePlant"
        component={(props: any) => <ChoosePlant {...props} />}
        options={{ headerShown: true, presentation: 'card' }}
      />
      <Stack.Screen
        name="NamePlant"
        component={(props: any) => <NamePlant {...props} />}
        options={{ headerShown: true, presentation: 'card' }}
      />
      <Stack.Screen
        name="TypePassword"
        component={(props: any) => <TypePassword {...props} />}
        options={{ headerShown: true, presentation: 'card' }}
      />
      <Stack.Screen
        name="ConnectingWifi"
        component={(props: any) => <ConnectingWifi {...props} />}
        options={{ headerShown: false, presentation: 'transparentModal' }}
      />
    </Stack.Navigator>
  );
};
