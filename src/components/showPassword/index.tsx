import { StyleSheet, Text, View } from 'react-native';
import EyeIcon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { colors } from '@Theme/index';

interface IProps {
  showPassword: boolean;
  onShowPassword: () => void;
  top: number;
  right: number;
}
const ShowPassword = ({ showPassword, onShowPassword, top, right }: IProps) => {
  return (
    <EyeIcon
      name={showPassword ? 'eye-outline' : 'eye-off-outline'}
      size={24}
      color={colors.black}
      style={{ position: 'absolute', top: top, right: right }}
      onPress={onShowPassword}
    />
  );
};

export default ShowPassword;

const styles = StyleSheet.create({});
