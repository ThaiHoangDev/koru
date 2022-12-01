import WaterIcon from '@Components/iconSvg/home/WaterIcon';
import SoilIcon1 from '@Components/iconSvg/home/SoilIcon1';
import CIcon from '@Components/iconSvg/home/CIcon';
import LuxIcon from '@Components/iconSvg/home/LuxIcon';

export const ReportData = [
  {
    uuid: 0,
    image: <WaterIcon />,
    name: 'Soil moist',
  },
  {
    uuid: 1,
    image: <SoilIcon1 />,
    name: 'Air Quality',
  },
  {
    uuid: 2,
    image: <CIcon />,
    name: 'Temperature',
  },
  {
    uuid: 3,
    image: <LuxIcon />,
    name: 'Light',
  },
];
