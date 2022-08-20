import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useDispatch } from 'react-redux';
import { useNavigation, useRoute, RouteProp, ParamListBase } from '@react-navigation/native';

// utils

import { StepProps } from '@Containers/Auth/interfaces';
import { makeSelectStepSignUp } from '@Containers/Auth/store/selectors';
import { AuthActions } from '@Containers/Auth/store/actions';
// components by self
import TopNavigationBar from '@Navigators/topNavigation';
import { SliderComp } from '@Components/slider';
import { FormComp } from '@Containers/Auth/components/formComp';
// assets
import styles from './styles';

interface Iprops extends StepProps {}

const SignUpContainer = (props: Iprops) => {
  const { step, ...rest } = props;
  const navigation: any = useNavigation();
  const route: RouteProp<ParamListBase> | any = useRoute();
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: (p: any) => (
        <TopNavigationBar
          {...p}
          isLeft
          children={route.params?.isLogin ? <Text style={styles.titleTab}>Login</Text> : <SliderComp step={step} />}
        />
      ),
    });
  }, [navigation]);

  const [dataSignUp, setDataSignUp] = useState({});

  const handleNext = () => {
    !route.params?.isLogin && dispatch(AuthActions.stepSignUp.request(3));
    navigation.navigate('Password', { isLogin: route.params?.isLogin });
  };

  return (
    <View style={styles.root}>
      <FormComp data={dataSignUp} handleNext={handleNext} title={'What is your name?'} type="default" />
    </View>
  );
};
const mapStateToProps = createStructuredSelector({
  step: makeSelectStepSignUp(),
});
export default connect(mapStateToProps)(SignUpContainer);
