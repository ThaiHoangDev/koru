
import React, { useEffect } from 'react';
import {
  View,
  Text,
  Animated,
  Easing,
  ImageBackground
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// components
import { ButtonComp } from '@Components/button';
// assets
import styles from './styles';

const StartContainer = () => {
  const navigation: any = useNavigation();
  const top = new Animated.Value(240);
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(
      top,
      {
        toValue: 64,
        duration: 500,
        easing: Easing.ease,
        delay: 500,
        useNativeDriver: false
      }
    ).start();
    Animated.timing(
      opacity,
      {
        toValue: 1,
        duration: 500,
        easing: Easing.bounce,
        delay: 500,
        useNativeDriver: false
      }
    ).start();
  }, [])
  const handleGetStarted = () => {
    navigation.navigate('LetGo');
  }
  const handleLogin = () => {
    navigation.navigate('Login');
  }
  return (
    <View style={styles.root}>
      <ImageBackground source={require("@Assets/image-background/start-image.png")} style={styles.containerBackground}>
        <Animated.View style={{ top: top, opacity: opacity }}>
          <Text style={styles.textHeader}>KORU</Text>
        </Animated.View>
        <View style={styles.containerContent}>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>
              Start planting air.
            </Text>
            <Text style={styles.subTitle}>
              Your plants are waiting for you.
            </Text>
          </View>
          <ButtonComp title="Get Started" stylesBtn={[styles.buttonContainer, styles.buttonStart]} stylesTitle={styles.buttonTitle} handlePress={handleGetStarted} />
          <ButtonComp title="Login" stylesBtn={[styles.buttonContainer]} stylesTitle={styles.buttonTitleLogin} handlePress={handleLogin} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default StartContainer
