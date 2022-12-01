import React from 'react';

import { MainLayout } from '@Layouts/index';
import SettingContainer from '@Containers/Setting/screens/SettingScreen';

import { StackNavigationProp } from '@react-navigation/stack';
import { SettingStackParamList } from '@Navigators/settingNavigator';
import { RouteProp } from '@react-navigation/native';

import { useInjectSaga } from '@Utils/injectSaga';
import { useInjectReducer } from '@Utils/injectReducer';
import reducer from '@Containers/Setting/store/reducers';
import saga from '@Containers/Setting/store/sagas';

type SettingScreenNavigationProp = StackNavigationProp<SettingStackParamList, 'SettingScreen'>;
type SettingScreenRouteProp = RouteProp<SettingStackParamList, 'SettingScreen'>;

interface IProps {
  navigation: SettingScreenNavigationProp;
  route: SettingScreenRouteProp;
}

const SettingScreen = (props: IProps) => {
  useInjectSaga({ key: 'Setting', saga });
  useInjectReducer({ key: 'Setting', reducer });
  return (
    <MainLayout>
      <SettingContainer {...props} />
    </MainLayout>
  );
};

export default SettingScreen;
