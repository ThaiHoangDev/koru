import React from 'react';

import { MainLayout } from '@Layouts/index';
import PairYourPotContainer from '@Containers/Pairing/screens/PairYourPot';
import { PropsScreen } from '@Interfaces/app';
import { useInjectReducer } from '@Utils/injectReducer';
import { useInjectSaga } from '@Utils/injectSaga';

import reducer from '@Containers/Pairing/store/reducers';
import saga from '@Containers/Pairing/store/sagas';

const PairScreen = (props: PropsScreen) => { 
  useInjectReducer({ key: 'pair', reducer });
  useInjectSaga({ key: 'pair', saga });
  return (
    <MainLayout>
      <PairYourPotContainer {...props} />
    </MainLayout>
  );
};

export default PairScreen;
