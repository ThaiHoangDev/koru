import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ButtonComp } from '@Components/button';
import { colors } from '@Theme/index';

const SEARCH = [
  { label: 'All', type: 'ALL' },
  { label: 'orchideen', type: 'ORCH' },
  { label: 'Indor', type: 'INDOR' },
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
      data={data}
      keyExtractor={item => item.toString()}
      renderItem={_renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default FilterComp;

const styles = StyleSheet.create({
  btn: {
    marginHorizontal: 10,
    borderRadius: 8,
    paddingHorizontal: 26,
  },
  title: {
    color: colors.white,
  },
});
