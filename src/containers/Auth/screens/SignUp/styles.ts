import { StyleSheet } from 'react-native';

import { fontFamily, colors } from '@Theme/index';
import { HEIGHT, WIDTH } from '@Constants/app';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
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
    color: colors.black,
    fontFamily: fontFamily.bold,
    fontSize: 26,
    lineHeight: 25,
    bottom: 17,
  },
  subTitle: {
    color: colors.black,
    fontFamily: fontFamily.book,
    fontSize: 18,
    lineHeight: 27,
    textAlign: 'center',
  },
  titleTab: {
    color: colors.gray04,
    fontFamily: fontFamily.medium,
    fontSize: 16,
    textAlign: 'center',
    paddingRight: 60,
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
