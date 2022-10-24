import { StyleSheet } from 'react-native';

import { fontFamily, colors } from '@Theme/index';
import { HEIGHT, WIDTH } from '@Constants/app';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.black,
  },
  containerContent: {
    marginVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerTitle: {
    alignItems: 'center',
    marginTop: 50,
    paddingHorizontal: WIDTH / 6,
  },
  title: {
    color: colors.white,
    fontFamily: fontFamily.bold,
    fontSize: 26,
    lineHeight: 25,
    bottom: 17,
  },
  subTitle: {
    color: colors.white,
    fontFamily: fontFamily.book,
    fontSize: 16,
    lineHeight: 27,
    textAlign: 'center',
  },
  errorTxt: {
    color: colors.white,
    fontFamily: fontFamily.book,
    fontSize: 14,
    lineHeight: 27,
    textAlign: 'center',
  },
  btn:{
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
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
});
