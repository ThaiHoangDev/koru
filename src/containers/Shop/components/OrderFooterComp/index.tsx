import { Text, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import { ButtonComp } from '@Components/button';
import { styles } from './styles';

interface IProps {
  isLoading: boolean;
  orderList: any;
  total: number;
  totalItem: () => void;
}

const ModalOrderComp = (props: IProps) => {
  const { isLoading, total, totalItem } = props;
  totalItem();
  const handleSubmit = () => {};

  return (
    <LinearGradient
      colors={['#D0E8E4', '#D9F7BE']}
      style={styles.linearGradient}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}>
      <View style={styles.totalText}>
        <Text style={[styles.textColor, styles.textModelStyle, styles.fontFamily]}>Total Item:</Text>
        <Text style={[styles.TextColorPrice, styles.textModelStyle, styles.fontFamily]}>${total}</Text>
      </View>
      <View style={styles.totalText}>
        <Text style={[styles.textColor, styles.textModelStyle, styles.fontFamily]}>Shipping cost:</Text>
        <Text style={[styles.TextColorPrice, styles.textModelStyle, styles.fontFamily]}>$12.00</Text>
      </View>
      <View style={styles.drawLine} />
      <View style={styles.totalText}>
        <Text style={[styles.textColor, styles.totalTextStyle, styles.fontFamily]}>Total</Text>
        <Text style={[styles.TextColorPrice, styles.totalTextStyle, styles.fontFamily]}>${total}</Text>
      </View>
      <ButtonComp
        title={'Buy Now'}
        handlePress={handleSubmit}
        stylesBtn={[styles.btn]}
        stylesTitle={[styles.txtBtn, styles.fontFamily]}
        isLoading={isLoading}
      />
    </LinearGradient>
  );
};

export default ModalOrderComp;
