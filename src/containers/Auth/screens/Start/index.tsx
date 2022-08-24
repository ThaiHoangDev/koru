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
// assets
import styles from './styles';
import { AuthActions } from '@Containers/Auth/store/actions';

const StartContainer = () => {
  const navigation: any = useNavigation();
  useInjectReducer({ key: 'auth', reducer });
  useInjectSaga({ key: 'auth', saga });
  const dispatch = useDispatch();
  const top = new Animated.Value(240);
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(top, {
      toValue: 64,
      duration: 500,
      easing: Easing.ease,
      delay: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      easing: Easing.bounce,
      delay: 300,
      useNativeDriver: false,
    }).start();
  }, []);

  const handleGetStarted = () => {
    dispatch(AuthActions.stepSignUp.request(1));
    navigation.navigate('LetGo');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground source={require('@Assets/image-background/start-image.png')} style={styles.containerBackground}>
      <Animated.View style={{ top: top, opacity: opacity }}>
        <Text style={styles.textHeader}>KORU</Text>
      </Animated.View>
      <View style={styles.containerContent}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Start planting air.</Text>
          <Text style={styles.subTitle}>Your plants are waiting for you.</Text>
        </View>
        <ButtonComp
          title="Get Started"
          stylesBtn={[styles.buttonContainer, styles.buttonStart]}
          stylesTitle={styles.buttonTitle}
          handlePress={handleGetStarted}
        />
        <ButtonComp
          title="Login"
          stylesBtn={[styles.buttonContainer]}
          stylesTitle={styles.buttonTitleLogin}
          handlePress={handleLogin}
        />
      </View>
    </ImageBackground>
  );
};

export default StartContainer;
