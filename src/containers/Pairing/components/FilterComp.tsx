import { FlatList, StyleSheet } from 'react-native';
import React, { memo } from 'react';
import { ButtonComp } from '@Components/button';
import { colors } from '@Theme/index';
import { isEmpty } from 'lodash';
import { ListFilterGroupProps } from '../interfaces';
import { IPropsFilterGroup } from '../screens/ChoosePlant';

interface IProps {
  data: ListFilterGroupProps[];
  onFilter: (item: any) => void;
  filterGroup: IPropsFilterGroup;
}

const FilterComp = ({ data, onFilter, filterGroup }: IProps) => {
  const handleFilter = (item: any) => () => {
    onFilter({ group: !!item?.uuid ? item.uuid : '', ordering: !!item?.created_at ? item.created_at : '' });
  };

  const _header = () => {
    return (
      <ButtonComp
        title={'All'}
        stylesBtn={[styles.btn, { backgroundColor: !filterGroup.group ? colors.black2 : colors.gray04 }]}
        stylesTitle={styles.title}
        handlePress={handleFilter({ group: '', ordering: '' })}
        isLoading={false}
      />
    );
  };
  const _renderItem = ({ item, index }: { item: ListFilterGroupProps; index: number }) => {
    return (
      <ButtonComp
        title={item.name}
        stylesBtn={[styles.btn, { backgroundColor: filterGroup.group === item.uuid ? colors.black2 : colors.gray04 }]}
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
      ListHeaderComponent={_header}
      ListHeaderComponentStyle={{ height: 36 }}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ flex: 1 }}
    />
  );
};

export default memo(FilterComp);

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 8,
    height: 36,
    paddingHorizontal: 26,
  },
  title: {
    color: colors.white,
  },
});
