import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Image } from 'react-native-svg';
import { ImageBackgroundCompLayout } from '@Components/image-backgroundComp';
import { colors } from '@Theme/index';

interface IProps {
  title: string;
  subTitle: string;
}

const WidgetComp = ({ title, subTitle }: IProps) => {
  return (
    <View style={styles.container}>
      <ImageBackgroundCompLayout
        children={undefined}
        source={require('@Assets/image-background/warning.png')}
        resizeMode="cover"
      />
      <View
        style={{
          height: '100%',
          width: 28,
          backgroundColor: colors.black2,
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
        }}></View>
    </View>
  );
};

export default WidgetComp;

const styles = StyleSheet.create({
  container: {
    width: 173,
    height: 106,
    backgroundColor: colors.white,
    flexDirection: 'row',
    borderRadius: 8,
    position: 'relative',
    shadowColor: colors.black2,
    shadowOffset: {
      width:-1,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 6,
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 106,
    borderRightWidth: 173,

    borderBottomWidth: 106,
    borderBottomColor: 'transparent',
    // transform: [{ rotate: '270deg' }],
    zIndex: 2,
  },
});
