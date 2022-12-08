
import dayjs from 'dayjs';
import { Alert, Modal } from 'react-native';

import { PlantProps, ReportedProps } from 'containers/Home/store/interfaces';

interface IProps {
  lastDay: number;
}

export const generateDates = ({ lastDay }: IProps) => {
  const startDate = dayjs(lastDay).subtract(15, 'day');
  const dates = [];

  for (let i = 0; i < 16; i++) {
    const date = startDate.add(i, 'day');
    dates.push(date.format('DD/MM/YYYY'));
  }

  return dates;
};

export function replaceAll(str: string, key: string, value: string) {
  return str.replace(new RegExp(key, 'g'), value);
}

export const getHours = (timeStamp: number) => new Date(timeStamp * 1000).toISOString().substr(11, 5);

export const getHour = (timeStamp: number) => new Date(timeStamp * 1000).toISOString().substr(11, 2);

export const getMin = (timeStamp: number) => new Date(timeStamp * 1000).toISOString().substr(14, 2);

export function convertSecondsToTime(seconds: number) {
  // Hours, minutes
  const hrs = ~~(seconds / 3600);
  const mins = ~~((seconds % 3600) / 60);

  // Output like "1:01" or "4:03" or "123:03"
  return hrs + ':' + (mins < 10 ? '0' : '') + mins;
}

export function formatSecondsToDuration(seconds: number): string {
  // Hours, minutes
  const hrs = ~~(seconds / 3600);
  const mins = ~~((seconds % 3600) / 60);

  if (hrs > 0) {
    return `${hrs}h ${mins}m`;
  }

  return mins + 'm';
}

export const showErrorMessage = (e: any, completeHandler = () => {}) => {
  Alert.alert(
    'Error',
    e.message,
    [
      {
        text: 'Ok',
        onPress: () => {
          if (completeHandler) {
            completeHandler();
          }
        },
      },
    ],
    { cancelable: true },
  );
};

export const showErrorWithString = (e: string, completeHandler = () => {}) => {
  Alert.alert(
    'Error',
    e,
    [
      {
        text: 'Ok',
        onPress: () => {
          if (completeHandler) {
            completeHandler();
          }
        },
      },
    ],
    { cancelable: true },
  );
};

export const showAlert = (title = '', message: string, completeHandler = () => {}) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Ok',
        onPress: () => {
          if (completeHandler) {
            completeHandler();
          }
        },
      },
    ],
    { cancelable: true },
  );
};

export const showConfirmationAlert = (
  title = '',
  message: string,
  rejectHandler = () => {},
  completeHandler = () => {},
) => {
  Alert.alert(title, message, [
    {
      text: 'Cancel',
      onPress: () => {
        if (rejectHandler) {
          rejectHandler();
        }
      },
    },
    {
      text: 'Ok',
      onPress: () => {
        if (completeHandler) {
          completeHandler();
        }
      },
    },
  ]);
};

export const formatAsStatus = (min: number, max: number, value: number) => {
  if (value >= min && value <= max) {
    return true;
  }
  return false;
};

export const formatValueMQTT = (value: ReportedProps, type: string) => {
  switch (type) {
    case 'Soil moist':
      return `${value.mst}%`;
    case 'Air Quality':
      return `${value.tvoc} ug/m3`;
    case 'Temperature':
      return `${value.temp} C`;
    case 'Light':
      return `${Math.max(value.br1, value.br2, value.br3)} lux`;
    default:
      return 0;
  }
};

export const totalStatus = (plant: PlantProps) => {
  const brStatus = formatAsStatus(
    plant.species_bright_min_h,
    plant.species_bright_max_h,
    Math.max(plant?.reported.br1 || 0, plant?.reported.br2 || 0, plant?.reported.br3 || 0),
  );
  const tempStatus = formatAsStatus(plant.species_bright_min_h, plant.species_bright_max_h, plant?.reported.temp);
  const hmStatus = formatAsStatus(plant.species_humidity_min, plant.species_humidity_max, plant?.reported.hm);

  return brStatus && tempStatus && hmStatus && true;
};

export const qualityDay = (plant: PlantProps) => {
  return (+plant?.reported?.wtl * +plant?.species_watering_frequency) / 100;
};
