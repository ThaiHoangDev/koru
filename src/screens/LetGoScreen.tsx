import React from 'react';

import { AuthLayout } from '@Layouts/index';
import LetGoContainer from '@Containers/Auth/screens/LetGo';

const LetGoScreen = () => {
  return (
    <AuthLayout>
      <LetGoContainer />
    </AuthLayout>
  );
};

export default LetGoScreen;
