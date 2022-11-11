import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';

import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectIsRequesting, makeSelectMyMoreInfo } from '@Containers/Home/store/selectors';
import { HomeActions } from '@Containers/Home/store/actions';

import WidgetComp from '../WidgetComp';

interface IProps {
  myMoreInfo: any;
  isLoading: boolean;
}

const MoreInfoComp = (props: IProps) => {
  const { myMoreInfo } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(HomeActions.getMoreInfo.request());
  }, [dispatch]);

  const renderItem = ({ item, index }: any) => (
    <View style={{ marginVertical: 10 }}>
      <WidgetComp
        title={item.title}
        subTitle={item.subTitle}
        background={item.background}
        statusColor={item.statusColor}
        status={item.status}
        unit={item.unit}
        image={item.image}
      />
    </View>
  );
  return (
    <View style={[styles.containerScreen, styles.styleMoreInfo]}>
      <FlatList
        data={myMoreInfo}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ marginTop: 60 }}
      />
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  myMoreInfo: makeSelectMyMoreInfo(),
  isLoading: makeSelectIsRequesting(),
});

export default connect(mapStateToProps)(MoreInfoComp);

const styles = StyleSheet.create({
  containerScreen: {
    flex: 1,
    width: Dimensions.get('screen').width,
    flexDirection: 'column',
  },
  styleMoreInfo: {
    alignItems: 'center',
  },
});
