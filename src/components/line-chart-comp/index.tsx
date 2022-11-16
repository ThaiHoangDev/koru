import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LineChart, Grid, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import moment from 'moment';
import { Line, G, Circle } from 'react-native-svg';
import { colors, fontFamily } from '@Theme/index';
import { HEIGHT, WIDTH } from '@Constants/app';

const LineChartExample = () => {
  const data = [10, 30, 86, 99, 50, 10, 40, 95, -4, -24, 3, 56, 130, 50, 70, 24, 50, -20, -80, -100, -70];
  const tickData = [195, 130, 65, 0, -65, -130, -195];
  const maxValue = data.reduce((pValue: any, cValue: any) => (pValue > cValue ? pValue : cValue));

  const Decorator = ({ x, y, data }: any) => {
    return data.map(
      (value: any, index: any) =>
        value == maxValue && (
          <>
            <View style={styles.status}>
              <Text style={styles.statusText}>GOOD</Text>
            </View>
            <Circle
              key={index}
              cx={x(index)}
              cy={y(value)}
              r={8}
              stroke={colors.black}
              strokeWidth={2.5}
              fill={'white'}
            />
          </>
        ),
    );
  };

  const CustomGrid = ({ x, y, data }: any) => (
    <G>
      {
        // Horizontal grid
        tickData.map((tick: any) => (
          <Line key={tick} x1={'0%'} x2={'100%'} y1={y(tick)} y2={y(tick)} stroke={'rgba(0,0,0,1)'} strokeWidth={0.5} />
        ))
      }
      {
        // Vertical grid
        data.map((value: any, index: any) => {
          if (maxValue == value) {
            return (
              <Line
                key={index}
                y1={'0%'}
                y2={'100%'}
                x1={x(index)}
                x2={x(index)}
                stroke={'rgba(0,0,0,1)'}
                strokeWidth={2.5}
              />
            );
          }
          if (index % 4 == 0) {
            return (
              <Line
                key={index}
                y1={'0%'}
                y2={'100%'}
                x1={x(index)}
                x2={x(index)}
                stroke={'rgba(0,0,0,1)'}
                strokeWidth={1.4}
              />
            );
          } else {
            return (
              <Line
                key={index}
                y1={'0%'}
                y2={'100%'}
                x1={x(index)}
                x2={x(index)}
                stroke={'rgba(0,0,0,0.2)'}
                strokeWidth={1}
              />
            );
          }
        })
      }
    </G>
  );

  return (
    <>
      <LineChart
        style={{ height: HEIGHT / 3.5, margin: 10 }}
        data={data}
        curve={shape.curveNatural}
        svg={{ stroke: 'rgba(118, 181, 54, 1)', strokeWidth: 2 }}
        contentInset={{ top: 20, bottom: 20 }}>
        <CustomGrid x={undefined} y={undefined} data={undefined} />
        <Decorator />
      </LineChart>
      <XAxis
        data={data}
        xAccessor={({ item }) => item}
        contentInset={{ left: 20, right: 20 }}
        numberOfTicks={7}
        formatLabel={value => moment(value).format('LT')}
        svg={styles.xText}
        style={{
          width: WIDTH - 20,
          marginHorizontal: 10,
        }}
      />
    </>
  );
};

export default memo(LineChartExample);

const styles = StyleSheet.create({
  xText: {
    fill: colors.black,
    fontSize: 10,
    fontFamily: fontFamily.Strawford,
    fontWeight: '400',
  },
  status: {
    position: 'absolute',
    top: -16,
    right: 117,
    backgroundColor: colors.green1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 50,
  },
  statusText: {
    color: colors.white,
    fontFamily: fontFamily.Strawford,
    fontWeight: '500',
    fontSize: 13,
  },
});
