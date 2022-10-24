import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import TopNavigationBar from '@Navigators/topNavigation';
import { PropsScreen } from '@Interfaces/app';
import TextInputComp from '@Components/input';
import { ButtonComp } from '@Components/button';

import { colors, fontFamily } from '@Theme/index';

const NamePlantContainer = (props: PropsScreen) => {
  const navigation: any = useNavigation();
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
    navigation.navigate('ChooseWifi');
  };

  return (
    <View style={styles.root}>
      <View style={{ flex: 0.1, marginTop: 30 }}>
        <TextInputComp
          value={newName}
          handleChangeText={handleChangeText}
          label={'Enter New name'}
          stylesTxt={{ marginVertical: 4, paddingVertical: 4 }}
          placeholder="new plant"
        />
      </View>

      <View style={{ flex: 0.8, marginHorizontal: 28 }}></View>
      <View style={{ flex: 0.1, marginHorizontal: 28 }}>
        <ButtonComp
          title={'Grow Plant'}
          handlePress={handleScanWifi}
          stylesBtn={styles.btn}
          stylesTitle={styles.titleBtn}
        />
      </View>
    </View>
  );
};

export default NamePlantContainer;

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
