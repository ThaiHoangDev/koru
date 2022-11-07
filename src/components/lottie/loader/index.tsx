import React from 'react';
import Lottie from 'lottie-react-native';

interface Iprops {
  source?: any;
  width?: number;
  speed?: number;
}

export default function LoaderAnimationProgress({
  source = require('../../../assets/lotties/searching.json'),
  width = 90,
  speed = 1,
}: Iprops) {
  return <Lottie source={source} autoPlay loop autoSize style={{ width, zIndex: 1 }} speed={speed} />;
}
