import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { ImageBackgroundCompLayout } from '@Components/image-backgroundComp';
import { colors, fontFamily } from '@Theme/index';

interface IProps {
  title: string;
  subTitle?: string;
  background: any;
  statusColor: string;
  status: string;
  unit: string;
  image: React.ReactNode;
  fontSize: number;
}

const WidgetComp = ({ title, subTitle, background, statusColor, status, unit, image, fontSize }: IProps) => {
  return (
    <View style={styles.container}>
      <ImageBackgroundCompLayout
        children={
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={styles.leftContent}>
              <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                {!!image && <View style={styles.iconView}>{image}</View>}
                <View style={{ paddingHorizontal: 10, flex: 1, alignItems: 'flex-start' }}>
                  <Text style={[styles.subTitleText, { fontSize }]}>{title}</Text>
                  <Text style={[styles.subText, styles.textStyle]}>{unit}</Text>
                </View>
              </View>
              <View style={styles.lineText} />
              <View style={{ alignItems: 'center' }}>
                <Text style={[{ color: statusColor }, styles.textStyle]}>{status}</Text>
              </View>
            </View>
            <View style={styles.rightBackground}>
              <View style={[styles.rightSmallBackground, { backgroundColor: statusColor }]}></View>
            </View>
          </View>
        }
        source={background}
        resizeMode="cover"
        imageStyle={{ height: 130, marginTop: -20, marginRight: 28 }}
      />
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
      width: -1,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 6,
  },
  leftContent: {
    top: 1,
    justifyContent: 'center',
  },
  iconView: {
    height: 60,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineText: {
    height: 1,
    backgroundColor: colors.gray04,
    width: 145,
  },
  subTitleText: {
    fontFamily: fontFamily.Strawford,
    fontWeight: '500',
    color: colors.black2,
    textAlign: 'center',
  },
  textStyle: {
    fontFamily: fontFamily.Strawford,
    fontSize: 13,
    fontWeight: '400',
    textAlign: 'center',
  },
  subText: {
    color: colors.grey06,
  },
  rightBackground: {
    height: '100%',
    width: 28,
    backgroundColor: colors.black2,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rightSmallBackground: {
    height: 60,
    width: 6,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
});
