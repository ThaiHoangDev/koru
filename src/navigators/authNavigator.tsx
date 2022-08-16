import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '@Screens/LoginScreen';
import StartScreen from '@Screens/StartScreen';
import TopNavigationBar from '@Navigators/topNavigation';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Start" >
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ header: (props) => <TopNavigationBar {...props}/>, headerShown: true }} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
