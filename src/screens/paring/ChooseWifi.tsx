import React from 'react';

import { MainLayout } from '@Layouts/index';
import ChooseWifiContainer from '@Containers/Pairing/screens/ChooseYourWifi';
import { PropsScreen } from '@Interfaces/app';

interface Iprops extends PropsScreen {
  step: number;
}

const ChooseWifiScreen = (props: Iprops) => {
  return (
    <MainLayout>
      <ChooseWifiContainer {...props} />
    </MainLayout>
  );
};

export default ChooseWifiScreen;
