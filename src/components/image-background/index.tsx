import React from 'react';
import { Text, ViewStyle, TextStyle, ImageBackground, ImageResizeMode, ImageStyle } from 'react-native';

import styles from './styles';

interface IProps {
  title: string;
  stylesImg?: ViewStyle[] | ViewStyle;
  stylesTitle?: TextStyle | TextStyle[];
  source: any;
  resizeMode?: ImageResizeMode;
  imageStyle?: ImageStyle;
}

export const ImageBackgroundComp = ({ title, stylesImg, stylesTitle, source, resizeMode, imageStyle }: IProps) => {
  return (
    <ImageBackground style={[styles.root, stylesImg]} source={source} resizeMode={resizeMode} imageStyle={imageStyle}>
      <Text style={[styles.title, stylesTitle]}>{title}</Text>
    </ImageBackground>
  );
};
