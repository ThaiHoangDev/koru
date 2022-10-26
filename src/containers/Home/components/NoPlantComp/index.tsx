import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import NoPlantIcon from '@Components/iconSvg/home/NoPlantIcon';
import { fontFamily } from '@Theme/index';

const NoPlantComp = () => {
  return (
    <View style={styles.root}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>No existing plants! </Text>
        <Text style={styles.title}>Please buy or add a new plant!</Text>
      </View>
      <NoPlantIcon />
    </View>
  );
};

export default NoPlantComp;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
  },
  titleContainer: {
    marginHorizontal: 20,
    marginVertical: 40,
    marginBottom: 100,
  },
  title: {
    fontSize: 16,
    fontFamily: fontFamily.Strawford,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
