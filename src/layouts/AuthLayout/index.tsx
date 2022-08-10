import React from 'react';
import { View } from 'react-native';

import MainWrapper from './MainWrapper';
import styles from './styles';

interface Props {
  children: any;
}

export default function AuthLayout({ children }: Props) {
  return (
    <View style={styles.container}>
      <MainWrapper>{children}</MainWrapper>
    </View>
  );
}
