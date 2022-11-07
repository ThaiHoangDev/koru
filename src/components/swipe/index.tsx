import React, { useRef, useState } from 'react';
import { Animated, PanResponder, PanResponderGestureState, Easing } from 'react-native';

type StateType = {
  barWidth: number;
  value: number;
  chidren: React.ReactNode;
  setValueEndMove: (value: number) => void;
};

const min = 0;
const max = 100;

const capValueWithinRange = (value: number, range: number[]) => {
  if (value < range[0]) return range[0];
  if (value > range[1]) return range[1];
  return value;
};

const getValueFromLeftOffset = (offset: number, barWidth: number | null) => {
  if (barWidth === null) return 0;
  return (max * offset) / barWidth;
};

const SwipeComp = ({ barWidth, value, chidren, setValueEndMove }: StateType) => {
  const preWidth = useRef(new Animated.Value((barWidth * value) / max)).current;
  let zIndex = useRef(2).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (_, gestureState) => onMove(gestureState),
      onPanResponderGrant: () => {
        zIndex = 4;
      },
    }),
  ).current;

  const onMove = (gestureState: PanResponderGestureState) => {
    const newDeltaValue = getValueFromLeftOffset(gestureState.dx, barWidth);
    Animated.timing(preWidth, {
      toValue: (barWidth * value) / max + gestureState.dx,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      setValueEndMove(capValueWithinRange(value + newDeltaValue, [min, max]));
    });
  };

  return (
    <>
      <Animated.View
        style={{
          flex: 1,
          width: preWidth,
          maxWidth: barWidth,
          minWidth: 20,
          height: 20,
          backgroundColor: 'rgba(255,255,0,0.6)',
          position: 'absolute',
          zIndex: 4,
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          borderTopRightRadius: 20,
        }}
        {...panResponder.panHandlers}
      />
      {chidren}
    </>
  );
};

export default SwipeComp;
