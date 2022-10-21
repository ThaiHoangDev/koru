import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
//components
import TopNavigationBar from '@Navigators/topNavigation';
import MenuIcon from '@Components/iconSvg/MenuIcon';
import SearchComp from '@Containers/Home/components/SearchComp';
import AddIcon from '@Components/iconSvg/AddIcon';
import { PropsScreen } from '@Interfaces/app';

import { fontFamily } from '@Theme/index';

interface IProps extends PropsScreen {}

export default function HomeContainer(props: IProps) {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: (p: any) => (
        <TopNavigationBar {...p} children={<Text style={styles.titleTab}>{'My Koru'}</Text>} right={<MenuIcon />} />
      ),
    });
  }, [navigation, route]);

  const handleGoToPairing = () => {
    navigation.navigate('Paring');
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.headerContainer}>
        <SearchComp />
        <TouchableOpacity style={styles.addContainer} onPress={handleGoToPairing}>
          <AddIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
  },
  titleTab: {
    fontFamily: fontFamily.FreightBigProMedium,
    fontSize: 32,
    textAlign: 'center',
  },
  addContainer: {
    width: 50,
    alignItems: 'flex-end',
  },
});
