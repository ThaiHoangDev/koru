import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { ButtonComp } from '@Components/button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@Theme/index';

interface IProps {
  onClickLeft: () => void;
  onClickRight: () => void;
  isActiveRight?: boolean;
  isDetail?: boolean;
}

export default function BottomTab({ onClickLeft, onClickRight, isDetail, isActiveRight }: IProps) {
  const onPressBtnLeft = () => {
    onClickLeft();
  };
  const onPressBtnRight = () => {
    onClickRight();
  };
  return (
    <SafeAreaView style={styles.root} edges={['bottom']}>
      <ButtonComp
        stylesBtn={[styles.btn, !isDetail && !isActiveRight && styles.activeBtn, styles.btnLeft]}
        title={'More Info'}
        handlePress={onPressBtnLeft}
        isLoading={false}
        stylesTitle={isDetail || isActiveRight ? styles.titleBtn : styles.titleBtnActive}
      />
      <ButtonComp
        stylesBtn={[styles.btn, styles.btnRight, !isDetail && isActiveRight && styles.activeBtn]}
        title={'Air Purification'}
        handlePress={onPressBtnRight}
        isLoading={false}
        stylesTitle={isDetail || !isActiveRight ? styles.titleBtn : styles.titleBtnActive}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 94,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    flex: 1,
    height: 60,
  },
  activeBtn: {
    backgroundColor: colors.black2,
  },
  unActiveBtn: {},
  btnLeft: {
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    marginRight: 10,
  },
  btnRight: {
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
    marginLeft: 10,
  },
  titleBtn: {
    color: colors.grey06,
  },
  titleBtnActive: {
    color: colors.white,
  },
});
