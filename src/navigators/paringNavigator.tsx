import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PairYourPot from '@Screens/paring/PairingScreen';
import Searching from '@Containers/Pairing/screens/Searching';
import ChooseYourWifi from '@Screens/paring/ChooseWifi';
import SelectBLTScreen from '@Screens/paring/SelectBLTScreen';
import ChoosePlant from '@Screens/paring/ChoosePlant';
import NamePlant from '@Screens/paring/NamePlant';
import TypePassword from '@Screens/paring/TypePassword';
import ConnectingWifi from '@Screens/paring/ConnectingWifi';

const Stack = createStackNavigator();

export const ParingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, presentation: 'transparentModal' }} initialRouteName="Paring">
      <Stack.Screen name="Paring" component={PairYourPot} options={{ headerShown: true }} />
      <Stack.Screen name="Searching" component={Searching} />
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
