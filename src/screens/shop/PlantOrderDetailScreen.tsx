import React from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { MainLayout } from '@Layouts/index';
import { ShopStackParamList } from 'navigators/shopNavigator';
import { Order } from '@Containers/Shop/interfaces';
import PlantOrderDetailContainer from '@Containers/Shop/screens/PlantOrderDetailContainer';

type PlantOrderDetailScreenNavigationProp = StackNavigationProp<ShopStackParamList, 'PlantOrderDetailScreen'>;
type PlantOrderDetailScreenRouteProp = RouteProp<ShopStackParamList, 'PlantOrderDetailScreen'>;

interface IProps {
  isLoading: boolean;
  data: Order;
  navigation: PlantOrderDetailScreenNavigationProp;
  route: PlantOrderDetailScreenRouteProp;
}

const PlantOrderDetailScreen = (props: IProps) => {
  return (
    <MainLayout>
      <PlantOrderDetailContainer {...props} />
    </MainLayout>
  );
};

export default PlantOrderDetailScreen;

const styles = StyleSheet.create({});
