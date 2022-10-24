import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MainLayout } from '@Layouts/index';
import { PropsScreen } from '@Interfaces/app';

import NamePlantContainer from '@Containers/Pairing/screens/NamePlant';

const NamePlant = (props: PropsScreen) => {
  return (
    <MainLayout>
      <NamePlantContainer {...props} />
    </MainLayout>
  );
};

export default NamePlant;

const styles = StyleSheet.create({});
