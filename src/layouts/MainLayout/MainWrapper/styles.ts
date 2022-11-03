import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '@Theme/index';

export default StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },
  contentWrap: {
    position: 'relative',
  },
  content: {
    backgroundColor: colors.white2,
    position: 'relative',
    flex: 1,
    // paddingHorizontal: 20,
  },
  homeContent: {
    paddingHorizontal: 0,
    paddingBottom: 0,
    paddingTop: 0,
  },
});
