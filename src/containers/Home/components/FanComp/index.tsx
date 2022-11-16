import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { WIDTH } from '@Constants/app';
import { colors, fontFamily } from '@Theme/index';
import LoaderAnimationProgress from '@Components/lottie/loader';
// import CircularSliderComp from '@Components/CircularSlider/CircularSlider';
import StopIcon from '@Components/iconSvg/home/StopIcon';
import { useDispatch } from 'react-redux';
import { HomeActions } from '@Containers/Home/store/actions';

const FanComp = () => {
  const dispatch = useDispatch();
  const [angle, setAngle] = useState(10);
  const handleChange = (x: number) => () => {
    handleChangeValueFan(x);
  };

  const handleChangeValueFan = (x: number) => {
    setAngle(x);
    dispatch(HomeActions.postFan.request(((x * 100) / 360).toFixed(2)));
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
            zIndex: 13,
            shadowOpacity: 0.6,
            opacity: 0.9,
            shadowOffset: {
              width: 2,
              height: -2,
            },
          }}>
          {/* <CircularSliderComp
            angle={angle}
            setAngle={setAngle}
            min={0}
            max={360}
            dialWidth={26}
            strokeWidth={26}
            meterColor={colors.green3}
            dialRadius={89}
            fillColor={colors.black2}
            strokeColor={colors.black2}
            textColor={colors.black2}
            handlePostFan={handleChangeValueFan}
          /> */}
        </View>
        <TouchableOpacity style={{ position: 'absolute', zIndex: 5, left: -50 }} onPress={handleChange(359)}>
          <Text style={{ color: colors.black2, fontFamily: fontFamily.Strawford, fontSize: 16 }}>Fast</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ position: 'absolute', height: 60, zIndex: 5, top: -40 }} onPress={handleChange(0)}>
          <StopIcon />
        </TouchableOpacity>
        <TouchableOpacity style={{ position: 'absolute', zIndex: 5, right: -40 }} onPress={handleChange(90)}>
          <Text style={{ color: colors.black2, fontFamily: fontFamily.Strawford }}>Low</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ position: 'absolute', zIndex: 5, height: 30, bottom: -40 }}
          onPress={handleChange(180)}>
          <Text style={{ color: colors.black2, fontFamily: fontFamily.Strawford }}>Auto</Text>
        </TouchableOpacity>
        <View style={styles.fanContainer}>
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
  fanContainer: {
    borderRadius: WIDTH / 1.4 / 2 / 2,
    borderColor: colors.green3,
    borderWidth: 1,
    width: WIDTH / 1.4 / 2,
    height: WIDTH / 1.4 / 2,
    backgroundColor: colors.black2,
    shadowColor: colors.black2,
    shadowOffset: {
      width: 2,
      height: -2,
    },
    shadowOpacity: 0.067,
    shadowRadius: 20,
    elevation: 3,
    zIndex: 14,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
});
