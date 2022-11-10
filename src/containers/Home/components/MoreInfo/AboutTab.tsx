import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { HFlatList } from 'react-native-head-tab-view';
import { IS_ANDROID } from '@Constants/app';

interface IProps {
  aboutInfo: any;
  index: number;
}

const AboutTab = (props: IProps) => {
  const { aboutInfo, index: viewIndex } = props;

  const _renderItem = ({ item }: any) => (
    <TouchableOpacity>
      <Text>screen1</Text>
    </TouchableOpacity>
  );
  return (
    <HFlatList
      index={viewIndex}
      bounces={false}
      scrollEnabled={IS_ANDROID}
      style={styles.flatList}
      data={[1, 2]}
      renderItem={_renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default AboutTab;

const styles = StyleSheet.create({
  flatList: {
    // flex: 1,
    backgroundColor: 'yellow',
  },
  image: {
    flexGrow: 1,
    aspectRatio: 4 / 3,
    width: '100%',
    marginVertical: 2,
  },
});
