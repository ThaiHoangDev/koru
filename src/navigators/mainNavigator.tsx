import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabNavigator } from './bottomNavigator';
import { ParingNavigator } from './paringNavigator';
import { useRoute } from '@react-navigation/native';

import PlantDetail from '@Screens/home/PlantDetail';

export type MainStackParamList = {
  TabBar: undefined;
  Paring: undefined;
  PlantDetail: undefined;
};

const MainStack = createStackNavigator();
const MainNavigator = () => {
  const route: any = useRoute();

  return (
    <MainStack.Navigator initialRouteName={route?.params?.screen || 'TabBar'}>
      <MainStack.Screen
        name="Paring"
        component={ParingNavigator}
        options={{ headerShown: false, presentation: 'card' }}
      />
      <MainStack.Screen name="TabBar" component={BottomTabNavigator} options={{ headerShown: false }} />
      <MainStack.Screen name="PlantDetail" component={PlantDetail} options={{ headerShown: true }} />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
