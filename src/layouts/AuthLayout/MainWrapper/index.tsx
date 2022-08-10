import React from 'react';
import { View } from 'react-native';

import styles from './styles';

interface Props {
  children: any;
}

export default function MainWrapper({ children }: Props) {
  return (
    <View style={styles.mainWrapper}>
      {children}
    </View>
  );
}
