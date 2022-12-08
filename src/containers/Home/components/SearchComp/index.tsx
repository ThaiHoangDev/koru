import React from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, TextInputProps } from 'react-native';

import SearchIcon from '@Components/iconSvg/SearchIcon';
import { colors } from '@Theme/index';

interface IProps extends TextInputProps {}

export default function SearchComp(props: IProps) {
  const { ...rest } = props;
  const handleSearch = () => {};
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleSearch}>
        <SearchIcon />
      </TouchableOpacity>
      <View style={styles.searchBar}>
        <TextInput {...rest} style={styles.input} placeholder={'search'}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    marginHorizontal: 10,
    paddingVertical: 4,
    color: colors.black2,
    zIndex: 100,
  },
  backButton: {
    flex: 0.2,
    position: 'absolute',
    zIndex: 0,
    padding: 8,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    height: 32,
    borderColor: colors.gray04,
    borderRadius: 25,
    borderWidth: 1,
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    paddingHorizontal: 20,
  },
});
