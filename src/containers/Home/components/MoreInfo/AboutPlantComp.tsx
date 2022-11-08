import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const AboutPlant = () => {
  return <View style={styles.containerScreen}></View>;
};

export default AboutPlant;

const styles = StyleSheet.create({
  containerScreen: {
    flex: 1,
    width: Dimensions.get('screen').width,
    flexDirection: 'column',
    alignItems: 'center',
  },
});
