import React from 'react';

import { AuthLayout } from '@Layouts/index';
import StartContainer from '@Containers/Auth/screens/Start'

const LoginScreen = () => {
  return (
    <AuthLayout>
      <StartContainer />
    </AuthLayout>
  );
};

export default LoginScreen;
