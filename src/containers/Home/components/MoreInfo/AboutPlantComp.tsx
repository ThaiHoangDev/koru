import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { CollapsibleHeaderTabView } from 'react-native-tab-view-collapsible-header';
import { TabViewProps, Route, SceneRendererProps, TabBar, NavigationState } from 'react-native-tab-view';
import { HScrollView } from 'react-native-head-tab-view';
import { HEIGHT, WIDTH } from '@Constants/app';
import PlantIcon from '@Components/iconSvg/shop/PlantIcon4';
import { ImageBackgroundCompLayout } from '@Components/image-backgroundComp';
import AboutTab from './AboutTab';
import { colors, fontFamily } from '@Theme/index';

const AboutPlant = () => {
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState<Route[]>([
    { key: '0', title: 'About' },
    { key: '1', title: 'Tips' },
    { key: '2', title: 'Care' },
  ]);

  const topHeader = () => {
    return (
      <View style={styles.plantImage}>
        <ImageBackgroundCompLayout
          children={<PlantIcon width={WIDTH / 1.6} height={HEIGHT / 1.6} />}
          source={require('@Assets/image-background/box-plant.png')}
          resizeMode="cover"
          imageStyle={{ flex: 1, width: '100%' }}
        />
      </View>
    );
  };

  const handleSetTabView = (index: number) => setIndex(index);

  const renderTabBar = (
    tabbarProps: SceneRendererProps & {
      navigationState: NavigationState<any>;
    },
  ) => {
    return (
      <TabBar
        {...tabbarProps}
        // labelStyle={{fontFamily: MONTSERRAT_SEMIBOLD}}
        inactiveColor={'#000'}
        // activeColor={THEME_TEXT_GREEN_2}
        indicatorContainerStyle={styles.indicatorContainerStyle}
        style={styles.tabBar}
        renderTabBarItem={p => (
          <Pressable key={p.key} onPress={p.onPress} style={[styles.tabItem]}>
            <Text
              style={[index == p.route.key ? { color: p.activeColor } : { color: p.inactiveColor }, styles.tabTitle]}>
              {p.route.title}
            </Text>
          </Pressable>
        )}
      />
    );
  };
  const _renderScene = (
    sceneProps: SceneRendererProps & {
      route: any;
    },
  ) => {
    switch (sceneProps.route.key) {
      case '0':
        return <AboutTab index={0} aboutInfo={undefined} />;
      // return <></>;
      case '1':
        return <AboutTab index={1} aboutInfo={undefined} />;
        // return <TipsTab />;
        return <></>;
      case '2':
        return <AboutTab index={2} aboutInfo={undefined} />;
        // return <CareTab />;
        return <></>;
      default:
        return <HScrollView index={4} />;
    }
  };

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <CollapsibleHeaderTabView
        renderScrollHeader={topHeader}
        navigationState={{
          index: index,
          routes: routes,
        }}
        renderScene={_renderScene}
        onIndexChange={handleSetTabView}
        initialLayout={{ width: WIDTH }}
        renderTabBar={renderTabBar}
        style={styles.containerScreen}
      />
    </View>
  );
};

export default AboutPlant;

const styles = StyleSheet.create({
  containerScreen: {
    flex: 1,
    width: WIDTH,
  },
  plantImage: {
    height: HEIGHT / 2.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    flex: 1,
    width: WIDTH,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  indicatorContainerStyle: {
    width: '100%',
  },
  tabItem: {
    width: WIDTH / 3,
    borderWidth: 1,
  },
  tabTitle: {
    fontFamily: fontFamily.Strawford,
    fontSize: 13,
    fontWeight: '400',
  },
  tabTitleActive: {
    fontWeight: '700',
  },
});
