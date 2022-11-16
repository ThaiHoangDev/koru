import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

//
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

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'FanSpeedScreen'>;
type HomeScreenRouteProp = RouteProp<HomeStackParamList, 'FanSpeedScreen'>;

interface IProps {
  isLoading: boolean;
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

const FanSpeedContainer = (props: IProps) => {
  const { navigation } = props;
  const dispatch = useDispatch();

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
    navigation.navigate('FanSpeedScreen');
  };
  const navigateMoreInfo = () => {
    navigation.navigate('SoilDetailScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <WidgetComp
          title={'hhh'}
          subTitle={'jjj'}
          background={undefined}
          statusColor={''}
          status={''}
          unit={''}
          image={undefined}
        />
      </View>
      <View style={{ flex: 2, justifyContent: 'flex-end', paddingTop: 40 }}>
        <FanComp />
      </View>
      <BottomTab isActiveRight onClickLeft={navigateMoreInfo} onClickRight={navigateFanSpeed} isDetail={false} />
    </View>
  );
};

export default FanSpeedContainer;

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
