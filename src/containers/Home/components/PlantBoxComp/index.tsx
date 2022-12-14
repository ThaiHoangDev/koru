import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';

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
  return (
    <View>
      {!data?.status && !shopScreen && (
        <View style={styles.notConected}>
          <View style={styles.notConectedIcon}>
            <NotConected />
          </View>
          <ButtonComp
            title={'Not Conected'}
            handlePress={() => {}}
            stylesBtn={styles.btn}
            stylesTitle={styles.titleBtn}
            isLoading={false}
          />
        </View>
      )}
      <View style={[styles.root, { opacity: !data?.status && !shopScreen ? 0.3 : 1 }]}>
        <View style={[styles.headerContainer, { justifyContent: !!shopScreen ? 'flex-end' : 'space-between' }]}>
          {!!shopScreen ? (
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
              <Image source={{ uri: data?.species_image }} resizeMode="contain" style={styles.image} />
            ) : (
              <PlantIcon />
            )
          }
          source={require('@Assets/image-background/box-plant.png')}
          resizeMode="cover"
          imageStyle={{ flex: 1, width: '100%', marginVertical: 6 }}
        />
        {!!shopScreen && (
          <View>
            <Text style={[styles.plantName, styles.textStyle]}>{data.name}</Text>
            <Text style={[styles.plantPrice, styles.textStyle]}>$40.00</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default memo(PlantBoxComp);

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
    width: '100%',
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
    alignSelf: 'flex-end',
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
  },
  notConected: {
    position: 'absolute',
    flexDirection: 'row',
    height: 28,
    paddingVertical: 10,
    paddingHorizontal: 10,
    bottom: 20,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    backgroundColor: '#FFE6E6',
    borderRadius: 25,
  },
  btn: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    zIndex: 2,
  },
  titleBtn: {
    color: colors.red,
    fontFamily: fontFamily.Strawford,
    fontSize: 13,
  },
  notConectedIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
