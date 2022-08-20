import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import MainWrapper from './MainWrapper';
import styles from './styles';

interface Props {
  children: any;
}

export default function AuthLayout({ children }: Props) {
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <MainWrapper>{children}</MainWrapper>
    </SafeAreaView>
  );
}
