import { StyleSheet } from 'react-native';

import {fontFamily, colors, fontSizes} from '@Theme/index';
import { HEIGHT, WIDTH } from '@Constants/app';

export default StyleSheet.create({
  root: {
    flex: 1,
  },
  containerBackground:{
   alignItems: 'center',
   width: WIDTH,
   height: HEIGHT
  },
  containerContent:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerTitle:{
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
    marginTop: HEIGHT/3
  },
  title:{
    color: colors.black,
    fontFamily: fontFamily.bold,
    fontSize: 26,
    lineHeight: 25,
    bottom: 17
  },
  subTitle:{
    color: colors.black,
    fontFamily: fontFamily.book,
    fontSize: 18,
    lineHeight: 27
  },
  textHeader: {
    color: colors.gray04,
    fontFamily: fontFamily.bold,
    fontSize: 20,
  },
  buttonContainer: {
    width: 213,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  buttonTitleLogin: {
    color: colors.black,
  },
  buttonStart: {
    backgroundColor: colors.black,
  },
  buttonTitle:{
    color: colors.white,
  }
});
