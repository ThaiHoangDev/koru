import React from 'react';
import { View } from 'react-native';


import styles from './styles';

interface Props {
  isHome?: boolean;
  children: React.ReactNode;
}

export default function MainWrapper({ isHome, children }: Props) {
  return (
    <View style={styles.mainWrapper}>
      <View style={[styles.mainWrapper, styles.contentWrap]}>
        <View style={[styles.content, isHome && styles.homeContent]}>
          {children}
        </View>
      </View>
    </View>
  );
}
