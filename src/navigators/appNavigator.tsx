import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '@Screens/SplashScreen';
import MainNavigator from '@Navigators/mainNavigator';
import AuthNavigator from '@Navigators/authNavigator';
import { makeSelectIsInitializing, makeSelectIsLoggedIn } from '@Containers/App/store/selectors';

const Stack = createStackNavigator();

interface Props {
  isInitializing: boolean;
  isAuthenticated: boolean;
}

const AppNavigator = ({ isInitializing, isAuthenticated }: Props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <>
        {isInitializing ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : isAuthenticated ? (
          <Stack.Screen name="MainNavigator" component={MainNavigator} />
        ) : (
          <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
        )}
      </>
    </Stack.Navigator>
  );
};

const mapStateToProps = createStructuredSelector({
  isInitializing: makeSelectIsInitializing(),
  isAuthenticated: makeSelectIsLoggedIn(),
});

const withConnect = connect(mapStateToProps);

export default withConnect(AppNavigator);
