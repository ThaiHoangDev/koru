import Video from 'react-native-video';
import { View, Text, StyleProp, ViewStyle } from 'react-native';
// import video from '../../assets/video/koruVideo.mp4';
import React from 'react';
import { HEIGHT, WIDTH } from '@Constants/app';

const videoStyle: StyleProp<ViewStyle> = {
  height: HEIGHT,
  width: WIDTH,
  bottom: 100,
};

const viewStyle = { height: 250 };

export default function VideoLoginComp() {
  return (
    <View style={viewStyle}>
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
      <Text>Video</Text>
    </View>
  );
}
