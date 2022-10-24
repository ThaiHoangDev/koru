import React from 'react';
import { Text, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';

import styles from './styles';

interface IProps {
  title: string;
  stylesBtn?: ViewStyle[] | ViewStyle | any;
  stylesTitle?: TextStyle | TextStyle[];
  handlePress: () => void;
  icon?: any;
}

export const ButtonComp = ({ title, stylesBtn, stylesTitle, handlePress, icon }: IProps) => {
  const onPress = () => {
    handlePress();
  };
  return (
    <TouchableOpacity style={[styles.root, stylesBtn]} onPress={onPress}>
      <Text style={[styles.title, stylesTitle]}>{title}</Text>
      {icon}
    </TouchableOpacity>
  );
};
