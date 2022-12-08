import React, { useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';
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
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView style={styles.root} edges={['bottom', 'top', 'left', 'right']}>
      <StatusBar barStyle={'default'} hidden />
      <View style={styles.startLogo}>
        <StartLogo />
      </View>
      <View style={styles.containerContent}>
        <View style={{ marginVertical: 16 }}>
          <Text style={[styles.title, styles.fontFamily]}>{'Hey Boss!'}</Text>
        </View>
        <View style={styles.introView}>
          <Text style={[styles.subTitle, styles.fontFamily]}>
            There are {<Text style={{ color: colors.green2 }}>1000</Text>} kinds of plants waiting for you
          </Text>
        </View>
        <View style={[styles.doneWrap]}>
          <ButtonComp
            title="Login"
            handlePress={handleLogin}
            stylesBtn={[
              styles.btn,
              {
                backgroundColor: colors.black2,
                shadowColor: colors.green1,
                shadowOpacity: 0.33,
                shadowOffset: {
                  width: 1,
                  height: 4,
                },
                shadowRadius: 2.22,
                elevation: 3,
              },
            ]}
            stylesTitle={[styles.txtBtn, styles.fontFamily, { color: colors.white }]}
            isLoading={false}
          />
          <ButtonComp
            title="Sign Up"
            handlePress={handleSignup}
            stylesBtn={[styles.btn, { borderWidth: 1, borderColor: colors.black2 }]}
            stylesTitle={[styles.txtBtn, styles.fontFamily, { color: colors.black2 }]}
            isLoading={false}
          />
        </View>
        <View style={styles.socialText}>
          <Text style={{ color: colors.green2 }}>Or social media below</Text>
        </View>
        <View style={[styles.socialBtn]}>
          <ButtonComp
            title={''}
            handlePress={handleLogin}
            stylesBtn={[styles.btnSocial, { backgroundColor: colors.black2 }]}
            stylesTitle={[styles.txtBtn, styles.fontFamily]}
            icon={<Facbook />}
            isLoading={false}
          />
          <ButtonComp
            title={''}
            handlePress={handleLogin}
            stylesBtn={[styles.btnSocial, { backgroundColor: colors.black2 }]}
            stylesTitle={[styles.txtBtn, styles.fontFamily]}
            icon={<GoogleIcon />}
            isLoading={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StartContainer;
