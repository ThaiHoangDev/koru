import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '@Screens/LoginScreen';
import SignUpScreen from '@Screens/SignUpScreen';
import StartScreen from '@Screens/StartScreen';
import FastSignUpScreen from '@Screens/FastSignUpScreen';
import LetGoScreen from '@Screens/LetGoScreen';
import PasswordScreen from '@Screens/PasswordScreen';
import EmailScreen from '@Screens/EmailScreen';
import TopNavigationBar from '@Navigators/topNavigation';

const Stack = createStackNavigator();
const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        presentation: 'transparentModal',
        header: p => <TopNavigationBar {...p} children />,
      }}
      initialRouteName="Start">
      <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LetGo" component={LetGoScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="FastSignUp" component={FastSignUpScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Password" component={PasswordScreen} />
      <Stack.Screen name="Email" component={EmailScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
