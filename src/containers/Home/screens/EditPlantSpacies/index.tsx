import { StyleSheet, Text, View, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';

import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { debounce, isEmpty } from 'lodash';

import {
  makeSelectIsRequesting,
  makeSelectListPlant,
  makeSelectListPlantGroup,
  makeSelectListPlantLoadMore,
} from '@Containers/Pairing/store/selectors';

import { IPropsFilterGroup } from '@Containers/Pairing/screens/ChoosePlant';
import { PairActions } from '@Containers/Pairing/store/actions';

import TopNavigationBar from '@Navigators/topNavigation';
import SearchComp from '@Containers/Home/components/SearchComp';
import FilterComp from '@Containers/Pairing/components/FilterComp';
import LoaderAnimationProgress from '@Components/lottie/loader';
import NoPlantComp from '@Containers/Home/components/NoPlantComp';
import PlantBox from '@Containers/Pairing/components/PlantBox';

import { colors, fontFamily } from '@Theme/index';
import { HEIGHT } from '@Constants/app';

interface IProps {
  isLoading: boolean;
  listPlant: any;
  listPlantGroup: any;
  loadMore: boolean;
  onClick: (species: string) => void;
}

export const PERPAGE = 10;

const EditPlantSpaciesContainer = (props: IProps) => {
  const { isLoading, listPlant, listPlantGroup, loadMore, onClick, ...rest } = props;

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [isRefresh, setIsRefresh] = useState(false);
  const [filterGroup, setFilterGroup] = useState<IPropsFilterGroup>({
    group: '',
    ordering: '',
  });
  const [speciesSelected, setSpeciesSelected] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const payload = {
      page: page,
      perpage: PERPAGE,
      search: searchText,
      group: filterGroup.group,
      ordering: filterGroup.ordering,
    };
    dispatch(PairActions.getListPlant.request(payload));
    isRefresh &&
      setTimeout(() => {
        setIsRefresh(false);
      }, 1000);
  }, [page, isRefresh, filterGroup]);

  useEffect(() => {
    setPage(1);
  }, [isRefresh]);

  useEffect(() => {
    const payload = {
      page,
      perpage: PERPAGE,
      search: '',
    };
    dispatch(PairActions.getListPlantGroup.request(payload));
  }, []);

  const loadMorePlant = () => {
    if (loadMore) {
      setPage(page + 1);
    }
  };
  const handleRefresh = () => {
    setIsRefresh(true);
  };

  const handleChangeText = (text: string) => {
    setSearchText(text);
    searchDebounce(text);
  };

  const handleSearch = (value: string) => {
    const payload = {
      page,
      perpage: PERPAGE,
      search: value,
      group: '',
      ordering: '',
    };
    dispatch(PairActions.getListPlant.request(payload));
  };

  const searchDebounce = useCallback(debounce(handleSearch, 400), []);

  const handleChoosePlant = (item: any) => () => {
    setSpeciesSelected(item.uuid);
    onClick(item);
  };

  const handleFilter = (item: any) => {
    setFilterGroup(item);
  };

  const _renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={{ paddingVertical: 10 }}>
          <Text style={[styles.txtTitle, { textAlign: 'center' }]}>Choose plant</Text>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.subTitle}>Search for the plant you want to grow</Text>
        </View>
        <SearchComp onChangeText={handleChangeText} />
        <View
          style={{
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FilterComp data={listPlantGroup} onFilter={handleFilter} filterGroup={filterGroup} />
        </View>
      </View>
    );
  };

  const _renderItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        style={[
          styles.element,
          {
            borderTopWidth: index === 0 ? 1 : 0,
            borderTopColor: colors.gray04,
            backgroundColor: item.uuid === speciesSelected ? 'rgba(139, 210, 66, 0.1)' : colors.white,
          },
        ]}
        onPress={handleChoosePlant(item)}>
        <PlantBox name={item?.name} type={item?.latin_name} uri={item?.image_url} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {_renderHeader()}
      <FlatList
        data={listPlant}
        renderItem={_renderItem}
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
        onEndReached={loadMorePlant}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          isLoading && !isRefresh ? (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <LoaderAnimationProgress source={require('@Assets/lotties/loading.json')} width={200} />
            </View>
          ) : isEmpty(listPlant) ? (
            <NoPlantComp />
          ) : null
        }
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: colors.gray04 }}></View>}
        keyExtractor={item => item.uuid.toString()}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      />
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsRequesting(),
  listPlant: makeSelectListPlant(),
  listPlantGroup: makeSelectListPlantGroup(),
  loadMore: makeSelectListPlantLoadMore(),
});
export default connect(mapStateToProps)(EditPlantSpaciesContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    minHeight: HEIGHT / 4.2,
    maxHeight: HEIGHT / 5,
  },
  txtTitle: {
    fontFamily: fontFamily.FreightBigProMedium,
    fontSize: 32,
    color: colors.black2,
  },
  subTitle: {
    fontFamily: fontFamily.Strawford,
    fontSize: 16,
    color: colors.grey06,
    fontWeight: '500',
  },
  element: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginVertical: 10,
    borderTopColor: colors.grey06,
  },
});
