import React from 'react';
import { StyleSheet, View, TouchableOpacity, StyleProp, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Entypo';

import { colors } from '@Theme/index';
import { WIDTH } from '@Constants/app';
interface IProps {
  children?: any;
  right?: any;
  isLeft?: boolean;
  stylesTop?: any;
}

export default function TopNavigationBar(props: IProps) {
  const navigation = useNavigation();
  const { children, right, isLeft, stylesTop, ...rest } = props;

  const backButtonOnPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={['top']} style={[styles.container, stylesTop]}>
      <View style={{ flex: 0.2, alignItems: 'flex-start' }}>
        {isLeft && (
          <TouchableOpacity style={styles.backButton} onPress={backButtonOnPress}>
            <Icon name="chevron-thin-left" size={24} color={colors.black} />
          </TouchableOpacity>
        )}
      </View>
      <View style={[styles.content, { flex: 0.6 }]}>{children}</View>
      <TouchableOpacity onPress={backButtonOnPress} style={[styles.right, { flex: 0.2 }]}>
        {right}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    backgroundColor: colors.white2,
  },

  backButton: {
    paddingHorizontal: 16,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    alignItems: 'center',
  },
});
