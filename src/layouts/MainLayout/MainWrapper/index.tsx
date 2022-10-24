import React from 'react';
import { View } from 'react-native';

import styles from './styles';

interface Props {
  children: React.ReactNode;
}

export default function MainWrapper({ children }: Props) {
  return (
    <View style={styles.mainWrapper}>
      <View style={[styles.mainWrapper]}>
        <View style={[styles.content]}>{children}</View>
      </View>
    </View>
  );
}
