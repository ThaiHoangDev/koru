import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import SearchIcon from '@Components/iconSvg/SearchIcon';
import { colors } from '@Theme/index';

export default function SearchComp() {
  const handleSearch = () => {};
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleSearch}>
        <SearchIcon />
      </TouchableOpacity>
      <View style={styles.searchBar}>
        <TextInput style={styles.input} />
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
    marginHorizontal: 10,
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
    borderRadius: 25,
    height: 32,
    borderColor: colors.grey06,
    borderWidth: 2,
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    paddingHorizontal: 20
  },
});
