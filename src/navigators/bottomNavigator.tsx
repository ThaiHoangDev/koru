
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const TabBarNavigator = createBottomTabNavigator();
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Platform,
} from 'react-native';

import HomeIcon from '@Components/iconSvg/HomeIcon';
import { HomeNavigator } from './homeNavigator';
import { ShopNavigator } from './shopNavigator';
import { SettingNavigator } from './settingNavigator';


export const TabBarSetting = [
  {
    routeName: 'Home',
    icon: (props: any) => <HomeIcon {...props} />,
  },
  {
    routeName: 'Product',
    icon: (props: any) => <HomeIcon {...props} />,
  },
  {
    routeName: 'Notifications',
    icon: (props: any) => <HomeIcon {...props} />,
  },
];

export const BottomTabNavigator = () => {
  const SMTabBar = ({state, descriptors, navigation}: any) => {
    return (
      <View
        style={{flexDirection: 'row', backgroundColor: '#fff'}}
       >
        {state.routes.map((route: any, index: any) => {
          const {icon: TabIcon}: any = TabBarSetting.find(
            ({routeName}) => routeName === route.name,
          );
          const {options} = descriptors[route.key];
          const label = options.tabBarLabel || options.title || route.name;
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });}
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          const isFirstOrLast = index === 0 || index === state.routes.length - 1;
  
          return (
            <Pressable
              accessibilityRole="button"
              testID={options.tabBarTestID}
              key={label}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                styles.tabItem,
                {
                  flex: isFirstOrLast ? 0.8 : 1.2,
                  paddingLeft: index === 0 ? 10 : 0,
                  paddingRight: index === state.routes.length - 1 ? 10 : 0,
                },
              ]}>
              {options.tabBarBadge ? (
                <View style={styles.badge}>
                  <Text style={styles.tabBadge}>{options.tabBarBadge}</Text>
                </View>
              ) : null}
              <View style={styles.iconWrap}>
                <TabIcon isActive={isFocused} />
              </View>
              <Text
                style={[styles.tabText, isFocused ? styles.tabTextFocused : {}]}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    );
  };
 

  return (
    <TabBarNavigator.Navigator
      tabBar={props => <SMTabBar {...props} />}>
      <TabBarNavigator.Screen name="Home" component={HomeNavigator} />
      <TabBarNavigator.Screen name="Shop" component={ShopNavigator} />
      <TabBarNavigator.Screen name="Setting" component={SettingNavigator} />
    </TabBarNavigator.Navigator>
  );
};


const styles = StyleSheet.create({
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
  tabTextFocused: {
  
  },
  iconWrap: {
    marginVertical: 4,
  },
  tabItem: {
    backgroundColor: '#fff',
    height: 36,
    alignItems: 'center',
    paddingTop: 2,
    paddingBottom: 2,
    position: 'relative',
    borderTopColor: '#BBBBBB',
    borderTopWidth: 1,
    top: -10,
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