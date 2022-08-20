import React from 'react';

import { AuthLayout } from '@Layouts/index';
import SignUpContainer from '@Containers/Auth/screens/SignUp';

const SignUpScreen = () => {
  return (
    <AuthLayout>
      <SignUpContainer />
    </AuthLayout>
  );
};

export default SignUpScreen;
