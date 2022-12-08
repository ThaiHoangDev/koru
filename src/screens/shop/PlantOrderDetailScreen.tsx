import React from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { MainLayout } from '@Layouts/index';
import { ShopStackParamList } from 'navigators/shopNavigator';
import PlantOrderDetailContainer from '@Containers/Shop/screens/PlantOrderDetailContainer';

type PlantOrderDetailScreenNavigationProp = StackNavigationProp<ShopStackParamList, 'PlantOrderDetailScreen'>;
type PlantOrderDetailScreenRouteProp = RouteProp<ShopStackParamList, 'PlantOrderDetailScreen'>;

const PlantOrderDetailScreen = () => {
  const navigation = useNavigation<PlantOrderDetailScreenNavigationProp>();
  const route = useRoute<PlantOrderDetailScreenRouteProp>();
  return (
    <MainLayout>
      <PlantOrderDetailContainer navigation={navigation} route={route}  />
    </MainLayout>
  );
};

export default PlantOrderDetailScreen;

const styles = StyleSheet.create({});
