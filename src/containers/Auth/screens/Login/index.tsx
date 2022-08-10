import React from 'react';
import {
  View,
  Text
} from 'react-native';

// utils

// components by self

// assets
import styles from './styles';

interface IProps {
}

const LoginContainer = (props: IProps) => {
  return (
    <View style={styles.root}>
      <Text style={styles.textSignUp}>Login</Text>
    </View>
  );
};

export default LoginContainer
