import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '@Theme/index';

interface StepProps {
  step: number;
}

export default function ProgressComp({ step }: StepProps) {
  return (
    <View style={styles.root}>
      <View
        style={[
          styles.dot1,
          { width: step === 1 ? 32 : 8, backgroundColor: step === 1 ? colors.black2 : colors.grey06 },
        ]}></View>
      <View
        style={[
          styles.dot2,
          { width: step === 2 ? 32 : 8, backgroundColor: step === 2 ? colors.black2 : colors.grey06 },
        ]}></View>
      <View
        style={[
          styles.dot3,
          { width: step === 3 ? 32 : 8, backgroundColor: step === 3 ? colors.black2 : colors.grey06 },
        ]}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot1: {
    height: 8,
    borderRadius: 50,
    marginHorizontal: 4
  },
  dot2: {
    height: 8,
    borderRadius: 50,
    marginHorizontal: 4
  },
  dot3: {
    height: 8,
    borderRadius: 50,
    marginHorizontal: 4
  },
});
