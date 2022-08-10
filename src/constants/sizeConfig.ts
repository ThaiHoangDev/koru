import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;

// Get the proportionate height as per screen size
function getProportionateScreenHeight(inputSize: number) {
  // 812 is the layout height that designer use
  return (inputSize / 812.0) * windowHeight;
}

export default getProportionateScreenHeight;