import React from 'react';

import { AuthLayout } from '@Layouts/index';
import {HomeContainer} from '@Containers/App/screens/Home';

const HomeScreen = () => {
  return (
    <AuthLayout>
      <HomeContainer />
    </AuthLayout>
  );
};

export default HomeScreen;
