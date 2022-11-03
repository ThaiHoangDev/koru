import { StyleSheet } from 'react-native';
import { colors, fontFamily } from '@Theme/index';

export const styles = StyleSheet.create({
  item: {
    position: 'relative',
    height: 109,
    padding: 20,
    marginVertical: 10,
    borderRadius: 16,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: '#F9F9F9',
  },

  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  image: {
    width: 77,
    height: 77,
    padding: 20,
    alignItems: 'center',
    backgroundColor: colors.green,
    borderRadius: 16,
  },

  cancel: {
    position: 'absolute',
    top: -8,
    right: -8,
  },

  cancelButton: {
    width: 20,
    padding: 3,
    borderRadius: 50,
    backgroundColor: '#CBCBCB',
    alignItems: 'center',
    zIndex: 10,
  },

  textCancel: {
    fontWeight: '700',
    fontSize: 11,
    color: colors.white2,
  },

  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  treeName: {
    fontFamily: fontFamily.Strawford,
    fontSize: 16,
    fontWeight: '500',
  },

  treeNameColor: {
    color: colors.black2,
  },

  treeType: {
    fontFamily: fontFamily.Strawford,
    fontSize: 13,
    fontWeight: '400',
  },

  treeTypeColor: {
    color: colors.grey06,
  },

  priceText: {
    fontFamily: fontFamily.Strawford,
    fontSize: 16,
    fontWeight: '500',
    color: '#33704D',
  },
});
