import { StyleSheet } from 'react-native';
import React from 'react';
import Chart from './ChartComp';
import MoreInfoComp from './MoreInfoComp';
import AboutPlant from './AboutPlantComp';
interface IProps {
  data: any;
}
const MoreInfo = ({ data }: IProps) => {
  switch (data.uuid) {
    case 1:
      return <AboutPlant />;
    case 2:
      return <MoreInfoComp />;
    case 3:
      return <Chart />;
    default:
      return <></>;
  }
};
export default MoreInfo;
const styles = StyleSheet.create({});
