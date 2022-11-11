import Video from 'react-native-video';
import { View, Text, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import React from 'react';
import { HEIGHT, WIDTH } from '@Constants/app';

const videoStyle: StyleProp<ViewStyle> = {
  height: HEIGHT,
  width: WIDTH,
};

export default function VideoLoginComp() {
  return (
    <View style={styles.viewStyle}>
      <Video
        source={require('../../assets/video/koruVideo.mp4')}
        paused={false}
        controls={false}
        style={videoStyle}
        repeat={true}
        fullscreenOrientation="portrait"
        fullscreen
        muted={false}
        resizeMode="cover"
        hideShutterView={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    bottom: 40,
  },
});
