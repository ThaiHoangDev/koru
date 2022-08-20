import { rest } from 'lodash';
import React from 'react';
import { TextStyle, TextInput, TextInputProps } from 'react-native';

import styles from './styles';

interface IProps extends TextInputProps {
  value: string;
  stylesTxt?: TextStyle | TextStyle[];
  handleChangeText: (txt: string) => void;
  type?: string;
}

export const TextInputComp = (props: IProps) => {
  const { value, handleChangeText, stylesTxt, ...rest } = props;
  const onChangeText = (text: string) => {
    handleChangeText(text);
  };
  return <TextInput {...rest} style={[styles.title, stylesTxt]} value={value} onChangeText={onChangeText} />;
};
