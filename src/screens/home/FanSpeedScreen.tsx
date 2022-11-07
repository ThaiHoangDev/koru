import React from 'react';

import { MainLayout } from '@Layouts/index';
import FanSpeedContainer from '@Containers/Home/screens/FanSpeed';

import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '@Navigators/homeNavigator';
import { RouteProp } from '@react-navigation/native';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'FanSpeedScreen'>;
type HomeScreenRouteProp = RouteProp<HomeStackParamList, 'FanSpeedScreen'>;

interface IProps {
  isLoading: boolean;
 
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

const FanSpeedScreen = (props: IProps) => {
  return (
    <MainLayout>
      <FanSpeedContainer {...props} />
    </MainLayout>
  );
};

export default FanSpeedScreen;
