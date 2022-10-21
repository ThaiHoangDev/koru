import React from 'react';

import { MainLayout } from '@Layouts/index';
import ConnectingWifiContainer from '@Containers/Pairing/screens/ConnectingWifi';
import { PropsScreen } from '@Interfaces/app';

interface Iprops extends PropsScreen {}

const ConnectingWifiScreen = (props: Iprops) => {
  return (
    <MainLayout>
      <ConnectingWifiContainer {...props} />
    </MainLayout>
  );
};

export default ConnectingWifiScreen;
