import React from 'react';
import Lottie from 'lottie-react-native';

interface Iprops {
  source?: any;
  width?: number;
}

export default function LoaderAnimationProgress({
  source = require('../../../assets/lotties/searching.json'),
  width = 90,
}: Iprops) {
  return <Lottie source={source} autoPlay loop autoSize style={{ width, zIndex: 1 }} />;
}
