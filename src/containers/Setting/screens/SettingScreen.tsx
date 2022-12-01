import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SettingStackParamList } from '@Navigators/settingNavigator';

import { ButtonComp } from '@Components/button';

import { SettingActions } from '../store/actions';

type SettingScreenNavigationProp = StackNavigationProp<SettingStackParamList, 'SettingScreen'>;
type SettingScreenRouteProp = RouteProp<SettingStackParamList, 'SettingScreen'>;

interface IProps {
  navigation: SettingScreenNavigationProp;
  route: SettingScreenRouteProp;
}

const SettingScreen = (props: IProps) => {
  const dispatch = useDispatch();

  const hangleLogout = () => {
    dispatch(SettingActions.logout.request());
  };

  return (
    <View style={styles.rootContainer}>
      <ButtonComp title={'Logout'} handlePress={hangleLogout} isLoading={false} />
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
