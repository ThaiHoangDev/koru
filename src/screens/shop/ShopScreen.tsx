import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { MainLayout } from '@Layouts/index';
import ShopContainer from '@Containers/Shop/screens/ShopContainer';
import { ShopStackParamList } from '@Navigators/shopNavigator';
import { PropsScreen } from '@Interfaces/app';
import { useInjectReducer } from '@Utils/injectReducer';
import { useInjectSaga } from '@Utils/injectSaga';

import reducer from '@Containers/Shop/store/reducers';
import saga from '@Containers/Shop/store/sagas';

type ShopScreenNavigationProp = StackNavigationProp<ShopStackParamList, 'ShopScreen'>;
type ShopScreenRouteProp = RouteProp<ShopStackParamList, 'ShopScreen'>;

interface IProps {
  isLoading: boolean;
  myPlant: any;
  listPlantGroup: any;
  navigation: ShopScreenNavigationProp;
  route: ShopScreenRouteProp;
}

const ShopScreen = (props: IProps) => {
  useInjectReducer({ key: 'shop', reducer });
  useInjectSaga({ key: 'shop', saga });
  return (
    <MainLayout>
      <ShopContainer {...props} />
    </MainLayout>
  );
};

export default ShopScreen;
