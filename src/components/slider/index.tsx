import React from 'react';
import { View } from 'react-native';

import { WIDTH } from '@Constants/app';

import styles from './styles';

interface IProps {
  step: number;
}
const width = WIDTH / 10;

export const SliderComp = ({ step }: IProps) => {
  return (
    <View style={styles.root}>
      <View style={[styles.sliderContainer, { width: width * step }]}></View>
    </View>
  );
};
