import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '@Screens/LoginScreen';
import StartScreen from '@Screens/StartScreen';
import FastSignUpScreen from '@Screens/FastSignUpScreen';
import LetGoScreen from '@Screens/LetGoScreen';
import EmailScreen from '@Screens/EmailScreen';
import VerifyEmailScreen from '@Screens/VerifyEmailScreen';
import TopNavigationBar from '@Navigators/topNavigation';
import IntroScreen from '@Screens/IntroScreen';
import { colors } from '@Theme/index';

const Stack = createStackNavigator();
const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        presentation: 'transparentModal',
        header: p => <TopNavigationBar {...p} stylesTop={{ backgroundColor: colors.white2 }} isLeft />,
      }}
      initialRouteName="Start">
      <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LetGo" component={LetGoScreen} />
      <Stack.Screen name="Email" component={EmailScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="FastSignUp" component={FastSignUpScreen} />
      <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false, presentation: 'card' }} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
