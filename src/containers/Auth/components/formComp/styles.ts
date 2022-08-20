import { StyleSheet } from 'react-native';

import { fontFamily, colors, fontSizes } from '@Theme/index';
import { HEIGHT, WIDTH } from '@Constants/app';

export default StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollview: {
    flex: 1,
  },
  keyboardContainer: {
    flexGrow: 0.5,
    alignItems: 'center',
  },
  title: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.xl,
  },
  subTitle: {
    top: 50,
    zIndex: 2,
    color: colors.black,
    fontFamily: fontFamily.book,
    fontSize: 18,
    lineHeight: 27,
    textAlign: 'center',
  },
  btnStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.gray05,
    width: 158,
    top: HEIGHT / 5,
    borderRadius: 4,
  },
  txtContainer: {
    height: 100,
    width: WIDTH / 1.4,
    paddingHorizontal: 10,
    fontSize: 38,
    fontFamily: fontFamily.book,
    marginTop: 200,
  },
});
