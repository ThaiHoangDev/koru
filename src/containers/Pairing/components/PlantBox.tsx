import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors, fontFamily } from '@Theme/index';
import { HEIGHT } from '@Constants/app';

interface Iprops {
  name: string;
  type: string;
  uri: string;
}

export default function PantBox({ name, type, uri }: Iprops) {
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image source={{ uri: uri, width: 100, height: 100 }} resizeMode="contain" style={{ borderRadius: 20, top: -HEIGHT / 100}}></Image>
      </View>
      <View style={styles.rightContainer}>
        <Text style={[styles.title, styles.fontFamily]}>{name}</Text>
        <Text style={[styles.subTitle, styles.fontFamily]}>{type}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    position: 'relative',
    backgroundColor: colors.green,
    borderRadius: 20 
  },
  rightContainer: {
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  title: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.black2,
  },
  fontFamily: {
    fontFamily: fontFamily.Strawford,
  },
  subTitle: {
    fontSize: 13,
    color: colors.grey06,
  },
});
