import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { StyleSheet } from 'react-native';

// utils
import { makeSelectIsRequesting, makeSelectNetworks, makeSelectUuid } from '../store/selectors';
import { PropsScreen } from '@Interfaces/app';
// components by self
import ConnectingComp from '../components/ConnectingComp';
// assets

import { colors, fontFamily } from '@Theme/index';

interface Iprops extends PropsScreen {
  isLoading: boolean;
  netWorks: any;
}

const ConnectingWifiContainer = ({ isLoading, netWorks }: Iprops) => {
  return (
    <View style={styles.root}>
      <ConnectingComp />
    </View>
  );
};
const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsRequesting(),
  uuid: makeSelectUuid(),
  netWorks: makeSelectNetworks(),
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
