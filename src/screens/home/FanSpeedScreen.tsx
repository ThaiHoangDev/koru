import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { MainLayout } from '@Layouts/index';
import FanSpeedContainer from '@Containers/Home/screens/FanSpeed';
import { HomeStackParamList } from '@Navigators/homeNavigator';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'FanSpeedScreen'>;
type HomeScreenRouteProp = RouteProp<HomeStackParamList, 'FanSpeedScreen'>;

const FanSpeedScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<HomeScreenRouteProp>();
  return (
    <MainLayout>
      <FanSpeedContainer navigation={navigation} route={route} />
    </MainLayout>
  );
};

export default FanSpeedScreen;
