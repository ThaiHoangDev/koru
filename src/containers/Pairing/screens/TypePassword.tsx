import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { PropsScreen } from '@Interfaces/app';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import TopNavigationBar from '@Navigators/topNavigation';
import TitleComp from '../components/TitleComp';
import TextInputComp from '@Components/input';
import { ButtonComp } from '@Components/button';
import { colors, fontFamily } from '@Theme/index';

const TypePasswordContainer = (props: PropsScreen) => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const [passwordWifi, setPasswordWifi] = useState('');
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: (p: any) => <TopNavigationBar {...p} isLeft />,
    });
  }, [navigation]);
  const handleChangeText = (text: string) => {
    setPasswordWifi(text);
  };

  const handleConnectWifi = () => {
    navigation.navigate('ConnectingWifi');
  };

  return (
    <View style={styles.root}>
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
          // keyboardType='visible-password'
        />
      </View>
      <View style={styles.footer}>
        <ButtonComp
          title={'Connect to Wifi'}
          handlePress={handleConnectWifi}
          stylesBtn={styles.btn}
          stylesTitle={styles.titleBtn}
        />
      </View>
    </View>
  );
};

export default TypePasswordContainer;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  titleContainer: { flex: 0.2, paddingVertical: 40 },
  content: { flex: 0.8 },
  footer: {
    flex: 0.1,
  },
  btn: {
    backgroundColor: colors.black2,
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
