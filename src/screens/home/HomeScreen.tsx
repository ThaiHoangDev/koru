import React from 'react';

import { MainLayout } from '@Layouts/index';
import HomeContainer from '@Containers/Home/screens/HomeScreen';

import { useInjectReducer } from '@Utils/injectReducer';
import { useInjectSaga } from '@Utils/injectSaga';

import reducer from '@Containers/Home/store/reducers';
import saga from '@Containers/Home/store/sagas';

const HomeScreen = () => {
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });
  return (
    <MainLayout>
      <HomeContainer />
    </MainLayout>
  );
};

export default HomeScreen;
