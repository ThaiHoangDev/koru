import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// utils
import { StepProps } from '@Containers/Auth/interfaces';
import { makeSelectStepSignUp } from '@Containers/Auth/store/selectors';
// components by self
import { ImageBackgroundComp } from '@Components/image-background';
import { SliderComp } from '@Components/slider';
import TopNavigationBar from '@Navigators/topNavigation';
// assets
import styles from './styles';

const LetGoContainer = ({ step }: StepProps) => {
  const navigation: any = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: (p: any) => <TopNavigationBar {...p} isLeft children={<SliderComp step={step} />} />,
    });
  }, [navigation]);

  const handlePress = () => {
    navigation.navigate('FastSignUp');
  };

  return (
    <View style={styles.root}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Let’s go!</Text>
        <Text style={styles.subTitle}>Are you a beginner or already an plant lover?</Text>
      </View>
      <View style={styles.containerBtn}>
        <TouchableOpacity onPress={handlePress} style={styles.btn}>
          <ImageBackgroundComp
            title="Beginner"
            source={require('@Assets/image-background/beginner.png')}
            stylesImg={styles.imgContainer}
            stylesTitle={styles.sTitle}
            resizeMode="cover"
            imageStyle={styles.imageStyle}
          />
        </TouchableOpacity>
        <View style={[styles.touch]}>
          <Text style={styles.sTxtTouch}>Or</Text>
        </View>
        <TouchableOpacity onPress={handlePress} style={styles.btn}>
          <ImageBackgroundComp
            title="Plant lover"
            source={require('@Assets/image-background/plant-lover.png')}
            stylesImg={styles.imgContainer}
            stylesTitle={styles.sTitle}
            resizeMode="cover"
            imageStyle={styles.imageStyle}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const mapStateToProps = createStructuredSelector({
  step: makeSelectStepSignUp(),
});

export default connect(mapStateToProps)(LetGoContainer);
