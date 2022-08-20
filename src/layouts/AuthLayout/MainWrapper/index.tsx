import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';

interface Props {
  children: any;
}

export default function MainWrapper({ children }: Props) {
  return (
    <SafeAreaView style={styles.mainWrapper} edges={['left', 'right']}>
      {children}
    </SafeAreaView>
  );
}
