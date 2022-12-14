import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { connect, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { isEmpty } from 'lodash';
import { makeSelectIsRequesting, makeSelectMyPlant } from '@Containers/Home/store/selectors';

import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '@Navigators/homeNavigator';
import { RouteProp } from '@react-navigation/native';
import TopNavigationBar from '@Navigators/topNavigation';
import NetworkIcon from '@Components/iconSvg/home/NetworkIcon';
import PlantIcon from '@Components/iconSvg/pairing/Plant';
import { ImageBackgroundCompLayout } from '@Components/image-backgroundComp/index';
import NotConected from '@Components/iconSvg/home/NotConected';
import LoaderAnimationProgress from '@Components/lottie/loader';
import BottomTab from '@Containers/Home/components/BottomTab';
import { ButtonComp } from '@Components/button';
import Entypo from 'react-native-vector-icons/Entypo';

import { colors, fontFamily } from '@Theme/index';
import { HEIGHT, WIDTH } from '@Constants/app';
import { formatValueMQTT, qualityDay, showAlert } from '@Utils/helper';
import { PlantProps } from '@Containers/Home/store/interfaces';
import { ReportData } from '@Containers/Home/constants';
import { HomeActions } from '@Containers/Home/store/actions';
import ModalAlert from '@Components/modal/ModalAlert';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'PlantDetail'>;
type HomeScreenRouteProp = RouteProp<HomeStackParamList, 'PlantDetail'>;

interface IProps {
  isLoading: boolean;
  myPlant: PlantProps[];
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

const PlantDetailContainer = (props: IProps) => {
  const { navigation, route, myPlant } = props;
  const dispatch = useDispatch();
  const currentIndex = myPlant.findIndex((item: any, i: any) => item.uuid === route.params?.uuid);
  const currentPlantStatic = myPlant.filter((item: any, i: any) => item.uuid === route.params?.uuid)[0];
  let listRef: any = useRef(null);
  const [index, setIndex] = useState(currentIndex || 0);
  const [currentPlant, setCurrentPlant] = useState(currentPlantStatic || {});
  const [isRemovePlant, setDisableReamove] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: (p: any) => (
        <TopNavigationBar
          {...p}
          isLeft
          children={<Text style={styles.titleTab}>Over view</Text>}
          right={<Entypo name="dots-three-vertical" size={24} color={colors.black2} />}
          isOverview
          onRemove={handleShowModal}
          onNavigation={handleNavigationEditPlant}
        />
      ),
    });
  }, [navigation]);

  const handleNavigationEditPlant = () => {
    navigation.navigate('EditPlantInfo', { currentPlant });
  };

  const handleShowModal = () => {
    setDisableReamove(!isRemovePlant);
  };

  const handleRemovePlant = () => {
    dispatch(HomeActions.removePlant.request(currentPlant?.uuid));
    setDisableReamove(!isRemovePlant);
    navigation.goBack();
  };

  useEffect(() => {
    setCurrentPlant(currentPlantStatic);
  }, [myPlant]);

  const onChangeIndex = ({ index }: any) => {
    const current: PlantProps = myPlant.filter((item: any, i: any) => index === i)[0];
    setIndex(index);
    setCurrentPlant(current);
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
        <View style={styles.image}>{item.image}</View>
        <View style={styles.rightContainer}>
          <Text style={[styles.title, styles.fontFamily]}>{item.name}</Text>
          <Text style={[styles.subTitle, styles.fontFamily]}>
            {!isEmpty(currentPlant?.reported) && formatValueMQTT(currentPlant?.reported, item.name)}
          </Text>
        </View>
      </View>
    );
  };

  const navigateFanSpeed = () => {
    navigation.navigate('FanSpeedScreen', { plant: currentPlant });
  };
  const navigateMoreInfo = () => {
    navigation.navigate('SoilDetailScreen', { plant: currentPlant });
  };

  const handleReconect = () => {};

  const renderScreen = ({ item, index }: { item: PlantProps; index: number }) => (
    <ImageBackgroundCompLayout
      children={
        <View style={styles.imageBg}>
          {!!item?.species_image ? (
            <Image
              source={{ uri: item?.species_image }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
            />
          ) : (
            <PlantIcon />
          )}
        </View>
      }
      source={require('@Assets/image-background/box-plant.png')}
      resizeMode="cover"
      imageStyle={{ flex: 1, width: '100%' }}
    />
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={{ flex: 2 }}>
            <Text style={styles.headerTitle}>{currentPlant?.name || ''}</Text>
            <Text style={styles.headerSubTitle}>{currentPlant?.species_name || ''}</Text>
          </View>
          <View style={styles.networkStyle}>
            {!currentPlant?.status && <NotConected />}
            <Text style={[{ color: !currentPlant?.status ? colors.red : colors.green1 }, styles.headerTitleLeft]}>
              Conected
            </Text>
            <NetworkIcon isConnectDevice={!currentPlant?.status} />
          </View>
        </View>

        <View style={styles.middleContainer}>
          <FlatList
            data={ReportData}
            keyExtractor={item => item.uuid.toString()}
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
            index={index}
            paginationStyleItem={styles.paginationDot}
            paginationStyleItemInactive={styles.itemInactive}
            paginationActiveColor={colors.black2}
            keyExtractor={(item, index) => `${index.toString()}_${item.uuid.toString}`}
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
                {!isEmpty(currentPlant) && (
                  <View style={styles.wateringText}>
                    <Text style={styles.mlText}>{currentPlant?.reported?.wtl || 0} ml</Text>
                    <Text style={styles.numText}>{!!currentPlant?.reported?.wtl ? qualityDay(currentPlant) : 0}</Text>
                    <Text style={styles.dayText}>days</Text>
                  </View>
                )}
                <LoaderAnimationProgress source={require('@Assets/lotties/water.json')} width={200} />
              </TouchableOpacity>
            }
            source={require('@Assets/image-background/beach.png')}
            resizeMode="contain"></ImageBackgroundCompLayout>
          <BottomTab onClickLeft={navigateMoreInfo} onClickRight={navigateFanSpeed} isDetail />
        </View>
        {!currentPlant?.status && (
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
      <ModalAlert
        visible={isRemovePlant}
        onCancle={() => setDisableReamove(!isRemovePlant)}
        onSub={handleRemovePlant}
      />
    </>
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
    paddingHorizontal: 20,
    marginRight: 20,
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
    backgroundColor: colors.green,
    borderRadius: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 13,
    lineHeight: 26,
    color: colors.grey06,
  },
  fontFamily: {
    fontFamily: fontFamily.Strawford,
  },
  subTitle: {
    fontSize: 16,
    color: colors.black2,
    fontWeight: '500',
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
    color: colors.green1,
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
