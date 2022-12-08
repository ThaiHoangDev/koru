import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import SwiperFlatList from 'react-native-swiper-flatlist';
//redux

// utils
import { HomeStackParamList } from '@Navigators/homeNavigator';

//component
import BottomTab from '@Containers/Home/components/BottomTab';
import MoreInfo from '@Containers/Home/components/MoreInfo';
import TopNavigationBar from '@Navigators/topNavigation';
import MenuIcon from '@Components/iconSvg/MenuIcon';
//assets
import { colors, fontFamily } from '@Theme/index';
import { IS_ANDROID } from '@Constants/app';

type SoilDetailScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'SoilDetailScreen'>;
type SoilDetailScreenRouteProp = RouteProp<HomeStackParamList, 'SoilDetailScreen'>;

interface IProps {
  navigation: SoilDetailScreenNavigationProp;
  route: SoilDetailScreenRouteProp;
}

interface IPropIntro {
  uuid: number;
  title: string;
}

const DATA: IPropIntro[] = [
  {
    uuid: 1,
    title: 'About plant',
  },
  {
    uuid: 2,
    title: 'More info',
  },
  {
    uuid: 3,
    title: 'Chart',
  },
];

const SoilDetailContainer = (props: IProps) => {
  const { route } = props;
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
    navigation.navigate('FanSpeedScreen', { plant: route.params?.plant });
  };

  const navigateMoreInfo = () => {
    navigation.navigate('SoilDetailScreen', { plant: route.params?.plant });
  };

  const onChangeIndex = ({ index }: { index: number }) => setIndex(index);

  const renderScreen = ({ item, index }: any) => <MoreInfo data={item} plant={route.params?.plant} />;

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
        paginationActiveColor={colors.black2}
        keyExtractor={(item, index) => index.toString()}
        onChangeIndex={onChangeIndex}
      />
      <View style={{ flex: 0.2, justifyContent: 'center', marginBottom: IS_ANDROID ? 20 : 10 }}>
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
  itemInactive: { backgroundColor: colors.gray04 },
});
