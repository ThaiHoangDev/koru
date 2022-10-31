import React from 'react';
import { TextStyle, Text, View, StyleProp } from 'react-native';
import { TextInput, TextInputProps, withTheme } from 'react-native-paper';
// import { TextInput, TextInputProps } from 'react-native';

import styles from './styles';

interface IProps extends TextInputProps {
  value: string;
  stylesTxt?: TextStyle | TextStyle[] | StyleProp<TextStyle>;
  handleChangeText: (txt: string) => void;
  type?: string;
  label: string;
}

const TextInputComp = (props: IProps) => {
  const { value, handleChangeText, stylesTxt, label, ...rest } = props;

  const onChangeText = (text: string) => {
    handleChangeText(text);
  };

  return (
    <View style={{ marginVertical: 10, marginHorizontal: 40 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...rest} style={[styles.title, stylesTxt]} value={value} onChangeText={onChangeText} />
    </View>
  );
};

export default withTheme(TextInputComp);
