import { Dimensions, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import SwiperFlatList from 'react-native-swiper-flatlist';

import { HomeStackParamList } from '@Navigators/homeNavigator';
import { colors, fontFamily } from '@Theme/index';
import BottomTab from '@Containers/Home/components/BottomTab';
import MoreInfo from '@Containers/Home/components/MoreInfo';
import TopNavigationBar from '@Navigators/topNavigation';
import MenuIcon from '@Components/iconSvg/MenuIcon';

type SoilDetailScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'SoilDetailScreen'>;
type SoilDetailScreenRouteProp = RouteProp<HomeStackParamList, 'SoilDetailScreen'>;

interface IProps {
  isLoading: boolean;
  navigation: SoilDetailScreenNavigationProp;
  route: SoilDetailScreenRouteProp;
}

interface IPropIntro {
  title: string;
}

const DATA: IPropIntro[] = [
  {
    title: 'More info',
  },
  {
    title: 'Chart',
  },
];

const SoilDetailContainer = (props: IProps) => {
  let listRef: any = useRef(null);
  const navigation: any = useNavigation();
  const [index, setIndex] = useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: (p: any) => (
        <TopNavigationBar
          {...p}
          isLeft
          children={<Text style={styles.titleTab}>{DATA[index].title}</Text>}
          right={<MenuIcon />}
        />
      ),
    });
  }, [navigation, index]);

  const navigateFanSpeed = () => {
    navigation.navigate('FanSpeedScreen');
  };

  const navigateMoreInfo = () => {
    navigation.navigate('SoilDetailScreen');
  };

  const onChangeIndex = ({ index }: any) => setIndex(index);

  const renderScreen = ({ item, index }: any) => <MoreInfo data={item} index={index} />;

  return (
    <SafeAreaView style={styles.safeView}>
      <SwiperFlatList
        renderAll
        showPagination
        ref={listRef}
        autoplayLoopKeepAnimation
        data={DATA}
        renderItem={renderScreen}
        paginationStyle={{ top: 0 }}
        paginationStyleItem={styles.paginationDot}
        paginationStyleItemInactive={styles.itemInactive}
        paginationActiveColor={'#191919'}
        keyExtractor={(item, index) => index.toString()}
        onChangeIndex={onChangeIndex}
      />
      <View style={{ flex: 0.1, justifyContent: 'center' }}>
        <BottomTab onClickLeft={navigateMoreInfo} onClickRight={navigateFanSpeed} />
      </View>
    </SafeAreaView>
  );
};

export default SoilDetailContainer;

const styles = StyleSheet.create({
  titleTab: {
    fontFamily: fontFamily.FreightBigProMedium,
    fontSize: 32,
    textAlign: 'center',
    color: colors.black2,
  },
  safeView: { flex: 1 },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 50,
    marginHorizontal: 8,
  },
  itemInactive: { backgroundColor: '#CBCBCB' },
});
