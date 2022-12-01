import React, { useEffect } from 'react';
import { View } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { StyleSheet } from 'react-native';

// utils
import { makeSelectIsRequesting } from '../store/selectors';
import { PropsScreen } from '@Interfaces/app';
// components by self
import ConnectingComp from '../components/ConnectingComp';
// assets

import { colors, fontFamily } from '@Theme/index';
import { PairActions } from '../store/actions';
import { useRoute } from '@react-navigation/native';

interface Iprops extends PropsScreen {
  isLoading: boolean;
  netWorks: any;
}

const ConnectingWifiContainer = ({ isLoading }: Iprops) => {
  const dispatch = useDispatch();
  const route: any = useRoute();
  useEffect(() => {
    dispatch(
      PairActions.provCreds.request({
        ssid: route.params.ssid,
        passwordWifi: route.params.passwordWifi,
      }),
    );
  }, []);

  return (
    <View style={styles.root}>
      <ConnectingComp />
    </View>
  );
};
const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsRequesting(),
});
export default connect(mapStateToProps)(ConnectingWifiContainer);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
  txtContainer: {},

  fontFamily: {
    fontFamily: fontFamily.Strawford,
  },
});
