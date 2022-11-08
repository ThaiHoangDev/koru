import React from 'react';
import { Text, ViewStyle, TextStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import LoaderAnimationProgress from '@Components/lottie/loader';

import styles from './styles';

interface IProps extends TouchableOpacityProps {
  title: string;
  stylesBtn?: ViewStyle[] | ViewStyle | any;
  stylesTitle?: TextStyle | TextStyle[];
  handlePress: () => void;
  icon?: any;
  isLoading: boolean;
}

export const ButtonComp = ({ title, stylesBtn, stylesTitle, handlePress, icon, isLoading, ...rest }: IProps) => {
  const onPress = () => {
    handlePress();
  };
  return (
    <TouchableOpacity style={[styles.root, stylesBtn]} onPress={onPress} {...rest}>
      {isLoading ? (
        <LoaderAnimationProgress source={require('@Assets/lotties/loading.json')} width={80} />
      ) : (
        <Text style={[styles.title, stylesTitle]}>{title}</Text>
      )}
      {icon}
    </TouchableOpacity>
  );
};
