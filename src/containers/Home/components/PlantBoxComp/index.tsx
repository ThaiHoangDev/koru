import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Plant } from '@Containers/Home/interfaces';
import { colors } from '@Theme/index';

interface IProps {
  data: Plant;
}

const PlantBoxComp = ({ data }: IProps) => {
  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={{ color: colors.black2 }}>{data.name}</Text>
          <Text style={{ color: colors.black2 }}>{data.species_name}</Text>
        </View>
        <View style={styles.status}></View>
      </View>
      <View style={{flex: 1}}>
        <Image source={{ uri: data.species_image }} resizeMode="contain" style={styles.image} />
      </View>
    </View>
  );
};

export default PlantBoxComp;

const styles = StyleSheet.create({
  root: {
    flex: 0.4,
    padding: 8,
    width: '100%',
    height: 204,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.gray04,
  },
  image: {
    flex: 1,
    width: 100,
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
