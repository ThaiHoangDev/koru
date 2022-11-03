import { Image, Text, TouchableHighlight, View } from 'react-native';
import React from 'react';

import { Order } from '@Containers/Shop/interfaces';
import { styles } from './styles';
import { useDispatch } from 'react-redux';

import { ShopActions } from '../../store/actions/index';
import ChangeQuantityComp from '../ChangeQuantityComp';

interface IProps {
  data: Order;
  index: number;
}

const OrderComp = ({ data, index }: IProps) => {
  const dispatch = useDispatch();

  const deleteItem = (index: number) => () => {
    const payload = { ...data, index };
    dispatch(ShopActions.DeleteMyItem.request(payload));
  };

  const handleIncrease = () => {};

  const handleDecrease = () => {};

  return (
    <View style={styles.item}>
      <TouchableHighlight style={[styles.cancelButton, styles.cancel]} onPress={deleteItem(index)}>
        <Text style={styles.textCancel}>X</Text>
      </TouchableHighlight>
      <View style={styles.itemContent}>
        <View style={styles.image}>
          <Image
            source={{
              uri: data.image,
            }}
          />
        </View>
        <View style={{ flex: 0.9 }}>
          <View>
            <Text style={[styles.treeName, styles.treeNameColor]}>{data.name}</Text>
            <Text style={[styles.treeType, styles.treeTypeColor]}>{data.type}</Text>
          </View>
          <View style={styles.price}>
            <Text style={styles.priceText}>${data.price}</Text>
            <ChangeQuantityComp onPressDecrease={handleDecrease} onPressIncrease={handleIncrease} data={data} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderComp;
