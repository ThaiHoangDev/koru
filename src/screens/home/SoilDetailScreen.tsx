import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { MainLayout } from '@Layouts/index';
import { HomeStackParamList } from '@Navigators/homeNavigator';
import SoilDetailContainer from '@Containers/Home/screens/SoilDetailContainer';

type SoilDetailScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'SoilDetailScreen'>;
type SoilDetailScreenRouteProp = RouteProp<HomeStackParamList, 'SoilDetailScreen'>;

const SoilDetailScreen = () => {
  const navigation = useNavigation<SoilDetailScreenNavigationProp>();
  const route = useRoute<SoilDetailScreenRouteProp>();
  return (
    <MainLayout>
      <SoilDetailContainer navigation={navigation} route={route} />
    </MainLayout>
  );
};

export default SoilDetailScreen;
