import React from 'react';
import Chart from './ChartComp';
import MoreInfoComp from './MoreInfoComp';
import AboutPlant from './AboutPlantComp';
import { PlantProps } from '@Containers/Home/store/interfaces';
interface IProps {
  data: any;
  plant?: PlantProps;
}
const MoreInfo = ({ data, plant }: IProps) => {
  switch (data.uuid) {
    case 1:
      return <AboutPlant key={1} />;
    case 2:
      return <MoreInfoComp plant={plant} key={2} />;
    case 3:
      return <Chart plantId={plant?.uuid} key={3} />;
    default:
      return <></>;
  }
};
export default MoreInfo;
