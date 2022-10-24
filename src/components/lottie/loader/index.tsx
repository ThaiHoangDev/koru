import React from 'react';
import Lottie from 'lottie-react-native';

export default function LoaderAnimationProgress() {
  return (
    <Lottie
      source={require('../../../assets/lotties/searching.json')}
      autoPlay
      loop
      autoSize
      style={{ width: 90, zIndex: 1 }}
    />
  );
}
