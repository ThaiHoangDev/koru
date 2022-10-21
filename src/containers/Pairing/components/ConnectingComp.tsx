import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import Startpairing2 from '@Components/iconSvg/pairing/Startpairing2';
import WifiConnectingIcon from '@Components/iconSvg/pairing/WifiConnectingIcon';
import LoaderAnimationProgress from '@Components/lottie/loader';
import PhoneIcon from '@Components/iconSvg/pairing/PhoneIcon';

import { colors, fontFamily } from '@Theme/index';

const ConnectingComp = () => {
  return (
    <View style={styles.root}>
      <View style={styles.contentContainer}>
        <Startpairing2 width={75} height={85} />
        <View style={styles.content}>
          <View style={{ marginBottom: -30, marginTop: 30 }}>
            <WifiConnectingIcon />
          </View>
          <LoaderAnimationProgress />
        </View>
        <PhoneIcon />
      </View>
      <View>
        <Text style={styles.txtTitle}>Connecting</Text>
      </View>
    </View>
  );
};

export default ConnectingComp;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
  },
  content: {
    marginHorizontal: '10%',
    alignContent: 'center',
    alignItems: 'center',
  },
  txtTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: fontFamily.Strawford,
    color: colors.black2,
    fontWeight: '500'
  },
});
