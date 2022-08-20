import React, { useState } from 'react';
import { Text, TextStyle, View, KeyboardTypeOptions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import SkipIcon from '@Components/iconSvg/SkipIcon';
import { TextInputComp } from '@Components/input';
import { ButtonComp } from '@Components/button';

import styles from './styles';
import { colors } from '@Theme/index';

interface IProps {
  data: any;
  stylesTxt?: TextStyle | TextStyle[];
  handleNext: () => void;
  title: string;
  type?: KeyboardTypeOptions;
}

export const FormComp = ({ data, handleNext, stylesTxt, title, type }: IProps) => {
  const [text, setText] = useState('');
  const onChangeText = (text: string) => {
    setText(text);
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
          value={text}
          handleChangeText={onChangeText}
          stylesTxt={styles.txtContainer}
          autoFocus
          selectionColor={colors.black}
          keyboardType={type}
          secureTextEntry={true}
        />
        <ButtonComp title={'Next'} handlePress={handleNext} icon={<SkipIcon />} stylesBtn={styles.btnStyle} />
      </KeyboardAwareScrollView>
    </View>
  );
};
