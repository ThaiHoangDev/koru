import { Dimensions, FlatList, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import React, { useState } from 'react';

import { WIDTH } from '@Constants/app';
import SoilIcon1 from '@Components/iconSvg/home/SoilIcon1';
import CIcon from '@Components/iconSvg/home/CIcon';
import LuxIcon from '@Components/iconSvg/home/LuxIcon';
import WaterIcon from '@Components/iconSvg/home/WaterIcon';

//assets
import { colors, fontFamily } from '@Theme/index';

interface ITextProps {
  title: string;
  num: number;
}

interface IChartIconProps {
  image: React.ReactNode;
}

const DATA: IChartIconProps[] = [
  {
    image: <WaterIcon />,
  },
  {
    image: <SoilIcon1 />,
  },
  {
    image: <CIcon />,
  },
  {
    image: <LuxIcon />,
  },
];

const TEXTDATA: ITextProps[] = [
  {
    title: 'Text',
    num: 1030,
  },
  {
    title: 'Text',
    num: 1030,
  },
  {
    title: 'Text',
    num: 1030,
  },
];

const Chart = () => {
  const [isActive, setIsActive] = useState(false);

  const onPress = () => {
    setIsActive(!isActive);
  };
  const renderItemIcon = ({ item, index }: any) => (
    <View style={styles.iconBtn}>
      <View style={styles.lineStyles} />
      <TouchableHighlight
        style={[styles.btnIcon, { backgroundColor: isActive ? colors.black2 : colors.white2 }]}
        onPress={onPress}>
        {item.image}
      </TouchableHighlight>
      <View style={styles.lineStyles} />
    </View>
  );

  const renderItemText = ({ item, index }: any) => (
    <View>
      <Text style={[styles.text, styles.fontFamily]}>{item.title}</Text>
      <Text style={[styles.number, styles.fontFamily]}>{item.num}</Text>
    </View>
  );
  return (
    <View style={[styles.containerScreen]}>
      <FlatList
        data={DATA}
        renderItem={renderItemIcon}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          flex: 1,
          flexDirection: 'row',
          marginTop: 60,
        }}
      />
      <View style={styles.chart}></View>
      <View style={styles.footerContent}>
        <Text style={[styles.temText, styles.fontFamily]}>Temprature</Text>
        <View style={styles.textFooter}>
          <Text style={[styles.number, styles.fontFamily]}>Text</Text>
          <FlatList
            data={TEXTDATA}
            renderItem={renderItemText}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-around' }}
          />
        </View>
      </View>
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({
  containerScreen: {
    flex: 1,
    width: Dimensions.get('screen').width,
    flexDirection: 'column',
  },
  iconBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  lineStyles: {
    marginTop: 15,
    height: 1,
    width: WIDTH / 12.5,
    backgroundColor: colors.gray04,
  },
  btnIcon: {
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray04,
  },
  chart: {
    flexGrow: 3,
    backgroundColor: colors.gray,
    width: '100%',
  },
  footerContent: {
    flexGrow: 2,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  fontFamily: {
    fontFamily: fontFamily.Strawford,
  },
  temText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
  },
  textFooter: {
    height: 118,
    padding: 20,
    marginVertical: 16,
    borderRadius: 8,
    shadowColor: colors.black,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: colors.white,
  },
  text: {
    marginVertical: 10,
    fontSize: 13,
    fontWeight: '400',
    color: colors.grey06,
  },
  number: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.black2,
  },
});
