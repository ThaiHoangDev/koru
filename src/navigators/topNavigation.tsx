import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function TopNavigationBar(props: any) {
  const navigation = useNavigation();

  const backButtonOnPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={['top']} style={[styles.container]}>
      <TouchableOpacity style={styles.backButton} onPress={backButtonOnPress}>

      </TouchableOpacity>
      <View style={styles.content}>

      </View>
      <TouchableOpacity style={styles.right}>

      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80
  },

  backButton: {
    paddingHorizontal: 16,
  },
  content: {

  },
  right: {

  }
});
