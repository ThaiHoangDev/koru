import React, { useRef, useState } from 'react';
import { StyleSheet, Image, Dimensions, View, Text, Platform } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { ButtonComp } from '@Components/button/index';
import IntroLogo1 from '@Components/iconSvg/intro/IntroLogo1';
import IntroLogo2 from '@Components/iconSvg/intro/IntroLogo2';
import IntroLogo3 from '@Components/iconSvg/intro/IntroLogo3';
import NextIcon from '@Components/iconSvg/intro/NextIcon';

import { fontFamily, colors } from '@Theme/index';
import { AppActions } from '@Containers/App/store/actions';

interface IPropIntro {
  txtBtn: string;
  title: string;
  image: React.ReactNode;
  subtitle: string;
}

const DATA: IPropIntro[] = [
  {
    txtBtn: 'Get Started',
    title: 'Smart tree planting',
    image: <IntroLogo1 />,
    subtitle: 'Have a nice day. Choose the right tree to plant.',
  },
  {
    txtBtn: 'Next',
    title: 'Smart pots',
    image: <IntroLogo2 />,
    subtitle: 'And smart features will help plants grow comprehensively',
  },
  {
    txtBtn: 'Let’s try',
    title: 'Easy to use',
    image: <IntroLogo3 />,
    subtitle: 'And smart features will help plants grow comprehensively',
  },
];

export default function IntroScreen() {
  const dispatch = useDispatch();
  let listRef: any = useRef(null);
  const navigation: any = useNavigation();

  const [index, setIndex] = useState(0);

  const getStarted = () => {};

  const handleNext = () => {
    setIndex(listRef.current.getCurrentIndex() + 1);
    listRef.current.scrollToIndex({
      index: listRef.current.getCurrentIndex() + 1,
    });
  };

  const onChangeIndex = ({ index }: any) => setIndex(index);

  const handleIntro = () => {
    if (index === 0 || index === 1) {
      handleNext();
    }
    if (index === 2) {
      dispatch(AppActions.introApp(true));
    }
  };

  const renderScreen = ({ item, index }: any) => (
    <View style={[styles.containerScreen]}>
      <View style={{ marginTop: 80, flex: 1.4, alignItems: 'center', justifyContent: 'center' }}>{item.image}</View>
      <View style={{ marginVertical: 16 }}>
        <Text style={[styles.title, styles.fontFamily]}>{item.title}</Text>
      </View>
      <View style={{ marginBottom: 60 }}>
        <Text style={[styles.subtitle, styles.fontFamily]}>{item.subtitle}</Text>
      </View>
      <View style={{ flex: 0.2 }}>
        <ButtonComp title={'Skip now'} handlePress={handleIntro} stylesTitle={[styles.textSkip, styles.fontFamily]} />
      </View>
      <View style={[styles.doneWrap, { flex: 0.2, marginTop: 20 }]}>
        <ButtonComp
          title={item.txtBtn}
          handlePress={handleIntro}
          stylesBtn={styles.btn}
          stylesTitle={[styles.txtBtn, styles.fontFamily]}
          icon={index === 1 ? <NextIcon /> : undefined}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeView} edges={['bottom', 'top']}>
      <SwiperFlatList
        renderAll
        showPagination
        ref={listRef}
        autoplayLoopKeepAnimation
        data={DATA}
        renderItem={renderScreen}
        paginationStyle={{ top: Platform.OS === 'ios' ? 50 : 30 }}
        paginationStyleItem={styles.paginationDot}
        paginationStyleItemInactive={styles.itemInactive}
        paginationStyleItemActive={{ width: 30 }}
        paginationActiveColor={'#191919'}
        keyExtractor={(item, index) => index.toString()}
        onChangeIndex={onChangeIndex}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeView: { flex: 1 },
  containerScreen: {
    flex: 1,
    width: Dimensions.get('screen').width,
    flexDirection: 'column',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 50,
    marginHorizontal: 8,
  },
  itemInactive: { backgroundColor: '#CBCBCB' },
  title: {
    fontSize: 24,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 16,
    width: 300,
    fontWeight: '500',
    color: colors.grey06,
    textAlign: 'center',
  },
  doneWrap: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 34,
    bottom: 10,
  },
  getStarted: {
    bottom: 40,
    width: '100%',
  },
  nextIcon: { width: 18, height: 18 },
  mr39: { position: 'absolute', bottom: 50, right: 30 },
  btn: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: '#191919',
  },
  txtBtn: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 90,
    marginLeft: 120,
  },
  fontFamily: {
    fontFamily: fontFamily.Strawford,
  },
  textSkip: { color: colors.grey06, fontSize: 13 },
});
