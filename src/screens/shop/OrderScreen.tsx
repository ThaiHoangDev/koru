import React from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { MainLayout } from '@Layouts/index';
import { ShopStackParamList } from 'navigators/shopNavigator';
import OrderContainer from '@Containers/Shop/screens/OrderContainer';

type OrderScreenNavigationProp = StackNavigationProp<ShopStackParamList, 'OrderScreen'>;
type OrderScreenRouteProp = RouteProp<ShopStackParamList, 'OrderScreen'>;

interface IProps {
  isLoading: boolean;
  orderList: any;
  navigation: OrderScreenNavigationProp;
  route: OrderScreenRouteProp;
}

const OrderScreen = (props: IProps) => {
  return (
    <MainLayout>
      <OrderContainer {...props} />
    </MainLayout>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
