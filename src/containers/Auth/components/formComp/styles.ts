import { StyleSheet } from 'react-native';

import { fontFamily, colors, fontSizes } from '@Theme/index';
import { HEIGHT, WIDTH } from '@Constants/app';

export default StyleSheet.create({
  root: {
    flex: 1,
  },

  keyboardContainer: {
    flexGrow: 0.5,
    alignItems: 'center',
  },
  txt: {
    color: colors.grey06,
    fontFamily: fontFamily.Strawford,
    fontSize: 13,
    textAlign: 'right',
    paddingHorizontal: 40,
  },
  subTitle: {
    color: colors.black2,
    fontFamily: fontFamily.Strawford,
    fontSize: 13,
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
    height: 30,
    paddingHorizontal: 2,
    marginVertical: 10,
    fontSize: 16,
    fontFamily: fontFamily.Strawford,
  },
  btn: {
    backgroundColor: colors.black2,
    marginHorizontal: 40,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 25,
  },

  txtBtn: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.white,
  },
  fontFamily: {
    fontFamily: fontFamily.Strawford,
  },
  errorMessage: {
    color: colors.error,
    textAlign: 'left',
    marginHorizontal: 40,
    marginBottom: 10,
    marginTop: -10,
    fontFamily: fontFamily.Strawford,
  },
  listHeader: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listFooter: {
    flexGrow: 0.8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  accountView: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginVertical: 10,
  },
});
