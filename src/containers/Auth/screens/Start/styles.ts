import { StyleSheet } from 'react-native';

import { fontFamily, colors, fontSizes } from '@Theme/index';
import { HEIGHT, WIDTH } from '@Constants/app';

export default StyleSheet.create({
  root: {
    flex: 1,
  },

  containerContent: {
    flex: 1,
    alignItems: 'center',
    marginTop: 60,
  },

  title: {
    color: colors.black2,
    fontFamily: fontFamily.FreightBigProMedium,
    fontSize: 32,
  },
  subTitle: {
    color: colors.grey06,
    fontFamily: fontFamily.FreightBigProMedium,
    fontSize: 16,
    textAlign: 'center',
  },
  textHeader: {
    color: colors.gray04,
    fontFamily: fontFamily.bold,
    fontSize: 20,
  },

  buttonTitleLogin: {
    color: colors.black,
  },
  buttonStart: {
    backgroundColor: colors.black,
  },
  buttonTitle: {
    color: colors.white,
  },
  doneWrap: {
    paddingHorizontal: 10,
    marginVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    bottom: 20,
  },
  btn: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 25,
  },
  btnSocial: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    marginHorizontal: 10,
    borderRadius: 50,
  },

  txtBtn: {
    fontSize: 16,
    fontWeight: '500',
  },
  fontFamily: {
    fontFamily: fontFamily.Strawford,
  },
});
