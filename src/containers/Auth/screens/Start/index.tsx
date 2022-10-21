import React, { useEffect } from 'react';
import { View, Text, Animated, Easing, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useDispatch } from 'react-redux';

import reducer from '@Containers/Auth/store/reducers';
import saga from '@Containers/Auth/store/sagas';
import { useInjectReducer } from '@Utils/injectReducer';
import { useInjectSaga } from '@Utils/injectSaga';
// components
import { ButtonComp } from '@Components/button';
import StartLogo from '@Components/iconSvg/startScreen/StartLogo';
import Facbook from '@Components/iconSvg/startScreen/Facbook';
import GoogleIcon from '@Components/iconSvg/startScreen/GoogleIcon';
// assets
import styles from './styles';
import { colors } from '@Theme/index';

const StartContainer = () => {
  const navigation: any = useNavigation();
  useInjectReducer({ key: 'auth', reducer });
  useInjectSaga({ key: 'auth', saga });
  const dispatch = useDispatch();

  const handleLogin = () => {
    navigation.navigate('Login', { isLogin: true });
  };

  const handleSignup = () => {
    navigation.navigate('Login', { isLogin: false });
  };

  return (
    <View style={styles.root}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <StartLogo />
      </View>
      <View style={styles.containerContent}>
        <View style={{ marginVertical: 16 }}>
          <Text style={[styles.title, styles.fontFamily]}>{'Hey Boss!'}</Text>
        </View>
        <View style={{ marginBottom: 20, marginHorizontal: 80 }}>
          <Text style={[styles.subTitle, styles.fontFamily]}>{'There are 1000 kinds of plants waiting for you'}</Text>
        </View>
        <View style={[styles.doneWrap, { marginTop: 20 }]}>
          <ButtonComp
            title="Login"
            handlePress={handleLogin}
            stylesBtn={[styles.btn, { backgroundColor: colors.black2 }]}
            stylesTitle={[styles.txtBtn, styles.fontFamily, { color: colors.white }]}
          />
          <ButtonComp
            title="Sign Up"
            handlePress={handleSignup}
            stylesBtn={[styles.btn, { borderWidth: 1, borderColor: colors.black2 }]}
            stylesTitle={[styles.txtBtn, styles.fontFamily, { color: colors.black2 }]}
          />
        </View>
        <View style={{ marginTop: 60, marginBottom: 20 }}>
          <Text>Or social media below</Text>
        </View>
        <View style={[styles.doneWrap, { marginBottom: 0 }]}>
          <ButtonComp
            title={''}
            handlePress={handleLogin}
            stylesBtn={[styles.btnSocial, { backgroundColor: colors.black2 }]}
            stylesTitle={[styles.txtBtn, styles.fontFamily]}
            icon={<Facbook />}
          />
          <ButtonComp
            title={''}
            handlePress={handleLogin}
            stylesBtn={[styles.btnSocial, { backgroundColor: colors.black2 }]}
            stylesTitle={[styles.txtBtn, styles.fontFamily]}
            icon={<GoogleIcon />}
          />
        </View>
      </View>
    </View>
  );
};

export default StartContainer;
