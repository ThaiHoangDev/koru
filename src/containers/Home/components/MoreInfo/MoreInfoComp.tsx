import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';

import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectIsRequesting } from '@Containers/Home/store/selectors';
import WidgetComp from '../WidgetComp';
import { MORE_INFO_DATA } from '@Containers/Home/store/constants';
import { PlantProps } from '@Containers/Home/store/interfaces';
import { IMoreInfoProps } from '@Containers/Home/interfaces';

import { formatAsStatus } from '@Utils/helper';
import { colors } from '@Theme/index';
import { WIDTH } from '@Constants/app';

interface IProps {
  isLoading: boolean;
  plant?: PlantProps;
}

const MoreInfoComp = (props: IProps) => {
  const { plant } = props;

  const renderItem = ({ item, index }: { item: IMoreInfoProps; index: number }) => {
    switch (index) {
      case 0:
        let statusHm = formatAsStatus(
          plant?.species_humidity_min || 0,
          plant?.species_humidity_max || 0,
          plant?.reported.hm || 0,
        );
        return (
          <View style={{ marginVertical: 10, width: '100%' }}>
            <WidgetComp
              title={plant?.reported.temp + ''}
              background={
                statusHm
                  ? require('@Assets/image-background/good.png')
                  : require('@Assets/image-background/warning.png')
              }
              statusColor={statusHm ? colors.green1 : colors.red}
              status={statusHm ? 'Good' : 'Warning'}
              unit={item.unit}
              image={item.image}
              fontSize={32}
            />
          </View>
        );
      case 1:
        return (
          <View style={{ marginVertical: 10 }}>
            <WidgetComp
              title={plant?.reported.tvoc + ''}
              background={item.background}
              statusColor={item.statusColor}
              status={item.status}
              unit={item.unit}
              image={item.image}
              fontSize={32}
            />
          </View>
        );
      case 2:
        let statusTemp = formatAsStatus(
          plant?.species_temperature_min || 0,
          plant?.species_temperature_max || 0,
          plant?.reported.temp || 0,
        );
        return (
          <View style={{ marginVertical: 10 }}>
            <WidgetComp
              title={plant?.reported.temp + ''}
              background={
                statusTemp
                  ? require('@Assets/image-background/good.png')
                  : require('@Assets/image-background/warning.png')
              }
              statusColor={statusTemp ? colors.green1 : colors.red}
              status={statusTemp ? 'Good' : 'Warning'}
              unit={item.unit}
              image={item.image}
              fontSize={32}
            />
          </View>
        );
      case 3:
        let statusBr = formatAsStatus(
          plant?.species_bright_min_h || 0,
          plant?.species_bright_max_h || 0,
          Math.max(plant?.reported.br1 || 0, plant?.reported.br2 || 0, plant?.reported.br3 || 0) || 0,
        );
        return (
          <View style={{ marginVertical: 10 }}>
            <WidgetComp
              title={Math.max(plant?.reported.br1 || 0, plant?.reported.br2 || 0, plant?.reported.br3 || 0) + ''}
              background={
                statusBr
                  ? require('@Assets/image-background/good.png')
                  : require('@Assets/image-background/warning.png')
              }
              statusColor={statusBr ? colors.green1 : colors.red}
              status={statusBr ? 'Good' : 'Warning'}
              unit={item.unit}
              image={item.image}
              fontSize={32}
            />
          </View>
        );
      default:
        return <></>;
    }
  };
  return (
    <View style={[styles.containerScreen]}>
      <FlatList
        data={MORE_INFO_DATA}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          marginTop: 60,
          flexGrow: 1,
          width: WIDTH,
          alignItems: 'center',
        }}
      />
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsRequesting(),
});

export default connect(mapStateToProps)(MoreInfoComp);

const styles = StyleSheet.create({
  containerScreen: {
    flex: 1,
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  styleMoreInfo: {
    alignItems: 'center',
  },
});
