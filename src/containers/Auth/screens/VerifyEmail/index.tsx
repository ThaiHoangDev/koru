import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useDispatch } from 'react-redux';
import { useNavigation, useRoute, RouteProp, ParamListBase } from '@react-navigation/native';

// utils
import { makeSelectStepSignUp } from '@Containers/Auth/store/selectors';
import { AuthActions } from '@Containers/Auth/store/actions';
// components by self
import { ImageBackgroundCompLayout } from '@Components/image-backgroundComp';
import Email from '@Components/iconSvg/Email';
// assets
import styles from './styles';

interface Iprops {}

const VerifyEmailContainer = (props: Iprops) => {
  const navigation: any = useNavigation();
  const route: RouteProp<ParamListBase> | any = useRoute();

  const handleback = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <ImageBackgroundCompLayout source={require('@Assets/splash-background/splash_xxxh.png')}>
        <Email />
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Verify your email.</Text>
          <Text style={styles.subTitle}>We sent an email to: {route.params.dataSignUp?.email}</Text>
          <TouchableOpacity style={styles.btn} onPress={handleback}>
            <Text style={styles.errorTxt}>Wrong email?</Text>
          </TouchableOpacity>
        </View>
      </ImageBackgroundCompLayout>
    </View>
  );
};
const mapStateToProps = createStructuredSelector({
  step: makeSelectStepSignUp(),
});
export default connect(mapStateToProps)(VerifyEmailContainer);
