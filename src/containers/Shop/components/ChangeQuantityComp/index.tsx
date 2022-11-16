import { Text, TouchableHighlight, View } from 'react-native';
import React, { useState } from 'react';

import { Order } from '@Containers/Shop/interfaces/index';
import { styles } from './styles';
import { useDispatch } from 'react-redux';
import { ShopActions } from '@Containers/Shop/store/actions';

interface IProps {
  data: Order;
  onPressDecrease: () => void;
  onPressIncrease: () => void;
}

const ChangeQuantityComp = (props: IProps) => {
  const { data } = props;
  const dispatch = useDispatch();
  const handleIncrease = () => {
    const payload = { ...data, quantity: data?.quantity };
    dispatch(ShopActions.inCreaseMyItem.request(payload));
  };

  const handleDecrease = () => {
    if (data?.quantity > 0) {
      const payload = { ...data, quantity: data?.quantity };
      dispatch(ShopActions.decreaseMyItem.request(payload));
    }
  };
  return (
    <View style={styles.buttonContent}>
      <TouchableHighlight style={styles.button} onPress={handleDecrease}>
        <Text style={styles.textButton}>-</Text>
      </TouchableHighlight>
      <Text style={styles.textButton}>{data?.quantity}</Text>
      <TouchableHighlight style={styles.button} onPress={handleIncrease}>
        <Text style={styles.textButton}>+</Text>
      </TouchableHighlight>
    </View>
  );
};

export default ChangeQuantityComp;
