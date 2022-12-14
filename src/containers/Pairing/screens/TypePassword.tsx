import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { PropsScreen } from '@Interfaces/app';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import TopNavigationBar from '@Navigators/topNavigation';
import TitleComp from '../components/TitleComp';
import TextInputComp from '@Components/input';
import { ButtonComp } from '@Components/button';
import ShowPassword from '@Components/showPassword';

import { colors, fontFamily } from '@Theme/index';
import { HEIGHT } from '@Constants/app';
// import { PairActions } from '../store/actions';


const TypePasswordContainer = (props: PropsScreen) => {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  // const dispatch = useDispatch();
  const [passwordWifi, setPasswordWifi] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: (p: any) => <TopNavigationBar {...p} isLeft />,
    });
  }, [navigation]);

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangeText = (text: string) => {
    setPasswordWifi(text);
  };

  const handleConnectWifi = () => {
    navigation.navigate('ConnectingWifi', { ssid: route.params?.ssid, passwordWifi });
  };

  return (
    <KeyboardAwareScrollView style={styles.root}>
      <View style={styles.titleContainer}>
        <TitleComp title={'_Type password'} subTitle={'Add your pot to your wifi:'} />
      </View>
      <View style={styles.content}>
        <Text style={{ textAlign: 'center', marginBottom: 20 }}>WlAN-C5624</Text>
        <TextInputComp
          value={passwordWifi}
          handleChangeText={handleChangeText}
          label={'Password'}
          placeholder={'Your password'}
          stylesTxt={styles.input}
          secureTextEntry={secureTextEntry && !showPassword}
          rightIcon={<ShowPassword showPassword={showPassword} onShowPassword={onShowPassword} top={43} right={6} />}
        />
      </View>
      <View style={styles.footer}>
        <ButtonComp
          title={'Connect to Wifi'}
          handlePress={handleConnectWifi}
          stylesBtn={passwordWifi.length == 0 ? styles.disabledBtn : styles.btn}
          stylesTitle={styles.titleBtn}
          isLoading={false}
          disabled={passwordWifi.length == 0}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default TypePasswordContainer;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  titleContainer: { flex: 0.2, paddingVertical: 40 },
  content: { height: HEIGHT / 1.7 },
  footer: {
    flex: 0.15,
    paddingHorizontal: 40,
  },
  btn: {
    backgroundColor: colors.black2,
    borderRadius: 25,
  },
  disabledBtn: {
    backgroundColor: colors.gray04,
    borderRadius: 25,
  },
  input: {
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  titleBtn: {
    color: colors.white,
    fontFamily: fontFamily.Strawford,
  },
});
