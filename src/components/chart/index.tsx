import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';
import { ChartData } from 'react-native-chart-kit/dist/HelperTypes';

import { colors } from '@Theme/index';

const screenWidth = Dimensions.get('window').width;

const chartConfig: AbstractChartConfig = {
  color: (opacity = 1) => `#fff`,
  stackedBar: false,
  strokeWidth: 2, // optional, default 3
  // barPercentage: 0.5,
  labelColor: (opacity = 1) => `#000`,
  formatYLabel: yLabel => {
    return '';
  },
  scrollableDotStrokeWidth: 2,
  scrollableDotRadius: 10,
  decimalPlaces: 0,
  linejoinType: 'round',
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '10',
    strokeWidth: '4',
    stroke: colors.black2,
    fill: '#fff',
  },
  propsForBackgroundLines: {},

  useShadowColorFromDataset: false, // optional
};

const Chart = () => {
  const data: ChartData = {
    labels: ['20', '45', '28', '80', '99', '43'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(241, 44, 31, 1)`, // optional
        strokeWidth: 3, // optional
        // withDots: true,
        withScrollableDot: true,
      },
    ],
    // legend: ['Rainy Days'], // optional
  };
  return (
    <LineChart
      data={data}
      width={screenWidth - 20}
      height={220}
      chartConfig={chartConfig}
      bezier
      transparent
      withDots
      withVerticalLines
      fromZero
      fromNumber={1}
      segments={2}
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
      // getDotProps={(value, index)=> {console.log(value) return; }}
      // hidePointsAtIndex={[99,2]}
      withOuterLines={false}
      withInnerLines={false}
      withShadow={false}

      // renderDotContent={({indexData})=> <View><Text>{indexData}</Text></View>}
      // getDotProps={(d, i)=> { console.log(d, i); return {}}}
    />
  );
};

export default Chart;

const styles = StyleSheet.create({});
