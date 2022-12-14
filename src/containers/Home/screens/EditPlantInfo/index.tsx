import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-native-modal';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik, ErrorMessage } from 'formik';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { HomeActions } from '@Containers/Home/store/actions';

import { HomeStackParamList } from '@Navigators/homeNavigator';
import TopNavigationBar from '@Navigators/topNavigation';

import { ButtonComp } from '@Components/button';
import TextInputComp from '@Components/input';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EditPlantSpaciesContainer from '../EditPlantSpacies';

import { colors, fontFamily } from '@Theme/index';
import { HEIGHT, WIDTH } from '@Constants/app';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'EditPlantInfo'>;
type HomeScreenRouteProp = RouteProp<HomeStackParamList, 'EditPlantInfo'>;

interface IProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

interface FormValues {
  name: string;
  species: string;
}

export const editPlantSchema = yup.object().shape({
  name: yup.string().required('Full Name field is Required'),
  species: yup.string(),
});

const EditPlantInfoContainer = (props: IProps) => {
  const { navigation, route } = props;
  const dispatch = useDispatch();
  const initialValues: FormValues = {
    name: route.params?.currentPlant?.name || '',
    species: route.params?.currentPlant?.species || '',
  };

  const [isVisible, setVisible] = useState(false);
  const [speciesSelect, setSpeciesSelect] = useState(route.params?.currentPlant.species_name);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: (p: any) => (
        <TopNavigationBar {...p} isLeft children={<Text style={styles.titleTab}>{'Edit Information'}</Text>} />
      ),
    });
  }, [navigation]);

  const handleEditPlant = (values: FormValues) => {
    dispatch(HomeActions.updatePlant.request(values));
  };

  return (
    <KeyboardAwareScrollView>
      <Formik
        initialValues={initialValues}
        onSubmit={handleEditPlant}
        validationSchema={editPlantSchema}
        enableReinitialize>
        {({ handleChange, handleSubmit, values, errors, touched }) => {
          const handleEditSpecies = (species: any) => {
            setSpeciesSelect(species.name);
            handleChange('species')(species.uuid);
          };

          return (
            <>
              <View style={{ flex: 1 }}>
                <View style={{ flex: 1, height: HEIGHT / 1.36 }}>
                  <TextInputComp
                    clearTextOnFocus={!!errors.name && !!touched.name}
                    label={'Full Name'}
                    value={values.name || ''}
                    placeholder={'Balu'}
                    underlineColor={colors.black}
                    placeholderTextColor={colors.black}
                    handleChangeText={handleChange('name')}
                    stylesTxt={styles.txtContainer}
                    selectionColor={colors.black}
                    error={!!errors.name && !!touched.name}
                  />
                  <ErrorMessage name={'name'} children={() => <Text style={styles.errorMessage}>{errors.name}</Text>} />
                  <View style={{ marginHorizontal: 40 }}>
                    <Text style={styles.txtContainer}>Choose Species</Text>
                    <View
                      style={{
                        height: 50,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: colors.grey06,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 10,
                      }}>
                      <Text style={[styles.txtContainer]}>{speciesSelect}</Text>
                      <TouchableHighlight onPress={() => setVisible(true)} activeOpacity={0.6}>
                        <AntDesign name="downsquare" color={colors.black2} style={{ borderRadius: 8 }} size={32} />
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
                <ButtonComp
                  stylesBtn={[styles.btn]}
                  title={'Save'}
                  handlePress={handleSubmit}
                  isLoading={false}
                  stylesTitle={styles.titleBtn}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Modal
                  isVisible={isVisible}
                  animationIn="slideInUp"
                  avoidKeyboard
                  scrollHorizontal
                  swipeDirection="down"
                  style={{ margin: 0, paddingTop: 20 }}
                  propagateSwipe
                  swipeThreshold={200}
                  onSwipeComplete={() => setVisible(false)}
                  deviceHeight={HEIGHT}
                  deviceWidth={WIDTH}
                  coverScreen
                  onBackdropPress={() => setVisible(false)}>
                  <View style={{ flex: 1, backgroundColor: '#fff', borderTopRightRadius: 16, borderTopLeftRadius: 16 }}>
                    <EditPlantSpaciesContainer onClick={handleEditSpecies} />
                  </View>
                </Modal>
              </View>
            </>
          );
        }}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

export default EditPlantInfoContainer;

const styles = StyleSheet.create({
  titleTab: {
    fontFamily: fontFamily.FreightBigProMedium,
    fontSize: 32,
    textAlign: 'center',
    color: colors.black2,
  },
  txtContainer: {
    paddingHorizontal: 2,
    marginVertical: 10,
    fontSize: 16,
    fontFamily: fontFamily.Strawford,
    color: colors.black2,
  },
  errorMessage: {
    color: colors.error,
    textAlign: 'left',
    marginHorizontal: 40,
    marginBottom: 10,
    marginTop: -10,
    fontFamily: fontFamily.Strawford,
  },
  btn: {
    backgroundColor: colors.black2,
    marginHorizontal: 40,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 25,
    marginBottom: 20,
    shadowColor: colors.green1,
    shadowOpacity: 0.33,
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowRadius: 2.22,
    elevation: 3,
  },
  titleBtn: {
    color: colors.white,
  },
});
