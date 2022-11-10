import { Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View, StatusBar, Animated } from 'react-native';
import React, { useState } from 'react';
import { CollapsibleHeaderTabView } from 'react-native-tab-view-collapsible-header';
import { TabViewProps, Route, SceneRendererProps, TabBar, NavigationState } from 'react-native-tab-view';
import { HScrollView } from 'react-native-head-tab-view';
import { HEIGHT, WIDTH } from '@Constants/app';
import { colors, fontFamily } from '@Theme/index';
import AboutTab from './AboutTab';

const AboutPlant = () => {
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState<Route[]>([
    { key: '0', title: 'About' },
    { key: '1', title: 'Tips' },
    { key: '2', title: 'Care' },
  ]);

  const topHeader = () => {
    return (
      <View style={{ height: HEIGHT / 2.6, backgroundColor: 'red' }}>
        <Text>Image</Text>
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
              <Animated.Text style={{ opacity, fontFamily: fontFamily.Strawford }}>{route.title}</Animated.Text>
              <Animated.View
                style={{
                  height: 2,
                  borderRadius: 20,
                  marginTop: 6,
                  width: 60,
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
  tabBar: {
    width: WIDTH / 2,
    backgroundColor: colors.white,
    height: 50,
    flexDirection: 'row',
    paddingTop: StatusBar.currentHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  indicatorContainerStyle: {
    width: '100%',
  },
});
