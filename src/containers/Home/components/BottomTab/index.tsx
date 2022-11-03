import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ButtonComp } from '@Components/button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@Theme/index';

export default function BottomTab() {
  const onPress = () => {};
  return (
    <SafeAreaView style={styles.root} edges={['bottom']}>
      <ButtonComp
        stylesBtn={[styles.btn, styles.activeBtn, styles.btnLeft]}
        title={'More Info'}
        handlePress={onPress}
        isLoading={false}
        stylesTitle={styles.titleBtn}
      />
      <ButtonComp
        stylesBtn={[styles.btn, styles.btnRight]}
        title={'Air Purification'}
        handlePress={onPress}
        isLoading={false}
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
    color: colors.white,
  },
});
