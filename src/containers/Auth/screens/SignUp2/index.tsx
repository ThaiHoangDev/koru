import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createStructuredSelector } from 'reselect';

// utils
import { StepProps } from '@Containers/Auth/interfaces';
import { makeSelectStepSignUp } from '@Containers/Auth/store/selectors';
import { AuthActions } from '@Containers/Auth/store/actions';
// components by self
import { SliderComp } from '@Components/slider';
import { FormComp } from '@Containers/Auth/components/formComp';
import TopNavigationBar from '@Navigators/topNavigation';
// assets
import styles from '../SignUp/styles';

interface Iprops extends StepProps {}

const SignUpContainer2 = (props: Iprops) => {
  const { step, ...rest } = props;
  const navigation: any = useNavigation();
  const route: any = useRoute();
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
  }, [navigation, route]);

  const [dataSignUp, setDataSignUp] = useState({});

  const handleNext = () => {
    !route.params?.isLogin && dispatch(AuthActions.stepSignUp.request(4));
    navigation.navigate('Email', { isLogin: route.params?.isLogin });
  };

  return (
    <View style={styles.root}>
      <FormComp data={dataSignUp} handleNext={handleNext} title="Choose your Passwort!" type="numeric" />
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  step: makeSelectStepSignUp(),
});

export default connect(mapStateToProps)(SignUpContainer2);
