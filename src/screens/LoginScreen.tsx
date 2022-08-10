import React from 'react';

import { AuthLayout } from '@Layouts/index';
import LoginContainer from '@Containers/Auth/screens/Login'

const LoginScreen = () => {
  return (
    <AuthLayout>
      <LoginContainer />
    </AuthLayout>
  );
};

export default LoginScreen;
