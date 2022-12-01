import { View, Text, StyleSheet, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect, useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { createStructuredSelector } from 'reselect';
//components
import TopNavigationBar from '@Navigators/topNavigation';
import MenuIcon from '@Components/iconSvg/MenuIcon';
import SearchComp from '@Containers/Home/components/SearchComp';
import AddIcon from '@Components/iconSvg/AddIcon';
import LoaderAnimationProgress from '@Components/lottie/loader';
import NoPlantComp from '@Containers/Home/components/NoPlantComp';

import PlantBoxComp from '@Containers/Home/components/PlantBoxComp';
import { PlantProps } from '@Containers/Home/store/interfaces';
import { HomeActions } from '@Containers/Home/store/actions';
import { makeSelectIsRequesting, makeSelectLoadMore, makeSelectMyPlant } from '@Containers/Home/store/selectors';

import { colors, fontFamily } from '@Theme/index';
import { HomeStackParamList } from '@Navigators/homeNavigator';
import { MQTTActions } from '@Containers/MQTT/store/actions';

import { AWSActions } from '@Containers/AWS/store/actions';
import { useInjectSaga } from '@Utils/injectSaga';
import { useInjectReducer } from '@Utils/injectReducer';
import awsReducer from '@Containers/AWS/store/reducers';
import awsSaga from '@Containers/AWS/store/sagas';
import { makeSelectIsLoggedIn } from '@Containers/App/store/selectors';
import { makeSelectMQTTstatus } from '@Containers/MQTT/store/selectors';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
type HomeScreenRouteProp = RouteProp<HomeStackParamList, 'HomeScreen'>;

interface IProps {
  isLoggin: boolean;
  isLoading: boolean;
  loadMore: any;
  myPlant: PlantProps[];
  mqttStatus: boolean;
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

function HomeContainer(props: IProps) {
  const { isLoading, myPlant, navigation, route, isLoggin, mqttStatus, loadMore } = props;
  // const isFocus = useIsFocused();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [isRefresh, setIsRefresh] = useState(false);
  const [searchText, setSearchText] = useState('');
  useInjectSaga({ key: 'awsSdk', saga: awsSaga });
  useInjectReducer({ key: 'awsSdk', reducer: awsReducer });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: (p: any) => (
        <TopNavigationBar {...p} children={<Text style={styles.titleTab}>{'My Koru'}</Text>} right={<MenuIcon />} />
      ),
    });
  }, [navigation, route]);

  const handleSearch = (value: string) => {
    const payload = {
      page,
      perpage: 10,
      search: value,
    };
    dispatch(HomeActions.getMyPlant.request(payload));
  };

  const searchDebounce = useCallback(debounce(handleSearch, 400), []);

  const handleChangeText = (text: string) => {
    setSearchText(text);
    searchDebounce(text);
  };

  const loadMoreMyPlant = () => {
    if (loadMore) {
      setPage(page + 1);
    } else {
      setPage(page);
    }
  };
  const handleRefresh = () => {
    setIsRefresh(true);
    setPage(1);
  };
  //init MQTT
  const initAWS = useCallback(async () => {
    const data = await Auth.currentCredentials();
    dispatch(AWSActions.awsConnectRequest.request(data));
  }, [isLoggin]);

  const handleGoToPairing = () => {
    navigation.navigate('Paring');
  };

  const handlePress = (uuid: any) => () => {
    navigation.navigate('PlantDetail', { uuid });
  };

  const _renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={handlePress(item.uuid)}
        style={{
          flex: 0.48,
          minHeight: 204,
          marginBottom: 20,
        }}>
        <PlantBoxComp data={item} shopScreen={false} />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    isLoggin && initAWS();
  }, [initAWS, isLoggin]);

  useEffect(() => {
    !mqttStatus && dispatch(MQTTActions.init_MQTT.request());
  }, [mqttStatus]);

  useEffect(() => {
    mqttStatus && dispatch(HomeActions.getThingShadow.request(myPlant));
  }, [myPlant.length, mqttStatus]);

  useEffect(() => {
    const payload = {
      page: isRefresh ? 1 : page,
      perpage: 10,
      search: searchText,
    };
    (mqttStatus || isLoading) && dispatch(HomeActions.getMyPlant.request(payload));
    setTimeout(() => {
      setIsRefresh(false);
    }, 700);
  }, [page, isRefresh, dispatch, mqttStatus]);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.headerContainer}>
        <SearchComp onChangeText={handleChangeText} />
        <TouchableOpacity style={styles.addContainer} onPress={handleGoToPairing}>
          <AddIcon />
        </TouchableOpacity>
      </View>
      <FlatList
        data={myPlant}
        keyExtractor={(item, index) => `${item.uuid.toString()}_${index.toString()}`}
        renderItem={_renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreMyPlant}
        refreshControl={
          <RefreshControl
            tintColor={colors.white2}
            refreshing={isRefresh}
            onRefresh={handleRefresh}
            children={
              isRefresh && (
                <View style={{ alignItems: 'center', justifyContent: 'center', zIndex: 3 }}>
                  <LoaderAnimationProgress source={require('@Assets/lotties/refreshing.json')} width={30} />
                </View>
              )
            }
          />
        }
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          isLoading && !isRefresh ? (
            <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
              <LoaderAnimationProgress source={require('@Assets/lotties/loading.json')} width={200} />
            </View>
          ) : myPlant.length <= 0 ? (
            <NoPlantComp />
          ) : null
        }
        style={[styles.scrollList]}
      />
    </View>
  );
}

const mapStateToProps = createStructuredSelector({
  myPlant: makeSelectMyPlant(),
  loadMore: makeSelectLoadMore(),
  isLoading: makeSelectIsRequesting(),
  isLoggin: makeSelectIsLoggedIn(),
  mqttStatus: makeSelectMQTTstatus(),
});

export default connect(mapStateToProps)(HomeContainer);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  titleTab: {
    fontFamily: fontFamily.FreightBigProMedium,
    fontSize: 32,
    textAlign: 'center',
    color: colors.black2,
  },
  addContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  scrollList: { width: '100%', flex: 1 },
});
