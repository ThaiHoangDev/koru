import { Dimensions, FlatList, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { HomeActions } from '@Containers/Home/store/actions';
import { makeSelectIsRequesting, makeSelectMyPlantHistory } from '@Containers/Home/store/selectors';

import { WIDTH } from '@Constants/app';
import SoilIcon1 from '@Components/iconSvg/home/SoilIcon1';
import CIcon from '@Components/iconSvg/home/CIcon';
import LuxIcon from '@Components/iconSvg/home/LuxIcon';
import WaterIcon from '@Components/iconSvg/home/WaterIcon';
import Chartcompo from '@Components/chart';

//assets
import { colors, fontFamily } from '@Theme/index';
import LineChartComp from '@Components/line-chart-comp';
import { createStructuredSelector } from 'reselect';
import { number } from 'yup';

interface ITextProps {
  title: string;
  num: number;
}

interface IChartIconProps {
  uuid: number;
  image: React.ReactNode;
}

interface IProps {
  isLoading: boolean;
  myPlantHistory: any;
  plantId?: string;
}

const DATA: IChartIconProps[] = [
  {
    uuid: 0,
    image: <WaterIcon />,
  },
  {
    uuid: 1,
    image: <SoilIcon1 />,
  },
  {
    uuid: 2,
    image: <CIcon />,
  },
  {
    uuid: 3,
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

const Chart = (props: IProps) => {
  const [isActive, setIsActive] = useState(3);
  const { myPlantHistory, plantId } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    const payload = {
      from: 1666256999,
      to: 1666258081,
      plantId: plantId,
    };
    dispatch(HomeActions.getPlantStateHistory.request(payload));
    console.log(myPlantHistory, 'ffffff');
  }, [dispatch]);

  const onPress = (id: number) => {
    setIsActive(id);
  };
  const renderItemIcon = ({ item, index }: any) => (
    <View style={styles.iconBtn}>
      <View style={styles.lineStyles} />
      <TouchableHighlight
        style={[styles.btnIcon, { backgroundColor: isActive === item.uuid ? colors.black2 : colors.white2 }]}
        onPress={() => onPress(item.uuid)}>
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
      <View style={styles.chart}>
        {/* <Chartcompo /> */}
        <LineChartComp />
      </View>
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

const mapStateToProps = createStructuredSelector({
  myPlantHistory: makeSelectMyPlantHistory(),
  isLoading: makeSelectIsRequesting(),
});

export default connect(mapStateToProps)(Chart);

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
