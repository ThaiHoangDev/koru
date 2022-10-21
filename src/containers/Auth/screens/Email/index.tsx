import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigation, useRoute, ParamListBase, RouteProp } from '@react-navigation/native';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

// utils
import { makeSelectStepSignUp } from '@Containers/Auth/store/selectors';
import { AuthActions } from '@Containers/Auth/store/actions';
// components by self
import TextInputComp from '@Components/input';
import { ButtonComp } from '@Components/button';
// assets
import styles from './styles';
import { colors } from '@Theme/index';
import { WIDTH } from '@Constants/app';

const VERIFY_EMAIL: any = [
  {
    label: 'Enter your verificationcode',
    placeholder: 'Verification Code',
  },
];

const EmailContainer = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const route: RouteProp<ParamListBase> | any = useRoute();
  const [code, setCode] = useState('');

  const handleVerify = () => {
    dispatch(AuthActions.verifyCode.request(code));
  };

  const onChangeText = (text: string) => {
    setCode(text);
  };
  const reSendCode = () => {
    dispatch(AuthActions.resendEmailVerification.request());
  };

  return (
    <View style={styles.root}>
      <KeyboardAwareFlatList
        enableOnAndroid={true}
        bounces={false}
        contentContainerStyle={{ flexGrow: 1 }}
        contentInsetAdjustmentBehavior="always"
        overScrollMode="always"
        data={VERIFY_EMAIL}
        keyExtractor={item => item.label.toString()}
        renderItem={({ item }) => (
          <TextInputComp
            label={''}
            value={code}
            placeholder={item.placeholder}
            handleChangeText={onChangeText}
            stylesTxt={styles.txtContainer}
            autoFocus
            selectionColor={colors.black}
            keyboardType="numeric"
          />
        )}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Enter your verification code</Text>
          </View>
        }
        ListHeaderComponentStyle={{ alignItems: 'flex-start', marginTop: 40, width: WIDTH / 2, paddingLeft: 40 }}
        ListFooterComponentStyle={{ flex: 0.9, justifyContent: 'space-between', marginBottom: 20 }}
        ListFooterComponent={
          <>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.subTitle}>Didn’t get the code? </Text>
              <TouchableOpacity onPress={reSendCode}>
                <Text>Resend</Text>
              </TouchableOpacity>
            </View>

            <ButtonComp
              title={'Verify'}
              handlePress={handleVerify}
              stylesBtn={[styles.btn]}
              stylesTitle={[styles.txtBtn, styles.fontFamily]}
            />
          </>
        }
      />
    </View>
  );
};
const mapStateToProps = createStructuredSelector({
  step: makeSelectStepSignUp(),
});
export default connect(mapStateToProps)(EmailContainer);
