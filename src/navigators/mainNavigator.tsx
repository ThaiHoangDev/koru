import React, { memo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './bottomNavigator';
import { ParingNavigator } from './paringNavigator';
import { useRoute } from '@react-navigation/native';

import OrderScreen from '@Screens/shop/OrderScreen';
import PlantOrderDetailScreen from '@Screens/shop/PlantOrderDetailScreen';
import PlantDetail from '@Screens/home/PlantDetail';
import FanSpeedScreen from '@Screens/home/FanSpeedScreen';
import SoilDetailScreen from '@Screens/home/SoilDetailScreen';
import EditPlantInfoScreen from '@Screens/home/EditPlantInfo';

export type MainStackParamList = {
  TabBar: undefined;
  Paring: undefined;
  PlantDetail: undefined;
  FanSpeedScreen: undefined;
  OrderScreen: undefined;
  PlantOrderDetailScreen: undefined;
  EditPlantInfo: undefined;
  SoilDetailScreen: undefined;
};

const MainStack = createStackNavigator<MainStackParamList>();
const MainNavigator = () => {
  const route: any = useRoute();
  return (
    <MainStack.Navigator initialRouteName={route?.params?.screen || 'TabBar'}>
      <MainStack.Screen
        name="Paring"
        component={ParingNavigator}
        options={{ headerShown: false, presentation: 'card' }}
      />
      <MainStack.Screen name="TabBar" component={BottomTabNavigator} options={{ headerShown: false }} />
      <MainStack.Screen name="OrderScreen" component={OrderScreen} />
      <MainStack.Screen name="PlantOrderDetailScreen" component={PlantOrderDetailScreen} />
      <MainStack.Screen name="PlantDetail" component={PlantDetail} options={{ headerShown: true }} />
      <MainStack.Screen name="EditPlantInfo" component={EditPlantInfoScreen} options={{ headerShown: true }} />
      <MainStack.Screen name="FanSpeedScreen" component={FanSpeedScreen} options={{ headerShown: true }} />
      <MainStack.Screen name="SoilDetailScreen" component={SoilDetailScreen} />
    </MainStack.Navigator>
  );
};

export default memo(MainNavigator);
