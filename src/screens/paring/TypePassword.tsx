import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MainLayout } from '@Layouts/index';

import TypePasswordContainer from '@Containers/Pairing/screens/TypePassword';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function TypePasswordScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  return (
    <MainLayout>
      <TypePasswordContainer navigation={navigation} route={route} />
    </MainLayout>
  );
}

const styles = StyleSheet.create({});
