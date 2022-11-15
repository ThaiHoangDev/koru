import React, { memo } from 'react';
import { LineChart, Grid, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import moment from 'moment';
import { Line, G, Circle } from 'react-native-svg';

const LineChartExample = () => {
  const data = [53, -53, 24, 50, -20, -80];

  const Decorator = ({ x, y, data }: any) => {
    return data.map((value: any, index: any) => (
      <Circle key={index} cx={x(index)} cy={y(value)} r={8} stroke={'red'} strokeWidth={2} fill={'white'} />
    ));
  };

  const CustomGrid = ({ x, y, data, ticks }: any) => (
    <G>
      {
        // Horizontal grid
        ticks.map((tick: any) => (
          <Line key={tick} x1={'0%'} x2={'100%'} y1={y(tick)} y2={y(tick)} stroke={'rgba(0,0,0,0.2)'} />
        ))
      }
      {
        // Vertical grid
        data.map((_: any, index: any) => {
          return (
            <Line
              key={index}
              y1={'0%'}
              y2={'100%'}
              x1={x(index)}
              x2={x(index)}
              stroke={'rgba(0,0,0,1)'}
              strokeWidth={2}
            />
          );
        })
      }
    </G>
  );

  return (
    <>
      <LineChart
        style={{ height: 200, margin: 10 }}
        data={data}
        curve={shape.curveNatural}
        svg={{ stroke: 'rgba(118, 181, 54, 1)', strokeWidth: 2 }}
        contentInset={{ top: 20, bottom: 20 }}>
        <CustomGrid x={undefined} y={undefined} data={undefined} ticks={undefined} />
        <Decorator />
      </LineChart>
      <XAxis
        data={data}
        xAccessor={({ item }) => item}
        // contentInset={{ left: 10, right: 10 }}
        // numberOfTicks={5}
        formatLabel={value => value}
        svg={{ fill: 'black', fontSize: 16, fontWeight: 'bold' }}
      />
    </>
  );
};

export default memo(LineChartExample);
