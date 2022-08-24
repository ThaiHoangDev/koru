import React from 'react';

import { AuthLayout } from '@Layouts/index';
import VerifyEmailContainer from '@Containers/Auth/screens/VerifyEmail';

const EmailScreen = () => {
  return (
    <AuthLayout>
      <VerifyEmailContainer />
    </AuthLayout>
  );
};

export default EmailScreen;
