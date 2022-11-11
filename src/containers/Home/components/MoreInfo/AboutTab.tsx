import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { HFlatList } from 'react-native-head-tab-view';
import { IS_ANDROID } from '@Constants/app';
import { colors, fontFamily } from '@Theme/index';

interface IProps {
  aboutInfo: any;
  index: number;
}

interface IPropsPlant {
  title: string;
  type: string;
  description: string;
}

const DATA: IPropsPlant[] = [
  {
    title: 'Information',
    type: 'Plant type',
    description:
      'Lörem ipsum dor epitärat. Teligt mina saras ett mikroföse. Anat. Ghosta videv, i göra en labrador. Trafikmaktordning ihår. Lat negt dilig. Hypor. Begen otrohetsdejting därför att euroren. Ytt piheliga, deska.',
  },
];

const AboutTab = (props: IProps) => {
  const { aboutInfo, index: viewIndex } = props;

  const _renderItem = ({ item }: any) => (
    <TouchableOpacity>
      <Text style={[styles.titleInfo, styles.fontStyle]}>{item.title}</Text>
      <Text style={[styles.typePlant, styles.fontStyle]}>{item.type}</Text>
      <Text style={[styles.description, styles.fontStyle]}>{item.description}</Text>
    </TouchableOpacity>
  );
  return (
    <HFlatList
      index={viewIndex}
      bounces={false}
      scrollEnabled={IS_ANDROID}
      style={styles.flatList}
      data={DATA}
      renderItem={_renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default AboutTab;

const styles = StyleSheet.create({
  flatList: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  image: {
    flexGrow: 1,
    aspectRatio: 4 / 3,
    width: '100%',
    marginVertical: 2,
  },
  fontStyle: {
    fontFamily: fontFamily.Strawford,
  },
  titleInfo: {
    fontWeight: '500',
    fontSize: 24,
    color: colors.black,
  },
  typePlant: {
    marginTop: 10,
    fontWeight: '700',
    fontSize: 13,
    color: colors.grey,
  },
  description: {
    marginTop: 20,
    fontWeight: '400',
    fontSize: 13,
    color: colors.grey,
    textAlign: 'justify',
  },
});
