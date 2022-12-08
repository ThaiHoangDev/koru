import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '@Screens/SplashScreen';
import MainNavigator from '@Navigators/mainNavigator';
import AuthNavigator from '@Navigators/authNavigator';
import { makeSelectIsInitializing, makeSelectIsLoggedIn, makeSelectIsSkipIntro } from '@Containers/App/store/selectors';
import Message from '@Containers/Message';

export type RootStackParamList = {
  Splash: undefined;
  MainNavigator: { screen: string } | undefined;
  AuthNavigator: undefined;
  MessageAlert:
    | { visible: boolean; title: string; txtCancle?: string; txtOK: string; callBack?: () => void }
    | undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

interface Props {
  isInitializing: boolean;
  isAuthenticated: boolean;
  isSkipIntro: boolean;
}

const AppNavigator = ({ isInitializing, isAuthenticated, isSkipIntro }: Props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, presentation: 'transparentModal' }}>
      {isInitializing ? (
        <Stack.Screen name="Splash" component={SplashScreen} />
      ) : isAuthenticated ? (
        <Stack.Screen
          name="MainNavigator"
          component={MainNavigator}
          initialParams={{ screen: isSkipIntro && isAuthenticated ? 'Paring' : 'TabBar' }}
        />
      ) : (
        <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
      )}
      <Stack.Screen
        name="MessageAlert"
        component={Message}
        options={{ headerShown: false, presentation: 'transparentModal' }}
      />
    </Stack.Navigator>
  );
};

const mapStateToProps = createStructuredSelector({
  isInitializing: makeSelectIsInitializing(),
  isAuthenticated: makeSelectIsLoggedIn(),
  isSkipIntro: makeSelectIsSkipIntro(),
});

export default connect(mapStateToProps)(AppNavigator);
