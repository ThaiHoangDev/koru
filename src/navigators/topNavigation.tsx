import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Entypo';


import { colors } from '@Theme/index';
import { WIDTH } from '@Constants/app';
interface IProps {
  children?: any;
  right?: any;
  isLeft?: boolean
}

export default function TopNavigationBar(props: IProps) {
  const navigation = useNavigation();
  const { children, right, isLeft, ...rest } = props;

  const backButtonOnPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={['top']} style={[styles.container]}>
      {isLeft && <TouchableOpacity style={styles.backButton} onPress={backButtonOnPress}>
        <Icon name="chevron-thin-left" size={24} color={colors.black} />
      </TouchableOpacity>}
      <View style={styles.content}>{children}</View>
      <TouchableOpacity onPress={backButtonOnPress} style={styles.right}>
        {right}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    backgroundColor: colors.white,
  },

  backButton: {
    paddingHorizontal: 16,
  },
  content: {
    width: WIDTH - 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    marginRight: 20
  },
});
