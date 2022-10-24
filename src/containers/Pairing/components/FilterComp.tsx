import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ButtonComp } from '@Components/button';
import { colors } from '@Theme/index';

const SEARCH = [
  { label: 'All', type: 'ALL' },
  { label: 'orchideen', type: 'ORCH' },
  { label: 'Indor', type: 'INDOR' },
];

const FilterComp = () => {
  const handleFilter = () => {};
  const _renderItem = ({ item, index }: any) => {
    return (
      <ButtonComp
        title={item.label}
        stylesBtn={[styles.btn, { backgroundColor: index === 0 ? colors.black2 : colors.gray04 }]}
        stylesTitle={styles.title}
        handlePress={handleFilter}
      />
    );
  };
  return (
    <FlatList
      data={SEARCH}
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
