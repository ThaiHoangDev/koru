import React, { useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigation, useRoute, ParamListBase, RouteProp } from '@react-navigation/native';
import { KeyboardAwareFlatList, KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik, ErrorMessage } from 'formik';

// utils
import { makeSelectIsRequesting, makeSelectStepSignUp } from '@Containers/Auth/store/selectors';
import { AuthActions } from '@Containers/Auth/store/actions';
import { verifyEmailValidationSchema } from '@Containers/Auth/schema';
// components by self
import TextInputComp from '@Components/input';
import { ButtonComp } from '@Components/button';
import TopNavigationBar from '@Navigators/topNavigation';
// assets
import styles from './styles';
import { colors, fontFamily } from '@Theme/index';
import { HEIGHT, IS_ANDROID, WIDTH } from '@Constants/app';

const VERIFY_EMAIL: any = [
  {
    label: 'Enter your verificationcode',
    placeholder: 'Verification Code',
  },
];

interface InitvalueProps {
  code: string;
}

const initialValues: InitvalueProps = {
  code: '',
};

interface Iprops {
  isLoading: boolean;
}

const EmailContainer = ({ isLoading }: Iprops) => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const route: RouteProp<ParamListBase> | any = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: (p: any) => <TopNavigationBar {...p} stylesTop={{ backgroundColor: colors.white }} isLeft={true} />,
    });
  }, [navigation]);

  const handleVerify = (values: InitvalueProps) => {
    dispatch(
      AuthActions.verifyCode.request({
        code: values.code,
        email: route.params?.payload?.email,
        password: route.params?.payload?.password,
      }),
    );
  };

  const reSendCode = () => {
    dispatch(AuthActions.resendEmailVerification.request({ email: route.params?.payload?.email }));
  };

  return (
    <View style={styles.root}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleVerify}
        validationSchema={verifyEmailValidationSchema}
        enableReinitialize>
        {({ handleSubmit, handleChange, values, errors }) => {
          return (
            <KeyboardAwareScrollView style={{ flex: 1, height: HEIGHT / 1.12 }}>
              <View style={{ flex: 1 }}>
                <View style={{ width: WIDTH / 2, marginHorizontal: 40 }}>
                  <Text style={styles.title}>Enter your verification code</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <TextInputComp
                    label={''}
                    value={values.code}
                    placeholder={'Verification Code'}
                    handleChangeText={handleChange('code')}
                    stylesTxt={styles.txtContainer}
                    autoFocus
                    selectionColor={colors.black}
                    keyboardType="numeric"
                  />
                  <ErrorMessage
                    name={values.code}
                    children={() => <Text style={styles.errorMessage}>{errors.code}</Text>}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    flexGrow: 2,
                    height: HEIGHT / 1.8,
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.subTitle}>Didn’t get the code? </Text>
                    <TouchableOpacity onPress={reSendCode}>
                      <Text style={{ fontFamily: fontFamily.Strawford, fontSize: 14, fontWeight: '700' }}>Resend</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <ButtonComp
                  title={'Verify'}
                  handlePress={handleSubmit}
                  stylesBtn={[styles.btn]}
                  stylesTitle={[styles.txtBtn, styles.fontFamily]}
                  isLoading={isLoading}
                />
              </View>
            </KeyboardAwareScrollView>
          );
        }}
      </Formik>
    </View>
  );
};
const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsRequesting(),
});
export default connect(mapStateToProps)(EmailContainer);
