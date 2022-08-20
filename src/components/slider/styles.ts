import { StyleSheet } from 'react-native';

import { WIDTH } from '@Constants/app';
import { colors } from '@Theme/index';

export default StyleSheet.create({
  root: {
    borderRadius: 50,
    width: WIDTH / 2,
    backgroundColor: colors.gray05,
  },
  sliderContainer: {
    height: 4,
    borderRadius: 50,
    backgroundColor: colors.gray04,
  },
});
