import React, { useState } from 'react';
import { Text, TextStyle, View, KeyboardTypeOptions, TextInputProps, TouchableOpacity } from 'react-native';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { Formik, FormikErrors, ErrorMessage } from 'formik';

import TextInputComp from '@Components/input';
import { ButtonComp } from '@Components/button';
import VideoLoginComp from '@Components/videos/VideoLoginComp';
import ShowPassword from '@Components/showPassword';

import styles from './styles';
import { colors, fontFamily } from '@Theme/index';
import { LoginPayload } from '@Containers/Auth/interfaces';
import { loginValidationSchema } from '@Containers/Auth/schema';
import { HEIGHT, IS_ANDROID } from '@Constants/app';

interface IProps extends TextInputProps {
  data: any;
  stylesTxt?: TextStyle | TextStyle[];
  handleLogin: (values: LoginPayload) => void;
  title: string;
  type?: KeyboardTypeOptions;
  isLogin: boolean;
  initialValues: any;
  isLoading: boolean;
}

export const FormComp = ({
  data,
  handleLogin,
  stylesTxt,
  title,
  type,
  isLogin,
  initialValues,
  isLoading,
  ...rest
}: IProps) => {
  const navigation: any = useNavigation();
  const [eyeOpen, setEyeOpen] = useState(false);

  const onEyePress = () => {
    setEyeOpen(!eyeOpen);
  };

  const goToSignUp = () => {
    navigation.navigate('Login', { isLogin: !isLogin });
  };

  return (
    <View style={styles.root}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleLogin}
        validationSchema={loginValidationSchema}
        enableReinitialize>
        {({ handleChange, handleSubmit, values, errors, isValid, touched }) => {
          const _renderInput = ({ item }: any) => {
            return (
              <View>
                <TextInputComp
                  {...rest}
                  clearTextOnFocus={!!errors[item.value + ''] && !!touched[item.value + '']}
                  nativeID={item.value}
                  label={item.lable}
                  value={values[item.value] || ''}
                  placeholder={item.element}
                  handleChangeText={handleChange(item.value + '')}
                  stylesTxt={styles.txtContainer}
                  selectionColor={colors.black}
                  secureTextEntry={item.value === 'password' && !eyeOpen}
                  error={!!errors[item.value + ''] && !!touched[item.value + '']}
                  rightIcon={
                    item.value === 'password' ? (
                      <ShowPassword showPassword={eyeOpen} onShowPassword={onEyePress} top={28} right={8} />
                    ) : null
                  }
                />
                <ErrorMessage
                  name={item.value + ''}
                  children={() => <Text style={styles.errorMessage}>{errors[item.value + '']}</Text>}
                />
              </View>
            );
          };
          return (
            <View style={{ flex: 1 }}>
              <VideoLoginComp />
              <KeyboardAwareFlatList
                extraScrollHeight={IS_ANDROID ? 80 : 0}
                style={styles.formStyle}
                enableOnAndroid
                scrollEnabled
                bounces={false}
                contentContainerStyle={[styles.contentStyle, { bottom: isLogin ? 0 : 16 }]}
                contentInsetAdjustmentBehavior="always"
                overScrollMode="always"
                data={data}
                keyExtractor={item => item.lable.toString()}
                renderItem={_renderInput}
                showsVerticalScrollIndicator={false}
                ListFooterComponentStyle={{ flexGrow: 1, minHeight: HEIGHT / 5 }}
                ListFooterComponent={
                  <View style={styles.listFooter}>
                    {isLogin && (
                      <TouchableOpacity>
                        <Text style={styles.txt}>Forgot Your Password?</Text>
                      </TouchableOpacity>
                    )}
                    <>
                      <View style={styles.accountView}>
                        <Text style={styles.subTitle}> {!isLogin ? 'Have an account?' : 'Don’t have an account?'}</Text>
                        <TouchableOpacity onPress={goToSignUp}>
                          <Text>{isLogin ? 'Sign up' : 'Login'}</Text>
                        </TouchableOpacity>
                      </View>
                      <ButtonComp
                        title={isLogin ? 'Login' : 'Signup'}
                        handlePress={handleSubmit}
                        stylesBtn={[styles.btn]}
                        stylesTitle={[styles.txtBtn, styles.fontFamily]}
                        isLoading={isLoading}
                      />
                    </>
                  </View>
                }
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};
