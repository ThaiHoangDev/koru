import React from 'react';

import { MainLayout } from '@Layouts/index';
import ShopContainer from '@Containers/Shop/screens/ShopContainer';
import { useInjectReducer } from '@Utils/injectReducer';
import { useInjectSaga } from '@Utils/injectSaga';

import reducer from '@Containers/Shop/store/reducers';
import saga from '@Containers/Shop/store/sagas';


const ShopScreen = () => {
  useInjectReducer({ key: 'shop', reducer });
  useInjectSaga({ key: 'shop', saga });
  return (
    <MainLayout>
      <ShopContainer />
    </MainLayout>
  );
};

export default ShopScreen;
