import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { ImageBackgroundCompLayout } from '@Components/image-backgroundComp';
import { colors, fontFamily } from '@Theme/index';

interface IProps {
  title: string;
  background: any;
  statusColor: string;
  status: string;
  unit: string;
  image: React.ReactNode;
  fontSize: number;
}

const WidgetComp = ({ title, background, statusColor, status, unit, image, fontSize }: IProps) => {
  return (
    <View style={styles.container}>
      <ImageBackgroundCompLayout
        children={
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={styles.leftContent}>
              <View style={{ flexDirection: 'row', minHeight: 80, alignItems: 'center', justifyContent: 'center' }}>
                {!!image && <View style={styles.iconView}>{image}</View>}
                <View
                  style={{
                    flex: 1,
                    alignItems: !image ? 'center' : 'flex-start',
                    marginRight: 10,
                    justifyContent: 'center',
                  }}>
                  <Text style={[styles.subTitleText, { fontSize }]}>{title}</Text>
                  {!!unit && <Text style={[styles.subText, styles.textStyle]}>{unit}</Text>}
                </View>
              </View>
              <View style={styles.lineText} />
              <View style={{ alignItems: 'center', justifyContent: 'center', height: 26 }}>
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
    minHeight: 106,
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
    justifyContent: 'center',
  },
  iconView: {
    height: 60,
    width: 40,
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
    minWidth: 50,
    textAlign: 'center',
  },
  textStyle: {
    fontFamily: fontFamily.Strawford,
    fontSize: 13,
    fontWeight: '400',
    textAlign: 'center',
    paddingHorizontal: 6,
  },
  subText: {
    color: colors.grey06,
    minWidth: 50,
    textAlign: 'center',
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
