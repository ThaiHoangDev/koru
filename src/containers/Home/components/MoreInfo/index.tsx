import { Dimensions, FlatList, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { colors, fontFamily } from '@Theme/index';
import WidgetComp from '../WidgetComp';
import WaterIcon from '@Components/iconSvg/home/WaterIcon';
import CIcon from '@Components/iconSvg/home/CIcon';
import LuxIcon from '@Components/iconSvg/home/LuxIcon';
import SoilIcon1 from '@Components/iconSvg/home/SoilIcon1';
import { WIDTH } from '@Constants/app';

interface IProps {
  data: any;
  index: number;
}

interface IMoreInfoProps {
  title: string;
  image: React.ReactNode;
  status: string;
  statusColor: string;
  background: any;
  subTitle: string;
  unit: string;
}

interface ITextProps {
  title: string;
  num: number;
}

const DATA: IMoreInfoProps[] = [
  {
    title: '75',
    image: <WaterIcon />,
    status: 'Good',
    statusColor: colors.green1,
    background: require('@Assets/image-background/good.png'),
    subTitle: '',
    unit: '%',
  },
  {
    title: '25',
    image: <SoilIcon1 />,
    status: 'Good',
    statusColor: colors.green1,
    background: require('@Assets/image-background/good.png'),
    subTitle: '',
    unit: 'ug/m3',
  },
  {
    title: '20',
    image: <CIcon />,
    status: 'To low',
    statusColor: '#FFBC57',
    background: require('@Assets/image-background/toLow.png'),
    subTitle: '',
    unit: 'oC',
  },
  {
    title: '1400',
    image: <LuxIcon />,
    status: 'Warning',
    statusColor: '#F12C1F',
    background: require('@Assets/image-background/warning.png'),
    subTitle: '',
    unit: 'Lux',
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

const MoreInfo = (props: IProps) => {
  const { data, index } = props;
  const [isActive, setIsActive] = useState(false);

  const onPress = () => {
    setIsActive(!isActive);
  };

  const renderItem = ({ item, index }: any) => (
    <View style={{ marginVertical: 10 }}>
      <WidgetComp
        title={item.title}
        subTitle={item.subTitle}
        background={item.background}
        statusColor={item.statusColor}
        status={item.status}
        unit={item.unit}
        image={item.image}
      />
    </View>
  );

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

  if (index === 0) {
    return (
      <View style={[styles.containerScreen, styles.styleMoreInfo]}>
        <FlatList data={DATA} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />
      </View>
    );
  } else {
    return (
      <View style={[styles.containerScreen]}>
        <FlatList
          data={DATA}
          renderItem={renderItemIcon}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            flex: 1,
            flexDirection: 'row',
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
  }
};

export default MoreInfo;

const styles = StyleSheet.create({
  titleTab: {
    fontFamily: fontFamily.FreightBigProMedium,
    fontSize: 32,
    textAlign: 'center',
    color: colors.black2,
  },
  containerScreen: {
    flex: 1,
    width: Dimensions.get('screen').width,
    flexDirection: 'column',
    marginTop: 60,
  },
  styleMoreInfo: {
    alignItems: 'center',
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
      width: 0,
      height: 1,
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
