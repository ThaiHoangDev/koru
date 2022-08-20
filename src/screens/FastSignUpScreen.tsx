import React from 'react';

import { AuthLayout } from '@Layouts/index';
import FastSignUpContainer from '@Containers/Auth/screens/FastSignUp';

const FastSignUpScreen = () => {
  return (
    <AuthLayout>
      <FastSignUpContainer />
    </AuthLayout>
  );
};

export default FastSignUpScreen;
