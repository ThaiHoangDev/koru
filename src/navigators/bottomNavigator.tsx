import React, { FC, ReactNode } from 'react';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { StyleSheet, Text, View, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HomeIcon from '@Components/iconSvg/HomeIcon';
import { HomeNavigator } from './homeNavigator';
import { ShopNavigator } from './shopNavigator';
import { SettingNavigator } from './settingNavigator';
import { colors } from '@Theme/index';
import TopNavigationBar from './topNavigation';
import ShopIcon from '@Components/iconSvg/ShopIcon';
import SettingIcon from '@Components/iconSvg/SettingIcon';

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
  const SMTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    return (
      <SafeAreaView style={styles.bottomTabContainer} edges={['bottom']}>
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
      }}>
      <TabBarNavigator.Screen name="Home" component={HomeNavigator} options={{ headerShown: false }} />
      <TabBarNavigator.Screen name="Shop" component={ShopNavigator} />
      <TabBarNavigator.Screen name="Setting" component={SettingNavigator} />
    </TabBarNavigator.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomTabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: colors.white2,
    paddingBottom: Platform.OS === 'android' ? 20 : 0,
    alignSelf: 'flex-end',
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
      width: 1,
      height: 4,
    },
    shadowColor: colors.black2,
    shadowOpacity: 0.22,
    shadowRadius: 4,
    elevation: 3,
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
    position: 'absolute',
    display: 'flex',
    top: 8.8,
  },
});
