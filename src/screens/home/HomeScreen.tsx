import React from 'react';

import { MainLayout } from '@Layouts/index';
import HomeContainer from '@Containers/Home/screens/HomeScreen';
import { PropsScreen } from '@Interfaces/app';

const HomeScreen = (props: PropsScreen) => {
  return (
    <MainLayout>
      <HomeContainer {...props} />
    </MainLayout>
  );
};

export default HomeScreen;
