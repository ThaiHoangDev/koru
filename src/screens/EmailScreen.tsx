import React from 'react';

import { AuthLayout } from '@Layouts/index';
import EmailContainer from '@Containers/Auth/screens/Email';

const EmailScreen = () => {
  return (
    <AuthLayout>
      <EmailContainer />
    </AuthLayout>
  );
};

export default EmailScreen;
