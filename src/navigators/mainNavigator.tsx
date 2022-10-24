import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabNavigator } from './bottomNavigator';
import { ParingNavigator } from './paringNavigator';
import { useRoute } from '@react-navigation/native';

const MainStack = createStackNavigator();

const MainNavigator = () => {
  const route: any = useRoute();

  return (
    <MainStack.Navigator initialRouteName={route.params?.screen}>
      <MainStack.Screen
        name="Paring"
        component={ParingNavigator}
        options={{ headerShown: false, presentation: 'card' }}
      />
      <MainStack.Screen name="TabBar" component={BottomTabNavigator} options={{ headerShown: false }} />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
