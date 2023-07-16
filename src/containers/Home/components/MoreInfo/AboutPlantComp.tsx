import { Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View, StatusBar, Animated } from 'react-native';
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

  const _renderTabBar = (
    tabbarProps: SceneRendererProps & {
      navigationState: NavigationState<any>;
    },
  ) => {
    const inputRange = tabbarProps.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {tabbarProps.navigationState.routes.map((route: any, i: number) => {
          const opacity = tabbarProps.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex: any) => (inputIndex === i ? 1 : 0.5)),
          });
          const opacityBorder = tabbarProps.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex: any) => (inputIndex === i ? 1 : 0)),
          });
          const y = tabbarProps.position.interpolate({
            inputRange,
            outputRange: [0, 6, 8],
          });

          return (
            <TouchableOpacity style={[styles.tabItem]} onPress={() => setIndex(i)}>
              <Animated.Text
                style={{ opacity, fontFamily: fontFamily.Strawford, width: WIDTH / 1.8, color: colors.black2 }}>
                {route.title}
              </Animated.Text>
              <Animated.View
                style={{
                  height: 2,
                  borderRadius: 20,
                  marginTop: 6,
                  width: 35,
                  backgroundColor: colors.black,
                  opacity: opacityBorder,
                  transform: [{ translateX: y }],
                }}></Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
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
        renderTabBar={_renderTabBar}
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
    width: WIDTH / 1.8,
    backgroundColor: colors.white2,
    height: 50,
    flexDirection: 'row',
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 6,
    marginTop: 20,
  },
  tabItem: {
    flex: 1,
    padding: 16,
  },
  indicatorContainerStyle: {
    width: '100%',
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
