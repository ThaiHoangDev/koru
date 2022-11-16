import React from 'react';

import { MainLayout } from '@Layouts/index';
import PlantDetailContainer from '@Containers/Home/screens/PlantDetail';

import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '@Navigators/homeNavigator';
import { RouteProp } from '@react-navigation/native';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'PlantDetail'>;
type HomeScreenRouteProp = RouteProp<HomeStackParamList, 'PlantDetail'>;

interface IProps {
  isLoading: boolean;
  myPlant: any;
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

const PlantDetailScreen = (props: IProps) => {
  return (
    <MainLayout>
      <PlantDetailContainer {...props} />
    </MainLayout>
  );
};

export default PlantDetailScreen;
