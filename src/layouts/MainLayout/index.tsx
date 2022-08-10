import React from 'react';
import { KeyboardAvoidingView } from 'react-native'

import { IS_ANDROID } from '@Constants/app'
import MainWrapper from './MainWrapper';

interface Props {
  isHome?: boolean;
  children: React.ReactNode;
}

export default function MainLayout({ isHome, children}: Props) {
  return (
    <KeyboardAvoidingView behavior={IS_ANDROID ? undefined : 'padding'} style={{ flex: 1 }}>
      <MainWrapper
        isHome={isHome}>
        {children}
      </MainWrapper>
    </KeyboardAvoidingView>
  )
}
