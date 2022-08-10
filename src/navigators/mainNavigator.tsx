import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Text } from 'react-native';

const MainStack = createStackNavigator();

const MainNavigator = () => {
  return (
    <MainStack.Navigator initialRouteName="Dashboard" >
      <MainStack.Screen name="Dashboard" component={() => <Text>Dashboard</Text>}/>
    </MainStack.Navigator>
  );
};

export default MainNavigator;
