import React from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IS_ANDROID } from '@Constants/app';
import MainWrapper from './MainWrapper';
import { colors } from '@Theme/index';

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <KeyboardAvoidingView behavior={IS_ANDROID ? undefined : 'padding'} style={{ flex: 1 }}>
        <MainWrapper>{children}</MainWrapper>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white2,
  },
});
