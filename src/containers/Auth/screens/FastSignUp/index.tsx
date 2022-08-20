import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStructuredSelector } from 'reselect';
import { useDispatch } from 'react-redux';

// utils
import { StepProps } from '@Containers/Auth/interfaces';
import { makeSelectStepSignUp } from '@Containers/Auth/store/selectors';
import { AuthActions } from '@Containers/Auth/store/actions';
// components by self
import TopNavigationBar from '@Navigators/topNavigation';
import FacbookIcon from '@Components/iconSvg/FacbookIcon';
import Google from '@Components/iconSvg/Google';
import { SliderComp } from '@Components/slider';
import SkipIcon from '@Components/iconSvg/SkipIcon';
// assets
import styles from './styles';

const SIGNUP_KEY = [
  { lable: 'FACBOOK', element: <FacbookIcon /> },
  { lable: 'GOOGLE', element: <Google /> },
  {
    lable: 'SKIP',
    element: (
      <View style={styles.btnFlex}>
        <Text style={styles.textEmail}>Skip</Text>
        <SkipIcon />
      </View>
    ),
  },
];

const FastSignUpContainer = ({ step }: StepProps) => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: (p: any) => <TopNavigationBar {...p} isLeft children={<SliderComp step={step} />} />,
    });
  }, [navigation]);

  const handlePress = (type: string) => () => {
    switch (type) {
      case 'FACBOOK':
        break;
      case 'GOOGLE':
        break;

      default:
        dispatch(AuthActions.stepSignUp.request(2));
        navigation.navigate('SignUp');
        break;
    }
  };

  const _renderItem = ({ item }: any) => (
    <TouchableOpacity style={[styles.buttonContainer, styles.containerContent]} onPress={handlePress(item.lable)}>
      {item.element}
    </TouchableOpacity>
  );

  return (
    <View style={styles.root}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Fast sign up!</Text>
        <Text style={styles.subTitle}>Sign up with your social login to be faster.</Text>
      </View>
      <FlatList renderItem={_renderItem} data={SIGNUP_KEY} keyExtractor={item => item.lable.toString()} />
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  step: makeSelectStepSignUp(),
});

export default connect(mapStateToProps)(FastSignUpContainer);
