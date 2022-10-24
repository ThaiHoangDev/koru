import React, { useState } from 'react';
import { Text, TextStyle, View, KeyboardTypeOptions, TextInputProps, TouchableOpacity } from 'react-native';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { Formik, FormikErrors } from 'formik';

import TextInputComp from '@Components/input';
import { ButtonComp } from '@Components/button';
import VideoLoginComp from '@Components/videos/VideoLoginComp';

import styles from './styles';
import { colors } from '@Theme/index';
import { LoginPayload } from '@Containers/Auth/interfaces';

interface IProps extends TextInputProps {
  data: any;
  stylesTxt?: TextStyle | TextStyle[];
  handleLogin: (values: LoginPayload) => void;
  title: string;
  type?: KeyboardTypeOptions;
  isLogin: boolean;
  initialValues: any;
}

export const FormComp = ({ data, handleLogin, stylesTxt, title, type, isLogin, initialValues, ...rest }: IProps) => {
  const navigation: any = useNavigation();

  const goToSignUp = () => {
    navigation.navigate('Login', { isLogin: !isLogin });
  };

  return (
    <View style={styles.root}>
      <Formik initialValues={initialValues} onSubmit={handleLogin}>
        {({ handleChange, handleSubmit, values, errors, isValid }) => {
          const _renderInput = ({ item }: any) => {
            return (
              <TextInputComp
                {...rest}
                nativeID={item.value}
                label={item.lable}
                value={values[item.value] || ''}
                placeholder={item.element}
                handleChangeText={handleChange(item.value + '')}
                stylesTxt={styles.txtContainer}
                selectionColor={colors.black}
                secureTextEntry={item.value === 'password'}
                error={!!errors[item.value + '']}
                // keyboardType={item.type}
              />
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
              ListHeaderComponentStyle={{ flex: 0.6, alignItems: 'center', justifyContent: 'center' }}
              ListFooterComponentStyle={{ flex: 0.2 }}
              ListFooterComponent={
                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  {isLogin && (
                    <TouchableOpacity>
                      <Text style={styles.txt}>Forgot Your Password?</Text>
                    </TouchableOpacity>
                  )}
                  <View style={{ marginTop: isLogin ? 100 : 60 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
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
