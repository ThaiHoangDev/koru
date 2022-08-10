import dayjs from 'dayjs'

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

export const getHours = (timeStamp: number) => new Date(timeStamp * 1000).toISOString().substr(11, 5)

export const getHour = (timeStamp: number) => new Date(timeStamp * 1000).toISOString().substr(11, 2)

export const getMin = (timeStamp: number) => new Date(timeStamp * 1000).toISOString().substr(14, 2)

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
    return `${hrs}h ${mins}m`
  }

  return mins + 'm';
}
