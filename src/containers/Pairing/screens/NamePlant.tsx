import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Formik, ErrorMessage } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import TopNavigationBar from '@Navigators/topNavigation';
import { PropsScreen } from '@Interfaces/app';
import TextInputComp from '@Components/input';
import { ButtonComp } from '@Components/button';
import Plant from '@Components/iconSvg/pairing/Plant';
import Balloons from '@Components/iconSvg/pairing/Balloons';

import { colors, fontFamily } from '@Theme/index';
import { PairActions } from '../store/actions';

import { makeSelectIsRequesting, makeSelectUuidConnected } from '../store/selectors';
import { namePlantValidationSchema } from '../schema';
import { HEIGHT, IS_ANDROID, WIDTH } from '@Constants/app';

interface InitvalueProps {
  namePlant: string;
}

interface IProps extends PropsScreen {
  bluetooth_uid: string;
  isLoading: boolean;
}
const initialValues: InitvalueProps = {
  namePlant: '',
};

const NamePlantContainer = (props: IProps) => {
  const { bluetooth_uid, isLoading, ...rest } = props;
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: (p: any) => (
        <TopNavigationBar {...p} isLeft children={<Text style={styles.txtTitle}>Name Plants</Text>} />
      ),
    });
  }, [navigation]);

  const handleScanWifi = (values: InitvalueProps) => {
    const body = {
      name: values.namePlant,
      bluetooth_uid: bluetooth_uid || '',
      species: route.params?.plant?.uuid || '',
    };
    dispatch(PairActions.createPlant.request(body));
  };

  return (
    <KeyboardAwareScrollView style={styles.root} showsVerticalScrollIndicator={false} enableOnAndroid scrollEnabled>
      <Formik
        initialValues={initialValues}
        onSubmit={handleScanWifi}
        validationSchema={namePlantValidationSchema}
        enableReinitialize>
        {({ handleSubmit, handleChange, values, errors }) => {
          return (
            <View style={{ flex: 1, height: HEIGHT / 1.16 }}>
              <View style={{ flex: 0.2, marginTop: 30, height: HEIGHT / 5 }}>
                <TextInputComp
                  clearTextOnFocus={true}
                  value={values.namePlant}
                  label={'Enter New name'}
                  placeholder="New name"
                  stylesTxt={styles.textInput}
                  handleChangeText={handleChange('namePlant')}
                  placeholderTextColor={colors.black2}
                  underlineColor={colors.black2}
                />
                <ErrorMessage
                  name={values.namePlant}
                  children={() => <Text style={styles.errorMessage}>{errors.namePlant}</Text>}
                />
              </View>
              <View
                style={{
                  alignSelf: 'flex-end',
                  marginHorizontal: 20,
                  position: 'absolute',
                  zIndex: 3,
                  bottom: HEIGHT / 2,
                  right: 30
                }}>
                <View
                  style={{
                    backgroundColor: colors.green,
                    borderBottomLeftRadius: 120,
                    borderBottomRightRadius: 80,
                    borderTopLeftRadius: 260,
                    borderTopRightRadius: 160,
                    width: WIDTH / 3,
                    height: HEIGHT / 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                  }}>
                  <Text
                    style={{ color: colors.black2, fontSize: 13, fontWeight: '700', fontFamily: fontFamily.Strawford }}>
                    Please Name me !
                  </Text>
                </View>
                <Balloons />
              </View>
              <View style={{ flexGrow: 0.6, bottom: 10, marginTop: HEIGHT / 5 }}>
                {!!route.params?.plant?.image_url ? (
                  <Image source={{ uri: route.params?.plant?.image_url }} resizeMode="cover" style={{ flexGrow: 1 }} />
                ) : (
                  <View
                    style={{ flexGrow: 0.6, alignItems: 'center', justifyContent: 'center' }}>
                    <Plant width={WIDTH / 1.5} height={HEIGHT / 5} />
                  </View>
                )}
              </View>

              <View style={{ flex: 0.2 }}>
                <ButtonComp
                  title={'Grow Plant'}
                  handlePress={handleSubmit}
                  stylesBtn={styles.btn}
                  stylesTitle={styles.titleBtn}
                  isLoading={isLoading}
                  disabled={isLoading}
                />
              </View>
            </View>
          );
        }}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsRequesting(),
  bluetooth_uid: makeSelectUuidConnected(),
});

export default connect(mapStateToProps)(NamePlantContainer);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.white2,
  },
  txtTitle: {
    fontFamily: fontFamily.FreightBigProMedium,
    fontSize: 32,
    color: colors.black2
  },
  btn: {
    backgroundColor: colors.black2,
    borderRadius: 25,
  },
  titleBtn: {
    color: colors.white,
  },
  errorMessage: {
    color: colors.error,
    textAlign: 'left',
    marginHorizontal: 40,
    marginBottom: 10,
    fontFamily: fontFamily.Strawford,
  },
  textInput: {
    paddingHorizontal: 0,
  },
});
