import React from 'react';
import { ViewStyle, TextStyle, ImageBackground, ImageResizeMode, ImageStyle } from 'react-native';

import styles from './styles';

interface IProps {
  children: any;
  stylesImg?: ViewStyle[] | ViewStyle;
  stylesTitle?: TextStyle | TextStyle[];
  source: any;
  resizeMode?: ImageResizeMode;
  imageStyle?: ImageStyle;
}

export const ImageBackgroundCompLayout = ({ stylesImg, children, source, resizeMode, imageStyle }: IProps) => {
  return (
    <ImageBackground style={[styles.root, stylesImg]} source={source} resizeMode={resizeMode} imageStyle={imageStyle}>
      {children}
    </ImageBackground>
  );
};
