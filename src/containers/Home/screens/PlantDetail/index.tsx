import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import SwiperFlatList from 'react-native-swiper-flatlist';

import { connect, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { HomeActions } from '@Containers/Home/store/actions';
import { createStructuredSelector } from 'reselect';
import { makeSelectIsRequesting, makeSelectMyPlant } from '@Containers/Home/store/selectors';

import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '@Navigators/homeNavigator';
import { RouteProp } from '@react-navigation/native';
import TopNavigationBar from '@Navigators/topNavigation';
import NetworkIcon from '@Components/iconSvg/home/NetworkIcon';
import PlantIcon from '@Components/iconSvg/pairing/Plant';

import { colors, fontFamily } from '@Theme/index';

import Plant from '@Components/iconSvg/pairing/Plant';
import { ImageBackgroundCompLayout } from '@Components/image-backgroundComp/index';
import { HEIGHT, WIDTH } from '@Constants/app';
import PantBox from '@Containers/Pairing/components/PlantBox';
import LoaderAnimationProgress from '@Components/lottie/loader';
import BottomTab from '@Containers/Home/components/BottomTab';
import NotConected from '@Components/iconSvg/home/NotConected';
import { ButtonComp } from '@Components/button';
import { showAlert } from '@Utils/helper';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'PlantDetail'>;
type HomeScreenRouteProp = RouteProp<HomeStackParamList, 'PlantDetail'>;

interface IProps {
  isLoading: boolean;
  myPlant: any;
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

const PlantDetailContainer = (props: IProps) => {
  const { navigation, route, myPlant } = props;
  let listRef: any = useRef(null);
  const [index, setIndex] = useState(0);
  const disconected = false;
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [plantId, setPlantId] = useState('');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: (p: any) => <TopNavigationBar {...p} isLeft children={<Text style={styles.titleTab}>Over view</Text>} />,
    });
  }, [navigation]);

  useEffect(() => {
    const payload = {
      page,
      perpage: 10,
      search: '',
    };
    dispatch(HomeActions.getMyPlant.request(payload));
  }, [page, dispatch]);

  const onChangeIndex = ({ index }: any) => {
    setIndex(index);
    setPlantId(myPlant.filter((item: any, i: any) => index === i).uuid);
  };

  const handleNextPlant = () => {
    if (listRef.current.getCurrentIndex() < myPlant.length - 1) {
      setIndex(listRef.current.getCurrentIndex() + 1);
      listRef.current.scrollToIndex({
        index: listRef.current.getCurrentIndex() + 1,
      });
    } else {
      showAlert('', 'Empty data!');
    }
  };

  const _renderItem = ({ item }: any) => {
    return (
      <View style={styles.containerItem}>
        <View style={styles.image}>
          <Image
            source={{ uri: item?.uri || '', width: 40, height: 40 }}
            resizeMode="contain"
            style={{ borderRadius: 10, top: -HEIGHT / 100 }}></Image>
        </View>
        <View style={styles.rightContainer}>
          <Text style={[styles.title, styles.fontFamily]}>{item?.name}</Text>
          <Text style={[styles.subTitle, styles.fontFamily]}>{item?.type}</Text>
        </View>
      </View>
    );
  };

  const navigateFanSpeed = () => {
    navigation.navigate('FanSpeedScreen');
  };
  const navigateMoreInfo = () => {
    navigation.navigate('SoilDetailScreen', { uuid: plantId });
  };

  const handleReconect = () => {};

  const renderScreen = ({ item, index }: any) => (
    <ImageBackgroundCompLayout
      children={
        <View style={styles.imageBg}>
          {!!item?.image_url ? <Image source={{ uri: item?.image_url }} /> : <PlantIcon />}
        </View>
      }
      source={require('@Assets/image-background/box-plant.png')}
      resizeMode="cover"
      imageStyle={{ flex: 1, width: '100%' }}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{ flex: 2 }}>
          <Text style={styles.headerTitle}>Balu</Text>
          <Text style={styles.headerSubTitle}>Monstera</Text>
        </View>
        <View style={styles.networkStyle}>
          {disconected && <NotConected />}
          <Text style={[{ color: disconected ? colors.red : colors.green1 }, styles.headerTitleLeft]}>Conected</Text>
          <NetworkIcon disconected={disconected} />
        </View>
      </View>

      <View style={styles.middleContainer}>
        <FlatList
          data={myPlant}
          keyExtractor={item => item.toString()}
          renderItem={_renderItem}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, paddingTop: 30 }}
          ListFooterComponent={<View style={{ height: 20 }}></View>}
        />
        <SwiperFlatList
          renderAll
          showPagination
          ref={listRef}
          autoplayLoopKeepAnimation
          data={myPlant}
          renderItem={renderScreen}
          paginationStyle={{
            position: 'absolute',
            width: WIDTH / 2,
            right: 0,
          }}
          paginationStyleItem={styles.paginationDot}
          paginationStyleItemInactive={styles.itemInactive}
          paginationActiveColor={colors.black2}
          keyExtractor={(item, index) => index.toString()}
          onChangeIndex={onChangeIndex}
          style={{ flex: 1 }}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleNextPlant}>
          <Text style={styles.networkWater}>Next watering</Text>
        </TouchableOpacity>
        <ImageBackgroundCompLayout
          children={
            <TouchableOpacity style={styles.bgLayout}>
              <View style={styles.wateringText}>
                <Text style={styles.mlText}>430 ml</Text>
                <Text style={styles.numText}>5</Text>
                <Text style={styles.dayText}>days</Text>
              </View>
              <LoaderAnimationProgress source={require('@Assets/lotties/water.json')} width={200} />
            </TouchableOpacity>
          }
          source={require('@Assets/image-background/beach.png')}
          resizeMode="contain"></ImageBackgroundCompLayout>
        <BottomTab onClickLeft={navigateMoreInfo} onClickRight={navigateFanSpeed} isDetail />
      </View>
      {disconected && (
        <View style={styles.reconnectBtn}>
          <ButtonComp
            title={'Reconnect'}
            handlePress={handleReconect}
            stylesBtn={styles.btn}
            stylesTitle={styles.titleBtn}
            isLoading={false}
          />
        </View>
      )}
    </View>
  );
};
const mapStateToProps = createStructuredSelector({
  myPlant: makeSelectMyPlant(),
  isLoading: makeSelectIsRequesting(),
});

export default connect(mapStateToProps)(PlantDetailContainer);

const styles = StyleSheet.create({
  titleTab: {
    fontFamily: fontFamily.FreightBigProMedium,
    fontSize: 32,
    textAlign: 'center',
    color: colors.black2,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  networkStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 20, paddingHorizontal: 20 },
  middleContainer: { flex: 1, justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 20 },
  containerScreen: {
    flex: 1,
    width: Dimensions.get('screen').width,
    flexDirection: 'column',
    alignItems: 'center',
  },
  containerItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  image: {
    position: 'relative',
    backgroundColor: colors.green,
    borderRadius: 10,
  },
  imageBg: {
    flex: 1,
    width: WIDTH / 2 - 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  headerTitle: {
    fontFamily: fontFamily.Strawford,
    color: colors.black2,
    fontSize: 24,
  },
  headerSubTitle: {
    fontFamily: fontFamily.Strawford,
    color: colors.grey06,
    fontSize: 16,
  },
  headerTitleLeft: {
    fontFamily: fontFamily.Strawford,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.black2,
  },
  fontFamily: {
    fontFamily: fontFamily.Strawford,
  },
  subTitle: {
    fontSize: 13,
    color: colors.grey06,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 50,
    marginHorizontal: 8,
  },
  itemInactive: { backgroundColor: colors.gray04 },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wateringText: {
    position: 'absolute',
    right: WIDTH / 2.4,
    top: 40,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mlText: {
    fontSize: 16,
    color: colors.green,
    fontFamily: fontFamily.Strawford,
  },
  numText: {
    fontSize: 48,
    color: colors.black2,
    fontFamily: fontFamily.Strawford,
  },
  dayText: {
    fontSize: 32,
    color: colors.black2,
    fontFamily: fontFamily.Strawford,
  },
  networkWater: {
    marginHorizontal: 6,
    color: colors.green2,
    fontSize: 16,
    fontFamily: fontFamily.Strawford,
  },
  bgLayout: {
    position: 'relative',
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reconnectBtn: {
    backgroundColor: 'rgba(251, 251, 251, 0.75)',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    height: '90%',
    zIndex: 2,
    bottom: 0,
    position: 'absolute',
  },
  btn: {
    position: 'absolute',
    backgroundColor: colors.red,
    marginHorizontal: 40,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 25,
    width: WIDTH / 1.3,
    bottom: 60,
  },
  titleBtn: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: fontFamily.Strawford,
  },
});
