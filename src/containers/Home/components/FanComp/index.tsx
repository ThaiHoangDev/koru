import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { WIDTH } from '@Constants/app';
import { colors, fontFamily } from '@Theme/index';
import LoaderAnimationProgress from '@Components/lottie/loader';
// import CircularSliderComp from '@Components/CircularSlider/CircularSlider';
import StopIcon from '@Components/iconSvg/home/StopIcon';
import { useDispatch } from 'react-redux';
import { HomeActions } from '@Containers/Home/store/actions';

type SeclectedProps = 'Low' | 'Auto' | 'Fast';
interface IProps {
  fanValue: number;
}

const handleSelected = (fanValue: number) => {
  if (fanValue <= 25) {
    return 'Low';
  } else if (fanValue <= 50) {
    return 'Auto';
  } else if (fanValue <= 100) {
    return 'Fast';
  }
  return 'Auto';
};

const FanComp = ({ fanValue }: IProps) => {
  const dispatch = useDispatch();
  const [angle, setAngle] = useState(fanValue);
  const [selected, setSelected] = useState<SeclectedProps>(handleSelected(fanValue));
  const handleChange = (x: number) => () => {
    handleChangeValueFan(x);
  };

  const handleChangeValueFan = (x: number) => {
    setAngle(x);
    if ((x * 100) / 360 <= 25) {
      setSelected('Low');
    } else if ((x * 100) / 360 <= 50) {
      setSelected('Auto');
    } else if ((x * 100) / 360 <= 100) {
      setSelected('Fast');
    }
    dispatch(HomeActions.postFan.request(((x * 100) / 360).toFixed(0)));
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
        <TouchableOpacity
          style={{ position: 'absolute', zIndex: 5, left: selected === 'Fast' ? -70 : -40 }}
          onPress={handleChange(359)}>
          <Text style={[styles.btn, selected === 'Fast' ? styles.btnSelect : styles.btnNoSelect]}>Fast</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ position: 'absolute', height: 60, zIndex: 5, top: -40 }} onPress={handleChange(0)}>
          <StopIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ position: 'absolute', zIndex: 5, right: selected === 'Low' ? -70 : -40 }}
          onPress={handleChange(90)}>
          <Text style={[styles.btn, selected === 'Low' ? styles.btnSelect : styles.btnNoSelect]}>Low</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ position: 'absolute', zIndex: 5, height: 30, bottom: -40 }}
          onPress={handleChange(180)}>
          <Text style={[styles.btn, selected === 'Auto' ? styles.btnSelect : styles.btnNoSelect]}>Auto</Text>
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
  btn: {
    fontFamily: fontFamily.Strawford,
  },
  btnSelect: {
    fontSize: 32,
    color: colors.green1,
  },
  btnNoSelect: {
    color: colors.black2,
    fontSize: 16,
  },
});
