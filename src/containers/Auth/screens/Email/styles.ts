import { StyleSheet } from 'react-native';

import { fontFamily, colors } from '@Theme/index';
import { HEIGHT, WIDTH } from '@Constants/app';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },

  title: {
    color: colors.black2,
    fontFamily: fontFamily.Strawford,
    fontSize: 24,
  },
  subTitle: {
    color: colors.grey06,
    fontFamily: fontFamily.Strawford,
    fontSize: 13,
    lineHeight: 27,
    textAlign: 'center',
  },

  textEmail: {
    color: colors.black,
    fontFamily: fontFamily.medium,
    fontSize: 16,
  },
  buttonContainer: {
    width: WIDTH / 2,
    minWidth: 213,
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  txtContainer: {
    height: 30,
    paddingHorizontal: 2,
    marginTop: 10,
    fontSize: 16,
    fontFamily: fontFamily.Strawford,
  },
  errorMessage: {
    color: colors.error,
    marginHorizontal: 40,
    marginBottom: 20,
    textAlign: 'left',
    fontFamily: fontFamily.Strawford,
  },
  btn: {
    backgroundColor: colors.black2,
    marginHorizontal: 40,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 25,
  },

  txtBtn: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.white,
  },
  fontFamily: {
    fontFamily: fontFamily.Strawford,
  },
});
