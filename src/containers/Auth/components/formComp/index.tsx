import React, { useState } from 'react';
import { Text, TextStyle, View, KeyboardTypeOptions, TextInputProps, TouchableOpacity } from 'react-native';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { Formik, FormikErrors, ErrorMessage } from 'formik';

import TextInputComp from '@Components/input';
import { ButtonComp } from '@Components/button';
import VideoLoginComp from '@Components/videos/VideoLoginComp';
import EyeIcon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import { colors, fontFamily } from '@Theme/index';
import { LoginPayload } from '@Containers/Auth/interfaces';
import { loginValidationSchema } from '@Containers/Auth/schema';

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
              <View style={{ justifyContent: 'center' }}>
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
                      <EyeIcon
                        name={eyeOpen ? 'eye-outline' : 'eye-off-outline'}
                        size={24}
                        color={colors.black}
                        style={{ position: 'absolute', top: 28, right: 8 }}
                        onPress={onEyePress}
                      />
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
            <KeyboardAwareFlatList
              enableOnAndroid={true}
              bounces={false}
              contentContainerStyle={{ flexGrow: 1 }}
              contentInsetAdjustmentBehavior="always"
              overScrollMode="always"
              data={data}
              keyExtractor={item => item.lable.toString()}
              renderItem={_renderInput}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={<VideoLoginComp />}
              ListHeaderComponentStyle={styles.listHeader}
              ListFooterComponentStyle={{ flexGrow: 0.4 }}
              ListFooterComponent={
                <View style={styles.listFooter}>
                  {isLogin && (
                    <TouchableOpacity>
                      <Text style={styles.txt}>Forgot Your Password?</Text>
                    </TouchableOpacity>
                  )}
                  <View style={{ flexGrow: 1 }}>
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
                  </View>
                </View>
              }
            />
          );
        }}
      </Formik>
    </View>
  );
};
