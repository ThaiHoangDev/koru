import { StyleSheet } from 'react-native';

import { fontFamily, colors, fontSizes } from '@Theme/index';

export default StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fontFamily.Strawford,
    fontSize: fontSizes.xl,
    backgroundColor: 'transparent',
  },
  label: {
    fontFamily: fontFamily.Strawford,
    color: colors.black2,
    fontSize: 13,
    fontWeight: '400',
  },
});
