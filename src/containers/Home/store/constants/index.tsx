import SoilIcon1 from '@Components/iconSvg/home/SoilIcon1';
import CIcon from '@Components/iconSvg/home/CIcon';
import LuxIcon from '@Components/iconSvg/home/LuxIcon';
import WaterIcon from '@Components/iconSvg/home/WaterIcon';

import { colors } from '@Theme/index';
import { IMoreInfoProps } from '@Containers/Home/interfaces';


export const MORE_INFO_DATA: IMoreInfoProps[] = [
  {
    title: '75',
    name: 'Soil moist',
    type: 'mst',
    image: <WaterIcon />,
    status: 'Good',
    statusColor: colors.green1,
    background: require('@Assets/image-background/good.png'),
    subTitle: '',
    unit: '%',
  },
  {
    title: '25',
    name: 'Air Quality',
    type: 'tvoc',
    image: <SoilIcon1 />,
    status: 'Good',
    statusColor: colors.green1,
    background: require('@Assets/image-background/good.png'),
    subTitle: '',
    unit: 'ug/m3',
  },
  {
    title: '20',
    name: 'Temperature',
    type: 'temp',
    image: <CIcon />,
    status: 'To low',
    statusColor: '#FFBC57',
    background: require('@Assets/image-background/toLow.png'),
    subTitle: '',
    unit: 'oC',
  },
  {
    title: '1400',
    name: 'Light',
    type: 'br',
    image: <LuxIcon />,
    status: 'Warning',
    statusColor: '#F12C1F',
    background: require('@Assets/image-background/warning.png'),
    subTitle: '',
    unit: 'Lux',
  },
];
