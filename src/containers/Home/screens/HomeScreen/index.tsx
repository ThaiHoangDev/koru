import { View, Text, StyleSheet, TouchableOpacity, FlatList, RefreshControl, FlatListProps } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
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
import { makeSelectIsRequesting, makeSelectMyPlant } from '@Containers/Home/store/selectors';

import { colors, fontFamily } from '@Theme/index';
import { HomeStackParamList } from '@Navigators/homeNavigator';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
type HomeScreenRouteProp = RouteProp<HomeStackParamList, 'HomeScreen'>;

interface IProps {
  isLoading: boolean;
  myPlant: any;
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

function HomeContainer(props: IProps) {
  const { isLoading, myPlant, navigation, route } = props;
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

  const loadMoreMyPlant = () => {};
  const handleRefresh = () => {
    setIsRefresh(true);
  };

  useEffect(() => {
    const payload = {
      page,
      perpage: 10,
      search: searchText,
    };
    dispatch(HomeActions.getMyPlant.request(payload));
    isRefresh &&
      setTimeout(() => {
        setIsRefresh(false);
      }, 1000);
  }, [page, isRefresh, dispatch]);

  const handleGoToPairing = () => {
    navigation.navigate('Paring');
  };

  const handlePress = () => {
    navigation.navigate('PlantDetail');
  };

  const _renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={handlePress}
        style={{
          flex: 0.5,
          minHeight: 204,
        }}>
        <PlantBoxComp data={item} />
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
        keyExtractor={(item, index) => `${item.uuid.toString()}_${item.name.toString()}_${index.toString()}`}
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
        contentContainerStyle={styles.contenContainer}
        style={[styles.scrollList]}
      />
    </View>
  );
}

const mapStateToProps = createStructuredSelector({
  myPlant: makeSelectMyPlant(),
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
  contenContainer: {
    flex: 1,
  },
});
