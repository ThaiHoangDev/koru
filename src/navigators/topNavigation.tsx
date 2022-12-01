import React, { useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Animated, FlatList, Easing, PanResponder } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Entypo';

import HomeIcon from '@Components/iconSvg/home/HomeIcon';
import ShopIcon from '@Components/iconSvg/home/ShopIcon';
import SettingIcon from '@Components/iconSvg/home/SettingIcon';

import { colors, fontFamily } from '@Theme/index';
import { HEIGHT, WIDTH } from '@Constants/app';

interface IProps {
  children?: any;
  right?: any;
  isLeft?: boolean;
  stylesTop?: any;
}

const DATA = [
  { label: 'My plant', icon: <HomeIcon isActive={false} />, screen: 'Home' },
  { label: 'Shop', icon: <ShopIcon isActive={false} />, screen: 'Shop' },
  { label: 'Setting', icon: <SettingIcon isActive={false} />, screen: 'Setting' },
];

export default function TopNavigationBar(props: IProps) {
  const navigation: any = useNavigation();
  const { children, right, isLeft, stylesTop, ...rest } = props;
  const [showMenu, setShowMenu] = useState(false);
  const showAnimation = useRef(new Animated.Value(0)).current;

  const opacityInterpolate = showAnimation.interpolate({
    inputRange: [0, 0.6, 1],
    outputRange: [0, 0, 1],
  });

  const h = showAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 110],
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        setShowMenu(false);
      },
    }),
  ).current;

  const backButtonOnPress = () => {
    navigation.goBack();
  };

  const handleNavigationTab = (item: any) => () => {
    navigation.navigate(item.screen);
    handleShowMenu();
  };

  const handleShowMenu = () => {
    const toValue = showMenu ? 0 : 1;
    Animated.timing(showAnimation, {
      toValue,
      duration: 200,
      isInteraction: true,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
    setShowMenu(!showMenu);
  };

  const _renderItem = ({ item }: any) => {
    return (
      <Animated.View
        style={{
          marginVertical: 10,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={handleNavigationTab(item)}>
          <Text style={styles.menuLabel}>{item.label}</Text>
          {item.icon}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView edges={['top']} style={[styles.container, stylesTop]}>
      <View style={{ flex: 0.2, alignItems: 'flex-start' }}>
        {isLeft && (
          <TouchableOpacity style={styles.backButton} onPress={backButtonOnPress}>
            <Icon name="chevron-thin-left" size={24} color={colors.black} />
          </TouchableOpacity>
        )}
      </View>
      <View style={[styles.content, { flex: 0.6 }]}>{children}</View>
      <TouchableOpacity
        onPress={handleShowMenu}
        style={[styles.right, { flex: 0.2, zIndex: 20, alignSelf: 'flex-end', alignContent: 'flex-end' }]}>
        {right}
      </TouchableOpacity>

      <Animated.View
        {...panResponder.panHandlers}
        style={{
          position: 'absolute',
          zIndex: 1,
          flex: 1,
          top: showMenu ? 0 : -HEIGHT - 80,
          width: WIDTH,
          height: HEIGHT,
          alignItems: 'flex-end',
        }}></Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          zIndex: 1,
          flex: 1,
          right: 10,
          top: showMenu ? 0 : -HEIGHT - 80,
          opacity: opacityInterpolate,
          width: WIDTH,
          transform: [
            {
              translateY: h,
            },
          ],
          flexDirection: 'row',
        }}>
        <View {...panResponder.panHandlers} style={{ width: WIDTH / 2, height: 145 }}></View>
        <FlatList
          data={DATA}
          keyExtractor={item => item.label.toString()}
          renderItem={_renderItem}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            width: WIDTH / 2,
            backgroundColor: colors.green,
            borderRadius: 8,
            shadowOpacity: 0.22,
            shadowColor: colors.green,
            shadowOffset: {
              width: -2,
              height: 2,
            },
            shadowRadius: 8,
          }}
          ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: colors.gray04 }}></View>}
        />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // width: WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    backgroundColor: colors.white2,
  },
  menuLabel: {
    fontFamily: fontFamily.Strawford,
    fontSize: 13,
    fontWeight: '400',
    color: colors.black,
  },
  backButton: {
    paddingHorizontal: 16,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    alignItems: 'center',
  },
});
