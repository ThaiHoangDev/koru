import React from 'react';

import { MainLayout } from '@Layouts/index';
import HomeContainer from '@Containers/Home/screens/HomeScreen';
import { PropsScreen } from '@Interfaces/app';
import { useInjectReducer } from '@Utils/injectReducer';
import { useInjectSaga } from '@Utils/injectSaga';

import reducer from '@Containers/Home/store/reducers';
import saga from '@Containers/Home/store/sagas';

const HomeScreen = (props: PropsScreen) => {
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });
  return (
    <MainLayout>
      <HomeContainer {...props} />
    </MainLayout>
  );
};

export default HomeScreen;
