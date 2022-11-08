import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, StyleProp, Text, Animated, FlatList, Easing, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Entypo';

import HomeIcon from '@Components/iconSvg/HomeIcon';
import ShopIcon from '@Components/iconSvg/ShopIcon';
import SettingIcon from '@Components/iconSvg/SettingIcon';

import { colors } from '@Theme/index';
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
          margin: 6,
        }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 6 }}
          onPress={handleNavigationTab(item)}>
          <Text>{item.label}</Text>
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
      <TouchableOpacity onPress={handleShowMenu} style={[styles.right, { flex: 0.2, zIndex: 20 }]}>
        {right}
      </TouchableOpacity>

      <Animated.View
        style={{
          borderRadius: 8,
          position: 'absolute',
          zIndex: 1,
          flex: 1,
          backgroundColor: colors.green,
          right: 10,
          top: showMenu ? 0 : -40,
          shadowOpacity: 0.22,
          shadowColor: colors.green2,
          shadowOffset: {
            width: -2,
            height: 2,
          },
          shadowRadius: 8,
          opacity: opacityInterpolate,
          width: WIDTH / 2,
          transform: [
            {
              translateY: h,
            },
          ],
        }}>
        <FlatList
          data={DATA}
          keyExtractor={item => item.label.toString()}
          renderItem={_renderItem}
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
