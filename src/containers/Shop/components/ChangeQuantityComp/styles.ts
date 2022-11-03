import { StyleSheet } from 'react-native';
import { colors } from '@Theme/index';

export const styles = StyleSheet.create({
  buttonContent: {
    width: 82,
    paddingLeft: 0,
    paddingRight: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'flex-end',
  },

  button: {
    width: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#737373',
  },

  textButton: {
    textAlign: 'center',
    color: colors.black2,
  },
});
