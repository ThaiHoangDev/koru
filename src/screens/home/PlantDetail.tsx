import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { MainLayout } from '@Layouts/index';
import PlantDetailContainer from '@Containers/Home/screens/PlantDetail';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '@Navigators/homeNavigator';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'PlantDetail'>;
type HomeScreenRouteProp = RouteProp<HomeStackParamList, 'PlantDetail'>;

const PlantDetailScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<HomeScreenRouteProp>();
  return (
    <MainLayout>
      <PlantDetailContainer navigation={navigation} route={route} />
    </MainLayout>
  );
};

export default PlantDetailScreen;
