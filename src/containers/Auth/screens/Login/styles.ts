import { StyleSheet } from 'react-native';

import fontFamily from '@Theme/fontFamily';
import fontSizes from '@Theme/fontSizes';

export default StyleSheet.create({
  root: {
    flex: 1,
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textSignUp: {
    textAlign: 'center',
  },
  wrapperError: {
    width: '100%',
    marginTop: 20,
    marginHorizontal: 5,
  },
  textError: {
    color: '#EB5757',
    fontSize: fontSizes.l,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 45,
    marginBottom: 20,
  },
  inputWrapper: {
    width: '100%',
    height: 50,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 45,
  }
});
