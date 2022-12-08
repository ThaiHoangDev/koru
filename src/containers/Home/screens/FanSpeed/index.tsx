import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { createStructuredSelector } from 'reselect';
//
import { makeSelectMyPlant } from '@Containers/Home/store/selectors';
// import { HomeActions } from '@Containers/Home/store/actions';
//
import TopNavigationBar from '@Navigators/topNavigation';
import { HomeStackParamList } from '@Navigators/homeNavigator';
import BottomTab from '@Containers/Home/components/BottomTab';
import FanComp from '@Containers/Home/components/FanComp';
import WidgetComp from '@Containers/Home/components/WidgetComp';
import MenuIcon from '@Components/iconSvg/MenuIcon';
//
import { colors, fontFamily } from '@Theme/index';
import { PlantProps } from '@Containers/Home/store/interfaces';
import { formatAsStatus } from '@Utils/helper';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'FanSpeedScreen'>;
type HomeScreenRouteProp = RouteProp<HomeStackParamList, 'FanSpeedScreen'>;

interface IProps {
  myPlants: PlantProps[];
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

const FanSpeedContainer = (props: IProps) => {
  const { navigation, route, myPlants } = props;
  const dispatch = useDispatch();
  const currentPlant = myPlants.filter(item => route.params?.plant?.uuid === item.uuid)[0];

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: (p: any) => (
        <TopNavigationBar
          {...p}
          isLeft
          children={<Text style={styles.titleTab}>{'Fan speed'}</Text>}
          right={<MenuIcon />}
        />
      ),
    });
  }, [navigation]);

  const navigateFanSpeed = () => {
    navigation.navigate('FanSpeedScreen', { plant: currentPlant });
  };

  const navigateMoreInfo = () => {
    navigation.navigate('SoilDetailScreen', { plant: currentPlant });
  };

  const statusIVoc = (type: string) =>
    formatAsStatus(
      0,
      220,
      Math.max(currentPlant?.reported.tvoc, currentPlant?.reported.tvoc_1_lvl_ppb, currentPlant?.reported.tvoc_2_lvl_ppb),
    )
      ? type === 'title'
        ? 'Clean'
        : 'Good'
      : formatAsStatus(
          221,
          660,
          Math.max(
            currentPlant?.reported.tvoc,
            currentPlant?.reported.tvoc_1_lvl_ppb,
            currentPlant?.reported.tvoc_2_lvl_ppb,
          ),
        )
      ? type === 'title'
        ? 'Improving'
        : 'To hight'
      : type === 'title'
      ? 'Dirty'
      : 'Warning';

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <WidgetComp
          title={statusIVoc('title')}
          background={
            statusIVoc('') === 'Good'
              ? require('@Assets/image-background/good.png')
              : require('@Assets/image-background/warning.png')
          }
          statusColor={statusIVoc('') === 'Good' ? colors.green1 : colors.red}
          status={statusIVoc('subTitle')}
          unit={''}
          image={undefined}
          fontSize={24}
        />
      </View>
      <View style={{ flex: 2, justifyContent: 'flex-end', paddingTop: 40 }}>
        <FanComp fanValue={currentPlant?.reported.fan} />
      </View>
      <BottomTab isActiveRight onClickLeft={navigateMoreInfo} onClickRight={navigateFanSpeed} isDetail={false} />
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  myPlants: makeSelectMyPlant(),
});

export default connect(mapStateToProps)(FanSpeedContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerContainer: {
    flex: 0.16,
  },
  titleTab: {
    fontFamily: fontFamily.FreightBigProMedium,
    fontSize: 32,
    textAlign: 'center',
    color: colors.black2,
  },
});
