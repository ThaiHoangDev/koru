import React from 'react';

import { MainLayout } from '@Layouts/index';
import ConnectingWifiContainer from '@Containers/Pairing/screens/ConnectingWifi';
// import { useNavigation, useRoute } from '@react-navigation/native';

const ConnectingWifiScreen = () => {
  // const navigation = useNavigation<any>();
  // const route = useRoute<any>();
  return (
    <MainLayout>
      <ConnectingWifiContainer />
    </MainLayout>
  );
};

export default ConnectingWifiScreen;
