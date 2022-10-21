import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Plant from '@Components/iconSvg/pairing/Plant';

interface Iprops {
  name: string;
  type: string;
  uri: string;
}

export default function PantBox({ name, type, uri }: Iprops) {
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        {/* <Image source={{ uri: uri }} resizeMode="contain"></Image> */}
        <Plant/>
      </View>
      <View style={styles.rightContainer}>
        <Text>{name}</Text>
        <Text>{type}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row',
    alignItems:'center'
  },
  image:{

  },
  rightContainer:{
    paddingHorizontal: 20,
    flexDirection: 'column',
  }
});
