import React, { useState } from 'react';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { StyleSheet, Text, View, Pressable, Platform, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HomeIcon from '@Components/iconSvg/HomeIcon';
import { HomeNavigator } from './homeNavigator';
import { ShopNavigator } from './shopNavigator';
import { SettingNavigator } from './settingNavigator';
import { colors } from '@Theme/index';
import TopNavigationBar from './topNavigation';
import ShopIcon from '@Components/iconSvg/ShopIcon';
import SettingIcon from '@Components/iconSvg/SettingIcon';
import { HEIGHT, IS_ANDROID } from '@Constants/app';

const TabBar: any = ({ isActive, index }: { isActive: boolean; index: number }) => {
  switch (index) {
    case 0:
      return <HomeIcon isActive={isActive} />;

    case 1:
      return <ShopIcon isActive={isActive} />;

    case 2:
      return <SettingIcon isActive={isActive} />;

    default:
      break;
  }
};

const TabBarNavigator = createBottomTabNavigator();
export const BottomTabNavigator = () => {
  const [visible, setVisible] = useState(true);
  React.useLayoutEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setVisible(false);
    });

    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setTimeout(() => {
        setVisible(true);
      }, 0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const SMTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    return (
      <SafeAreaView style={styles.bottomTabContainer} edges={['bottom', 'left', 'right']}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused: boolean = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate<any>({ name: route?.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            visible && (
              <Pressable
                accessibilityRole="button"
                testID={options.tabBarTestID}
                key={index.toString()}
                onPress={onPress}
                onLongPress={onLongPress}
                style={[
                  styles.tabItem,
                  {
                    borderTopLeftRadius: index === 0 ? 50 : 0,
                    borderTopRightRadius: index === state.routes.length - 1 ? 50 : 0,
                    borderBottomLeftRadius: index === 0 ? 50 : 0,
                    borderBottomRightRadius: index === state.routes.length - 1 ? 50 : 0,
                  },
                ]}>
                {options.tabBarBadge ? (
                  <View style={styles.badge}>
                    <Text style={styles.tabBadge}>{options.tabBarBadge}</Text>
                  </View>
                ) : null}
                <View style={styles.iconWrap}>
                  <TabBar isActive={isFocused} index={index} />
                </View>
              </Pressable>
            )
          );
        })}
      </SafeAreaView>
    );
  };

  return (
    <TabBarNavigator.Navigator
      tabBar={props => <SMTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        header: p => <TopNavigationBar {...p} children />,
        tabBarHideOnKeyboard: IS_ANDROID,
      }}>
      <TabBarNavigator.Screen name="Home" component={HomeNavigator} options={{ headerShown: false }} />
      <TabBarNavigator.Screen name="Shop" component={ShopNavigator} />
      <TabBarNavigator.Screen name="Setting" component={SettingNavigator} />
    </TabBarNavigator.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomTabContainer: {
    display: 'flex',
    flexDirection: 'row',
    // position: 'relative',
    paddingHorizontal: 20,
    backgroundColor: colors.white2,
    paddingBottom: Platform.OS === 'android' ? 20 : 0,
  },
  tabBadge: {
    fontSize: 8,
    color: '#fff',
    fontWeight: '700',
  },
  tabIcon: {
    height: 20,
    width: 20,
    marginVertical: 8,
    resizeMode: 'contain',
  },
  tabText: {
    fontSize: 11,
    fontWeight: '400',
  },
  tabTextFocused: {},
  iconWrap: {
    marginVertical: 4,
  },
  tabItem: {
    flex: 1,
    backgroundColor: colors.black2,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 3,
      height: -6,
    },
    shadowColor: colors.yellow,
    shadowOpacity: 0.02,
    shadowRadius: 25,
    elevation: 6,
    zIndex: 2,
  },
  badge: {
    backgroundColor: '#2EA65C',
    borderRadius: 25,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 1.6,
    paddingVertical: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    display: 'flex',
    top: 8.8,
  },
});
