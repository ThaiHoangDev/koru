import { StyleSheet } from 'react-native';

import { fontFamily, colors, fontSizes } from '@Theme/index';

export default StyleSheet.create({
  root: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.xl,
  },
});
