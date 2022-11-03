import { StyleSheet } from 'react-native';
import { colors, fontFamily } from '@Theme/index';

export const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 28,
    paddingHorizontal: 48,
    paddingBottom: 60,
  },

  textModelStyle: {
    marginBottom: 16,
    fontWeight: '500',
    fontSize: 16,
  },

  textColor: {
    color: colors.grey06,
  },

  TextColorPrice: {
    color: colors.black2,
  },

  totalText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  totalTextStyle: {
    fontWeight: '500',
    fontSize: 24,
  },

  drawLine: {
    width: '100%',
    height: 1,
    marginBottom: 20,
    backgroundColor: '#F9F9F9',
  },

  btn: {
    height: 48,
    backgroundColor: colors.black2,
    borderRadius: 25,
    marginVertical: 20,
  },

  txtBtn: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.white,
  },
  fontFamily: {
    fontFamily: fontFamily.Strawford,
  },
});
