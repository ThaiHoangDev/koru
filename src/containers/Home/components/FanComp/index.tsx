import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { WIDTH } from '@Constants/app';
import { colors, fontFamily } from '@Theme/index';
import LoaderAnimationProgress from '@Components/lottie/loader';
import CircularSliderComp from '@Components/CircularSlider/CircularSlider';
import StopIcon from '@Components/iconSvg/home/StopIcon';

interface IProps {
  handleChangeValueFan: (x: number) => void;
}

const FanComp = ({ handleChangeValueFan }: IProps) => {
  const [angle, setAngle] = useState(10);
  const handleChange = (x: number) => () => {
    setAngle(x);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          borderRadius: WIDTH / 1.4 / 2 / 1.5,
          width: WIDTH / 1.4 / 1.5,
          height: WIDTH / 1.4 / 1.5,
          backgroundColor: colors.black2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: 20,
          shadowColor: colors.green3,
          shadowOffset: {
            width: 2,
            height: -2,
          },
          shadowOpacity: 0.6,
          shadowRadius: 6,
          elevation: 3,
        }}>
        <View
          style={{
            zIndex: 3,
            shadowOpacity: 0.6,
            opacity: 0.9,
            shadowOffset: {
              width: 2,
              height: -2,
            },
            transform: [{ rotate: '180deg' }],
          }}>
          <CircularSliderComp
            angle={angle}
            setAngle={setAngle}
            min={0}
            max={360}
            dialWidth={26}
            strokeWidth={1}
            meterColor={colors.green3}
            dialRadius={82}
            strokeColor={colors.black2}
            textColor={colors.black2}
          />
        </View>
        <TouchableOpacity style={{ position: 'absolute', zIndex: 5, left: -50 }} onPress={handleChange(90)}>
          <Text style={{ color: colors.black2, fontFamily: fontFamily.Strawford, fontSize: 16 }}>Low</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ position: 'absolute', height: 60, zIndex: 5, top: -40 }} onPress={handleChange(180)}>
          <Text style={{ color: colors.black2, fontFamily: fontFamily.Strawford }}>Auto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ position: 'absolute', zIndex: 5, right: -40 }} onPress={handleChange(359)}>
          <Text style={{ color: colors.black2, fontFamily: fontFamily.Strawford }}>Fast</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ position: 'absolute', zIndex: 5, height: 30, bottom: -40 }}
          onPress={() => setAngle(0)}>
          <StopIcon />
        </TouchableOpacity>
        <View
          style={{
            borderRadius: WIDTH / 1.4 / 2 / 2,
            borderColor: '#FBFBFB',
            borderWidth: 1,
            width: WIDTH / 1.4 / 2,
            height: WIDTH / 1.4 / 2,
            backgroundColor: colors.black2,
            padding: 20,
            marginVertical: 10,
            shadowColor: colors.black2,
            shadowOffset: {
              width: 2,
              height: -2,
            },
            shadowOpacity: 0.067,
            shadowRadius: 20,
            elevation: 3,
            zIndex: 2,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
          }}>
          <LoaderAnimationProgress source={require('@Assets/lotties/fan.json')} speed={angle / 10} width={40} />
        </View>
      </View>
    </View>
  );
};

export default FanComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
