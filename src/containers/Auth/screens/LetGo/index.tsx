
import React, { useEffect } from 'react';
import {
  View,
  Text,
  Animated,
  Easing,
  ImageBackground
} from 'react-native';
import { useNavigation  } from '@react-navigation/native';

// utils

// components by self
import { ButtonComp } from '@Components/button';
// assets
import styles from './styles';

const LetGoContainer = () => {
  const navigation: any = useNavigation();
 
  return (
    <View style={styles.root}>
      
    </View>
  );
};

export default LetGoContainer;
