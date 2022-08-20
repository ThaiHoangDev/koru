import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSizes } from '@Theme/index';
import { HEIGHT, WIDTH } from '@Constants/app';

export default StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingTop: 100,
  },
  containerTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
    paddingHorizontal: 40,
  },
  containerBtn: {
    alignItems: 'center',
    marginTop: HEIGHT / 18,
  },
  title: {
    color: colors.black,
    fontFamily: fontFamily.bold,
    fontSize: 26,
    lineHeight: 25,
    bottom: 17,
  },
  subTitle: {
    paddingHorizontal: 20,
    color: colors.black,
    fontFamily: fontFamily.book,
    fontSize: 18,
    lineHeight: 27,
    textAlign: 'center',
  },
  imgContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20,
    width: WIDTH - 60,
    height: HEIGHT / 6,
    borderRadius: 6,
  },
  imageStyle: {
    borderRadius: 6,
  },
  btn: {
    marginLeft: 40,
    marginRight: 20,
    marginVertical: 10,
  },
  touch: {
    position: 'absolute',
    zIndex: 2,
    top: HEIGHT / 6.4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    width: 60,
    height: 60,
    borderRadius: 50,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  sTxtTouch: {
    fontFamily: fontFamily.book,
    fontSize: fontSizes.xl,
    fontStyle: 'italic',
  },
  sTitle: {
    fontSize: 18,
  },
});
