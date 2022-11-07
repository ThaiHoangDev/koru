import React from 'react';

import { MainLayout } from '@Layouts/index';
import HomeContainer from '@Containers/Home/screens/HomeScreen';

import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '@Navigators/homeNavigator';
import { RouteProp } from '@react-navigation/native';
import { useInjectReducer } from '@Utils/injectReducer';
import { useInjectSaga } from '@Utils/injectSaga';

import reducer from '@Containers/Home/store/reducers';
import saga from '@Containers/Home/store/sagas';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
type HomeScreenRouteProp = RouteProp<HomeStackParamList, 'HomeScreen'>;

interface IProps {
  isLoading: boolean;
  myPlant: any;
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

const HomeScreen = (props: IProps) => {
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });

  // useInjectReducer({ key: 'mqtt', reducer });
  // useInjectSaga({ key: 'mqtt', saga });

  return (
    <MainLayout>
      <HomeContainer {...props} />
    </MainLayout>
  );
};

export default HomeScreen;
