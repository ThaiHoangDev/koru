import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MainLayout } from '@Layouts/index';
import { PropsScreen } from '@Interfaces/app';

import TypePasswordContainer from '@Containers/Pairing/screens/TypePassword';

interface IProps extends PropsScreen {
  isLoading: boolean;
}

export default function TypePasswordScreen(props: IProps) {
  return (
    <MainLayout>
      <TypePasswordContainer {...props} />
    </MainLayout>
  );
}

const styles = StyleSheet.create({});
