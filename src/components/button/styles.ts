import { StyleSheet } from 'react-native';

import { fontFamily, colors, fontSizes } from '@Theme/index';

export default StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  title: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.xl,
  },
});
