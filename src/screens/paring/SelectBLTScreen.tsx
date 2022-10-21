import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MainLayout } from '@Layouts/index';
import { PropsScreen } from '@Interfaces/app';

import SelectBLTContainer from '@Containers/Pairing/screens/SelectBLT';

interface IProps extends PropsScreen {
  isLoading: boolean;
}

export default function SelectBLTScreen(props: IProps) {
  return (
    <MainLayout>
      <SelectBLTContainer {...props} />
    </MainLayout>
  );
}

const styles = StyleSheet.create({});
