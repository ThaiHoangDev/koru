import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigation, useRoute, ParamListBase, RouteProp } from '@react-navigation/native';

// utils
import { StepProps } from '@Containers/Auth/interfaces';
import { makeSelectStepSignUp } from '@Containers/Auth/store/selectors';
import { showErrorWithString } from '@Utils/helper';
import { AuthActions } from '@Containers/Auth/store/actions';
// components by self
import TopNavigationBar from '@Navigators/topNavigation';
import { SliderComp } from '@Components/slider';
import { FormComp } from '@Containers/Auth/components/formComp';
// assets
import styles from './styles';

const EmailContainer = ({ step }: StepProps) => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const route: RouteProp<ParamListBase> | any = useRoute();
  const [email, setEmail] = useState('');

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

  const handleNext = () => {
    if (!!email) {
      !route.params?.isLogin && dispatch(AuthActions.stepSignUp.request(5));
      navigation.navigate('VerifyEmail', {
        isLogin: route.params?.isLogin,
        dataSignUp: { ...route.params.dataSignUp, email: email },
      });
      console.log(route.params?.dataSignUp, 'FFFFF');
      !!route.params?.dataSignUp
        ? dispatch(AuthActions.register.request(route.params?.dataSignUp))
        : dispatch(AuthActions.login.request(route.params.dataLogin));
    } else {
      showErrorWithString('Please input Email!');
    }
  };

  return (
    <View style={styles.root}>
      <FormComp data={email} handleNext={handleNext} title={'What is your email?'} setState={setEmail} />
    </View>
  );
};
const mapStateToProps = createStructuredSelector({
  step: makeSelectStepSignUp(),
});
export default connect(mapStateToProps)(EmailContainer);
