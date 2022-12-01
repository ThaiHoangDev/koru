import React, { useState } from 'react';
import { View, Text, StyleProp } from 'react-native';

import { StyleSheet } from 'react-native';

// utils

// components by self

// assets

import { colors, fontFamily } from '@Theme/index';

interface Iprops {
  title: string;
  subTitle: string;
  styleLayout?: any;
}

const TitleComp = ({ title, subTitle, styleLayout }: Iprops) => {
  return (
    <View style={[styles.root, styleLayout]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
  );
};

export default TitleComp;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 60,
  },

  title: {
    color: colors.black2,
    fontFamily: fontFamily.Strawford,
    fontSize: 24,
    fontWeight: '700'
  },
  subTitle: {
    marginTop: 20,
    color: colors.grey06,
    fontFamily: fontFamily.Strawford,
    fontSize: 16,
    textAlign: 'center',
  },
});
