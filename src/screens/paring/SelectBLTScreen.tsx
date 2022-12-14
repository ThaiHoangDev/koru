import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MainLayout } from '@Layouts/index';

import SelectBLTContainer from '@Containers/Pairing/screens/SelectBLT';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function SelectBLTScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  return (
    <MainLayout>
      <SelectBLTContainer navigation={navigation} route={route} />
    </MainLayout>
  );
}

const styles = StyleSheet.create({});
