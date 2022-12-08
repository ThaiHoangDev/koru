import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { MainLayout } from '@Layouts/index';
import EditPlantInfoContainer from '@Containers/Home/screens/EditPlantInfo';

import { HomeStackParamList } from '@Navigators/homeNavigator';
import reducer from '@Containers/Pairing/store/reducers';
import saga from '@Containers/Pairing/store/sagas';
import { useInjectReducer } from '@Utils/injectReducer';
import { useInjectSaga } from '@Utils/injectSaga';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'EditPlantInfo'>;
type HomeScreenRouteProp = RouteProp<HomeStackParamList, 'EditPlantInfo'>;

interface IProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

const EditPlantInfoScreen = (props: IProps) => {
  useInjectReducer({ key: 'pair', reducer });
  useInjectSaga({ key: 'pair', saga });
  return (
    <MainLayout>
      <EditPlantInfoContainer {...props} />
    </MainLayout>
  );
};

export default EditPlantInfoScreen;
