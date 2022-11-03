import { FlatList, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { ShopStackParamList } from '@Navigators/shopNavigator';
import { RouteProp } from '@react-navigation/native';
import TopNavigationBar from '@Navigators/topNavigation';
import { colors, fontFamily } from '@Theme/index';

import WaterIcon from '@Components/iconSvg/shop/WaterIcon';
import { ButtonComp } from '@Components/button';
import LuxIcon from '@Components/iconSvg/shop/LuxIcon';
import CIcon from '@Components/iconSvg/shop/CIcon';
import PlantIcon4 from '@Components/iconSvg/shop/PlantIcon4';
import ChangeQuantityComp from '../components/ChangeQuantityComp';
import { Order } from '@Containers/Shop/interfaces';
import { HEIGHT, WIDTH } from '@Constants/app';
import { ImageBackgroundCompLayout } from '@Components/image-backgroundComp/index';

type PlantOrderDetailScreenNavigationProp = StackNavigationProp<ShopStackParamList, 'PlantOrderDetailScreen'>;
type PlantOrderDetailScreenRouteProp = RouteProp<ShopStackParamList, 'PlantOrderDetailScreen'>;

interface IProps {
  isLoading: boolean;
  data: Order;
  navigation: PlantOrderDetailScreenNavigationProp;
  route: PlantOrderDetailScreenRouteProp;
}

interface IIcon {
  name: string;
  icon: any;
}

const IconWheater: IIcon[] = [
  { name: 'Einheit', icon: <WaterIcon /> },
  { name: '2000 lux', icon: <LuxIcon /> },
  { name: '2000 lux', icon: <LuxIcon /> },
  { name: '20oC', icon: <CIcon /> },
];

const plantData = {
  name: 'Monstera',
  price: 40.0,
  type: 'Plant type',
  quantity: 1,
  description:
    'Lörem ipsum dor epitärat. Teligt mina saras ett mikroföse. Anat. Ghosta videv, i göra en labrador. Trafikmaktordning ihår. Lat negt dilig. Hypor. Begen otrohetsdejting därför att euroren. Ytt piheliga,',
  image: <PlantIcon4 />,
};

const ItemDetailContainer = (props: IProps) => {
  const { isLoading, navigation, route, data } = props;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: (p: any) => <TopNavigationBar {...p} isLeft children={<Text style={styles.titleTab}>{''}</Text>} />,
    });
  }, [navigation]);

  const handleIncrease = () => {};

  const handleDecrease = () => {};

  const _renderItem = ({ item, index }: any) => {
    return (
      <View
        style={{
          flex: 1,
          width: WIDTH / 4.4,
          height: HEIGHT / 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>{item.icon}</Text>
        <Text style={styles.textWheater}>{item.name}</Text>
      </View>
    );
  };

  const handleSubmit = () => {};

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 0.8 }}>
        {/* <ImageBackgroundCompLayout
          source={require('@Assets/image-background/plant.png')}
          children={ */}
        <View style={styles.itemImage}>
          <PlantIcon4 />
        </View>
        {/* }
        /> */}
        <View style={{ flex: 0.4, paddingHorizontal: 20 }}>
          <View style={styles.textHead}>
            <Text style={[styles.itemName, styles.fontStyle]}>{plantData.name}</Text>
            <Text style={[styles.itemPrice, styles.fontStyle]}>${plantData.price}</Text>
          </View>
          <View style={styles.price}>
            <Text style={styles.typeText}>{plantData.type}</Text>
            <ChangeQuantityComp onPressDecrease={handleDecrease} onPressIncrease={handleIncrease} data={data} />
          </View>
          <Text style={styles.textItemDetail}>{plantData.description}</Text>
          <FlatList
            data={IconWheater}
            horizontal
            keyExtractor={(item, index) => `${item.name.toString()}_${index.toString()}`}
            renderItem={_renderItem}
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ flex: 1, marginTop: 20 }}
          />
        </View>
      </ScrollView>
      <View style={{ flex: 0.18, paddingHorizontal: 20 }}>
        <ButtonComp
          title={'Add to card'}
          handlePress={handleSubmit}
          stylesBtn={[styles.btn]}
          stylesTitle={[styles.txtBtn, styles.fontFamily]}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

export default ItemDetailContainer;

const styles = StyleSheet.create({
  titleTab: {
    fontFamily: fontFamily.FreightBigProMedium,
    fontSize: 32,
    textAlign: 'center',
    color: colors.black2,
  },
  container: {
    flex: 1,
  },

  itemImage: {
    flex: 0.5,
    padding: 20,
    alignItems: 'center',
  },

  textHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  fontStyle: {
    fontFamily: fontFamily.Strawford,
    fontWeight: '500',
    fontSize: 24,
  },

  itemName: {
    color: colors.black2,
  },

  itemPrice: {
    color: '#33704D',
  },

  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  typeText: {
    fontFamily: fontFamily.Strawford,
    fontSize: 16,
    fontWeight: '500',
    color: colors.grey06,
  },

  textItemDetail: {
    textAlign: 'justify',
    paddingVertical: 15,
    fontFamily: fontFamily.Strawford,
    fontSize: 13,
    color: 'grey',
  },

  textWheater: {
    marginTop: 8,
    fontFamily: fontFamily.Strawford,
    fontSize: 13,
    color: colors.black2,
  },

  btn: {
    backgroundColor: colors.black2,
    borderRadius: 25,
    height: 48,
    marginTop: 20,
  },

  txtBtn: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.white,
  },
  fontFamily: {
    fontFamily: fontFamily.Strawford,
  },
});
