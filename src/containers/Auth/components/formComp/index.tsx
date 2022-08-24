import React, { useState } from 'react';
import { Text, TextStyle, View, KeyboardTypeOptions, TextInputProps } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import SkipIcon from '@Components/iconSvg/SkipIcon';
import { TextInputComp } from '@Components/input';
import { ButtonComp } from '@Components/button';

import styles from './styles';
import { colors } from '@Theme/index';
import { rest } from 'lodash';

interface IProps extends TextInputProps {
  data: any;
  stylesTxt?: TextStyle | TextStyle[];
  handleNext: () => void;
  title: string;
  type?: KeyboardTypeOptions;
  setState: (txt: string) => void;
}

export const FormComp = ({ data, handleNext, stylesTxt, title, type, setState, ...rest }: IProps) => {
  const onChangeText = (text: string) => {
    setState(text);
  };

  return (
    <View style={styles.root}>
      <Text style={styles.subTitle}>{title}</Text>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        bounces={false}
        contentContainerStyle={styles.keyboardContainer}
        contentInsetAdjustmentBehavior="always"
        overScrollMode="always"
        showsVerticalScrollIndicator={false}>
        <TextInputComp
          {...rest}
          value={data}
          handleChangeText={onChangeText}
          stylesTxt={styles.txtContainer}
          autoFocus
          selectionColor={colors.black}
          keyboardType={type}
        />
        <ButtonComp title={'Next'} handlePress={handleNext} icon={<SkipIcon />} stylesBtn={styles.btnStyle} />
      </KeyboardAwareScrollView>
    </View>
  );
};
