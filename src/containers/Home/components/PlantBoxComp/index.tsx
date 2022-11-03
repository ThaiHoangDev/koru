import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { Plant } from '@Containers/Home/interfaces';
import { ImageBackgroundCompLayout } from '@Components/image-backgroundComp';

import { colors, fontFamily } from '@Theme/index';

interface IProps {
  data: Plant;
}

const PlantBoxComp = ({ data }: IProps) => {
  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.subTitle}>{data.species_name}</Text>
        </View>
        <View style={styles.status}></View>
      </View>
      <ImageBackgroundCompLayout
        children={<Image source={{ uri: data.species_image }} resizeMode="contain" style={styles.image} />}
        source={require('@Assets/image-background/box-plant.png')}
        resizeMode="cover"
        imageStyle={{ flex: 1, width: '100%' }}
      />
    </View>
  );
};

export default PlantBoxComp;

const styles = StyleSheet.create({
  root: {
    padding: 8,
    height: 204,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.gray04,
  },
  title: {
    color: colors.black2,
    fontSize: 16,
    fontFamily: fontFamily.Strawford,
  },
  subTitle: {
    color: colors.grey06,
    fontSize: 13,
    fontFamily: fontFamily.Strawford,
  },
  image: {
    flex: 1,
    height: 160,
  },
  status: {
    borderRadius: 50,
    height: 20,
    width: 20,
    backgroundColor: colors.green,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
