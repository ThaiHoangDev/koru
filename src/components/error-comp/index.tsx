import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { WIDTH } from '@Constants/app';

import styles from './styles';

export const ErrorComp = (props: { error: Error; resetError: Function }) => {
  return (
    <View style={styles.root}>
      <Text>Something happened!</Text>
      <Text>{props.error.toString()}</Text>
      <TouchableOpacity onPress={() => props.resetError()}>Try again</TouchableOpacity>
    </View>
  );
};
