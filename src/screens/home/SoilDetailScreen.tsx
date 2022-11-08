import React from 'react';

import { MainLayout } from '@Layouts/index';

import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '@Navigators/homeNavigator';
import { RouteProp } from '@react-navigation/native';
import SoilDetailContainer from '@Containers/Home/screens/SoilDetailContainer';

type SoilDetailScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'SoilDetailScreen'>;
type SoilDetailScreenRouteProp = RouteProp<HomeStackParamList, 'SoilDetailScreen'>;

interface IProps {
  isLoading: boolean;
  navigation: SoilDetailScreenNavigationProp;
  route: SoilDetailScreenRouteProp;
}

const SoilDetailScreen = (props: IProps) => {
  return (
    <MainLayout>
      <SoilDetailContainer {...props} />
    </MainLayout>
  );
};

export default SoilDetailScreen;
