import React from 'react';

import { MainLayout } from '@Layouts/index';
import ChoosePlantContainer from '@Containers/Pairing/screens/ChoosePlant';
import { useNavigation, useRoute } from '@react-navigation/native';

const ChooseWifiScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  return (
    <MainLayout>
      <ChoosePlantContainer navigation={navigation} route={route} />
    </MainLayout>
  );
};

export default ChooseWifiScreen;
