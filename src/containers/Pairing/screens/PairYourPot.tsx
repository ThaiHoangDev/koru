import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import EspIdfProvisioningReactNative from '@digitalfortress-dev/esp-idf-provisioning-react-native';

// utils

// components by self
import StartPairing from '@Components/iconSvg/pairing/StartPairing';
import TitleComp from '../components/TitleComp';
import TopNavigationBar from '@Navigators/topNavigation';
// assets
import { fontFamily } from '@Theme/index';
import { StackNavigationProp } from '@react-navigation/stack';
import { PairStackParamList } from '@Navigators/paringNavigator';

type PairScreenNavigationProp = StackNavigationProp<PairStackParamList, 'ParingScreen'>;
type PairScreenRouteProp = RouteProp<PairStackParamList, 'ParingScreen'>;

interface Iprops {
  route: PairScreenRouteProp;
  navigation: PairScreenNavigationProp;
}

const PairYourPotContainer = (props: Iprops) => {
  EspIdfProvisioningReactNative.create();
  const { route, navigation } = props;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: (p: any) => <TopNavigationBar {...p} isLeft />,
    });
  }, [navigation]);

  const handlePairing = () => {
    navigation.navigate('SelectBLT');
  };

  return (
    <View style={styles.root}>
      <View style={styles.txtContainer}>
        <TitleComp
          title={'_Pair your pot.'}
          subTitle={'Click the button on your pot. Like you see below.'}
          styleLayout={{ flex: 1 }}
        />
      </View>
      <Pressable style={{ flex: 2 }} onPress={handlePairing}>
        <StartPairing />
      </Pressable>
    </View>
  );
};

export default PairYourPotContainer;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtContainer: {
    flex: 1,
    marginTop: 20,
  },

  fontFamily: {
    fontFamily: fontFamily.Strawford,
  },
});
