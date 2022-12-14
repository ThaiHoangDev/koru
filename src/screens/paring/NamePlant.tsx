import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MainLayout } from '@Layouts/index';

import NamePlantContainer from '@Containers/Pairing/screens/NamePlant';
import { useNavigation, useRoute } from '@react-navigation/native';

const NamePlant = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  return (
    <MainLayout>
      <NamePlantContainer navigation={navigation} route={route} />
    </MainLayout>
  );
};

export default NamePlant;

const styles = StyleSheet.create({});
