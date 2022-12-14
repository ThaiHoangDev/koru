import React from 'react';

import { MainLayout } from '@Layouts/index';
import ChooseWifiContainer from '@Containers/Pairing/screens/ChooseYourWifi';
import { useNavigation, useRoute } from '@react-navigation/native';

const ChooseWifiScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  return (
    <MainLayout>
      <ChooseWifiContainer navigation={navigation} route={route} />
    </MainLayout>
  );
};

export default ChooseWifiScreen;
