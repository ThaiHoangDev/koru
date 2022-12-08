import React from 'react';

import { MainLayout } from '@Layouts/index';
import PairYourPotContainer from '@Containers/Pairing/screens/PairYourPot';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PairStackParamList } from '@Navigators/paringNavigator';
import { useInjectReducer } from '@Utils/injectReducer';
import { useInjectSaga } from '@Utils/injectSaga';

import reducer from '@Containers/Pairing/store/reducers';
import saga from '@Containers/Pairing/store/sagas';

type PairScreenNavigationProp = StackNavigationProp<PairStackParamList, 'ParingScreen'>;
type PairScreenRouteProp = RouteProp<PairStackParamList, 'ParingScreen'>;

interface Iprops {
  route: PairScreenRouteProp;
  navigation: PairScreenNavigationProp;
}

const PairScreen = (props: Iprops) => {
  useInjectReducer({ key: 'pair', reducer });
  useInjectSaga({ key: 'pair', saga });
  return (
    <MainLayout>
      <PairYourPotContainer {...props} />
    </MainLayout>
  );
};

export default PairScreen;
