import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

// utils
import { LginType, LoginPayload } from '@Containers/Auth/interfaces';
import { AuthActions } from '@Containers/Auth/store/actions';
// components by self
import TopNavigationBar from '@Navigators/topNavigation';
import { FormComp } from '@Containers/Auth/components/formComp';
// assets
import styles from './styles';
import { colors } from '@Theme/index';
import { loginValidationSchema } from '@Containers/Auth/schema';

const LOGIN_KEY = [
  { lable: 'Email', element: 'Johnde@example.com', type: 'email-address', value: 'email' },
  { lable: 'Password', element: 'Your password', type: 'default', value: 'password' },
];
const SIGNUP_KEY = [
  { lable: 'Full Name', element: 'Peter', type: 'default', value: 'username' },
  { lable: 'Email', element: 'Johnde@example.com', type: 'email-address', value: 'email' },
  { lable: 'Password', element: 'Your password', type: 'default', value: 'password' },
];
const initialValuesLogin: LoginPayload = {
  email: '',
  password: '',
};
const initialValuesSignUp: LoginPayload = {
  username: '',
  email: '',
  password: '',
};

const LoginContainer = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: (p: any) => (
        <TopNavigationBar
          {...p}
          stylesTop={{ backgroundColor: colors.white }}
          isLeft={true}
          children={
            <Text style={styles.titleTab}>{route.params.isLogin ? 'Wellcome Back!' : 'Create new account'}</Text>
          }
        />
      ),
    });
  }, [navigation, route]);

  const handleLogin = (values: LoginPayload) => {
    route.params.isLogin
      ? dispatch(AuthActions.login.request(values))
      : dispatch(AuthActions.registerCognito.request(values));
  };

  return (
    <View style={styles.root}>
      <FormComp
        data={route.params.isLogin ? LOGIN_KEY : SIGNUP_KEY}
        title={''}
        isLogin={route.params.isLogin}
        handleLogin={handleLogin}
        initialValues={route.params.isLogin ? initialValuesLogin : initialValuesSignUp}
      />
    </View>
  );
};

export default LoginContainer;
