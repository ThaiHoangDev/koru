import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ButtonComp } from '@Components/button';
import { colors } from '@Theme/index';
import { isEmpty } from 'lodash';

const SEARCH = [
  { name: 'All', type: 'ALL' },
  { name: 'orchideen', type: 'ORCH' },
  { name: 'Indor', type: 'INDOR' },
];

interface IProps {
  data: any;
  onFilter: (item: any) => void;
}

const FilterComp = ({ data, onFilter }: IProps) => {
  const handleFilter = (item: any) => () => {
    onFilter({ group: item?.uuid, ordering: item?.created_at });
  };
  const _renderItem = ({ item, index }: any) => {
    return (
      <ButtonComp
        title={item.name}
        stylesBtn={[styles.btn, { backgroundColor: index === 0 ? colors.black2 : colors.gray04 }]}
        stylesTitle={styles.title}
        handlePress={handleFilter(item)}
        isLoading={false}
      />
    );
  };
  return (
    <FlatList
      data={!isEmpty(data) ? data : SEARCH}
      keyExtractor={item => item.toString()}
      renderItem={_renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ flex: 1 }}
    />
  );
};

export default FilterComp;

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 8,
    paddingHorizontal: 26,
  },
  title: {
    color: colors.white,
  },
});
