import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import { ImageBackgroundCompLayout } from '@Components/image-backgroundComp';
import PlantIcon from '@Components/iconSvg/pairing/Plant';
import { ButtonComp } from '@Components/button';
import NotConected from '@Components/iconSvg/home/NotConected';
import AddToCardIcon from '@Components/iconSvg/shop/AddToCardIcon';

import { colors, fontFamily } from '@Theme/index';
import { totalStatus } from '@Utils/helper';
import { PlantProps } from '@Containers/Home/store/interfaces';

interface IProps {
  data: PlantProps;
  shopScreen: boolean;
  onAddToCard?: () => void;
}

const PlantBoxComp = ({ data, shopScreen, onAddToCard }: IProps) => {
  const handleNotConected = () => {};

  return (
    <View>
      {!data?.status && (
        <View style={styles.notConected}>
          <View style={styles.notConectedIcon}>
            <NotConected />
          </View>
          <ButtonComp
            title={'Not Conected'}
            handlePress={handleNotConected}
            stylesBtn={styles.btn}
            stylesTitle={styles.titleBtn}
            isLoading={false}
          />
        </View>
      )}
      <View style={[styles.root, { opacity: !data?.status ? 0.3 : 1 }]}>
        <View style={styles.headerContainer}>
          {shopScreen ? (
            <TouchableOpacity style={styles.addToCardBtn} onPress={onAddToCard}>
              <AddToCardIcon />
            </TouchableOpacity>
          ) : (
            <>
              <View>
                <Text style={styles.title}>{data.name}</Text>
                <Text style={styles.subTitle}>{data.species_name}</Text>
              </View>
              <View style={!!data.reported && totalStatus(data) ? styles.status : styles.noStatus}></View>
            </>
          )}
        </View>
        <ImageBackgroundCompLayout
          children={
            data.species_image ? (
              <Image source={{ uri: data.species_image }} resizeMode="contain" style={styles.image} />
            ) : (
              <PlantIcon />
            )
          }
          source={require('@Assets/image-background/box-plant.png')}
          resizeMode="cover"
          imageStyle={{ flex: 1, width: '100%' }}
        />
        {shopScreen && (
          <View>
            <Text style={[styles.plantName, styles.textStyle]}>{data.name}</Text>
            <Text style={[styles.plantPrice, styles.textStyle]}>$40.00</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default PlantBoxComp;

const styles = StyleSheet.create({
  root: {
    flex: 0.5,
    padding: 8,
    height: 204,
    minHeight: 204,
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
    backgroundColor: colors.green1,
  },
  noStatus: {
    borderRadius: 50,
    height: 20,
    width: 20,
    backgroundColor: colors.red,
  },
  addToCardBtn: {
    backgroundColor: colors.black2,
    borderRadius: 50,
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  textStyle: {
    fontFamily: fontFamily.Strawford,
    fontWeight: '500',
    fontSize: 16,
  },
  plantName: {
    color: colors.black,
  },
  plantPrice: {
    color: colors.grey,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notConected: {
    position: 'absolute',
    height: 204,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 10,
    zIndex: 1,
  },
  btn: {
    backgroundColor: '#FFE6E6',
    borderRadius: 25,
    paddingHorizontal: 10,
    height: 28,
    marginBottom: 10,
    zIndex: 2,
    width: '100%',
    justifyContent: 'flex-end',
  },
  titleBtn: {
    color: '#F12C1F',
    fontFamily: fontFamily.Strawford,
  },
  notConectedIcon: {
    position: 'absolute',
    bottom: 27,
    left: 20,
    zIndex: 3,
  },
});
