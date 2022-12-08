import React from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { MainLayout } from '@Layouts/index';
import { ShopStackParamList } from 'navigators/shopNavigator';
import OrderContainer from '@Containers/Shop/screens/OrderContainer';

type OrderScreenNavigationProp = StackNavigationProp<ShopStackParamList, 'OrderScreen'>;
type OrderScreenRouteProp = RouteProp<ShopStackParamList, 'OrderScreen'>;

const OrderScreen = () => {
  const navigation = useNavigation<OrderScreenNavigationProp>();
  const route = useRoute<OrderScreenRouteProp>();
  return (
    <MainLayout>
      <OrderContainer route={route} navigation={navigation} />
    </MainLayout>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
