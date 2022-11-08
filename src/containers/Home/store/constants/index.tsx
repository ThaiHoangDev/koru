import SoilIcon1 from '@Components/iconSvg/home/SoilIcon1';
import CIcon from '@Components/iconSvg/home/CIcon';
import LuxIcon from '@Components/iconSvg/home/LuxIcon';
import WaterIcon from '@Components/iconSvg/home/WaterIcon';

import { colors } from '@Theme/index';

export interface IMoreInfoProps {
  title: string;
  image: React.ReactNode;
  status: string;
  statusColor: string;
  background: any;
  subTitle: string;
  unit: string;
}

export const MORE_INFO_DATA = [
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
