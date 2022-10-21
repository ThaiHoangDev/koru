import React from 'react';

import { MainLayout } from '@Layouts/index';
import ChoosePlantContainer from '@Containers/Pairing/screens/ChoosePlant';
import { PropsScreen } from '@Interfaces/app';

interface Iprops extends PropsScreen {
  isLoading: boolean;
}

const ChooseWifiScreen = (props: Iprops) => {
  return (
    <MainLayout>
      <ChoosePlantContainer {...props} />
    </MainLayout>
  );
};

export default ChooseWifiScreen;
