import { View, Text, StyleSheet, TouchableOpacity, FlatList, RefreshControl, FlatListProps } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect, useDispatch } from 'react-redux';
import { debounce, isEmpty } from 'lodash';
import { createStructuredSelector } from 'reselect';
//components
import TopNavigationBar from '@Navigators/topNavigation';
import MenuIcon from '@Components/iconSvg/MenuIcon';
import SearchComp from '@Containers/Home/components/SearchComp';
import AddIcon from '@Components/iconSvg/AddIcon';
import LoaderAnimationProgress from '@Components/lottie/loader';
import NoPlantComp from '@Containers/Home/components/NoPlantComp';

import PlantBoxComp from '@Containers/Home/components/PlantBoxComp';
import { HomeActions } from '@Containers/Home/store/actions';
import { makeSelectIsRequesting, makeSelectLoadMore, makeSelectMyPlant } from '@Containers/Home/store/selectors';

import { colors, fontFamily } from '@Theme/index';
import { HomeStackParamList } from '@Navigators/homeNavigator';
import { MQTTActions } from '@Containers/MQTT/store/actions';
import { PlantProps } from '@Containers/Home/store/interfaces';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
type HomeScreenRouteProp = RouteProp<HomeStackParamList, 'HomeScreen'>;

interface IProps {
  isLoading: boolean;
  myPlant: any;
  loadMore: any;
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

function HomeContainer(props: IProps) {
  const { isLoading, myPlant, loadMore, navigation, route } = props;
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [isRefresh, setIsRefresh] = useState(false);
  const [searchText, setSearchText] = useState('');

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
  };

  useEffect(() => {
    const payload = {
      page: isRefresh ? 1 : page,
      perpage: 10,
      search: searchText,
    };
    dispatch(HomeActions.getMyPlant.request(payload));
    isRefresh &&
      setTimeout(() => {
        setIsRefresh(false);
        setPage(1);
      }, 1000);
  }, [page, isRefresh, dispatch]);

  useEffect(() => {
    dispatch(MQTTActions.init_MQTT.request());
  }, []);

  useEffect(() => {
    myPlant.length > 0 && dispatch(HomeActions.attachPolicy.request(myPlant));
  }, [myPlant]);

  const handleGoToPairing = () => {
    navigation.navigate('Paring');
  };

  const handlePress = (uuid: any) => () => {
    navigation.navigate('PlantDetail', { uuid });
  };

  const onAddToCard = () => {};

  const _renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={handlePress(item.uuid)}
        style={{
          flex: 0.48,
          minHeight: 204,
          marginBottom: 20,
        }}>
        <PlantBoxComp data={item} shopScreen={false} onAddToCard={onAddToCard} />
      </TouchableOpacity>
    );
  };

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
            tintColor={'#fff'}
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
