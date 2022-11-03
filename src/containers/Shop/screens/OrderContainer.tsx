import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ShopStackParamList } from '@Navigators/shopNavigator';
import TopNavigationBar from '@Navigators/topNavigation';
import { colors, fontFamily } from '@Theme/index';
import { ShopActions } from '../store/actions/index';
import { makeSelectIsRequesting, makeSelectMyOrder } from '../store/selectors/index';
import OrderItemComp from '../components/OrderComp';
import OrderFooterComp from '../components/OrderFooterComp';
import { IMyOrderList } from '../store/constant';

type OrderScreenNavigationProp = StackNavigationProp<ShopStackParamList, 'OrderScreen'>;
type OrderScreenRouteProp = RouteProp<ShopStackParamList, 'OrderScreen'>;

interface IProps {
  isLoading: boolean;
  orderList: any;
  navigation: OrderScreenNavigationProp;
  route: OrderScreenRouteProp;
}

const OrderContainer = (props: IProps) => {
  const { orderList, navigation, isLoading, route } = props;
  const [orderQuantity, setOrderQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: (p: any) => (
        <TopNavigationBar {...p} isLeft children={<Text style={styles.titleTab}>{'Oder details'}</Text>} />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(ShopActions.getMyOrder.request());
  }, [dispatch]);

  const totalItem = () => {
    let totalItem = 0;
    let order = 0;
    orderList.forEach((item: IMyOrderList) => {
      order = order + item.quantity;
      totalItem = totalItem + item.quantity * item.price;
    });
    setOrderQuantity(order);
    setTotal(totalItem);
  };

  const ItemDetailScreen = (item: any) => {
    navigation.navigate('PlantOrderDetailScreen', { uuid: item.uuid });
  };

  const _renderItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity onPress={() => ItemDetailScreen(item)}>
        <OrderItemComp data={item} index={index} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 20, flexDirection: 'row', flex: 0.1, marginTop: 10 }}>
        <Text style={[styles.myCardText, styles.textStyle]}>My card </Text>
        <Text style={[styles.numItem, styles.textStyle]}>({orderQuantity})</Text>
      </View>
      <FlatList
        data={orderList}
        keyExtractor={(item, index) => `${item.uuid.toString()}_${item.name.toString()}_${index.toString()}`}
        renderItem={_renderItem}
        style={{ paddingHorizontal: 20, flex: 0.55 }}
        // ListFooterComponent={<View style={{ height: 100 }}></View>}
      />
      <View style={{ flexGrow: 0.45 }}>
        <OrderFooterComp orderList={orderList} isLoading={isLoading} total={total} totalItem={totalItem} />
      </View>
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  orderList: makeSelectMyOrder(),
  isLoading: makeSelectIsRequesting(),
});

export default connect(mapStateToProps)(OrderContainer);

const styles = StyleSheet.create({
  titleTab: {
    fontFamily: fontFamily.FreightBigProMedium,
    fontSize: 32,
    textAlign: 'center',
    color: colors.black2,
  },

  textStyle: {
    fontFamily: fontFamily.Strawford,
    fontSize: 16,
    fontWeight: '500',
  },

  myCardText: {
    color: colors.black2,
  },

  numItem: {
    color: '#33704D',
  },
});
