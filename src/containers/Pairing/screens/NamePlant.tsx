import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import TopNavigationBar from '@Navigators/topNavigation';
import { PropsScreen } from '@Interfaces/app';
import TextInputComp from '@Components/input';
import { ButtonComp } from '@Components/button';

import { colors, fontFamily } from '@Theme/index';
import { PairActions } from '../store/actions';

import { makeSelectIsRequesting, makeSelectUuid, makeSelectUuidConnected } from '../store/selectors';

interface IProps extends PropsScreen {
  bluetooth_uid: string;
  isLoading: boolean;
}

const NamePlantContainer = (props: IProps) => {
  const { bluetooth_uid, isLoading, ...rest } = props;
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const dispatch = useDispatch();
  const [newName, setNewName] = useState('');
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: (p: any) => (
        <TopNavigationBar {...p} isLeft children={<Text style={styles.txtTitle}>Name Plants</Text>} />
      ),
    });
  }, [navigation]);

  const handleChangeText = (text: string) => {
    setNewName(text);
  };
  const handleScanWifi = () => {
    const body = {
      name: newName,
      bluetooth_uid: bluetooth_uid || '',
      species: route.params?.plant?.uuid || '',
    };
    console.log(body, 'bodyCreatePlant________');
    dispatch(PairActions.createPlant.request(body));
  };

  return (
    <View style={styles.root}>
      <View style={{ flex: 0.2, marginTop: 30 }}>
        <TextInputComp
          value={newName}
          handleChangeText={handleChangeText}
          label={'Enter New name'}
          placeholder="New name"
        />
      </View>
      <View style={{ flex: 0.7, marginHorizontal: 28 }}>
        <Image source={{ uri: route.params?.plant?.image_url }} resizeMode="contain" style={{ flex: 1 }} />
      </View>
      <View style={{ flex: 0.1, marginHorizontal: 28 }}>
        <ButtonComp
          title={'Grow Plant'}
          handlePress={handleScanWifi}
          stylesBtn={styles.btn}
          stylesTitle={styles.titleBtn}
          isLoading={isLoading}
        />
      </View>
    </View>
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
  },
  txtTitle: {
    fontFamily: fontFamily.FreightBigProMedium,
    fontSize: 32,
  },
  btn: {
    backgroundColor: colors.black2,
    borderRadius: 25,
  },
  titleBtn: {
    color: colors.white,
  },
});
