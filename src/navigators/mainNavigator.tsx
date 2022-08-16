import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { BottomTabNavigator } from './bottomNavigator';

const MainStack = createStackNavigator();

const MainNavigator = () => {
  return (
    <MainStack.Navigator initialRouteName="TabBar" >
      <MainStack.Screen name="TabBar" component={BottomTabNavigator} />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
