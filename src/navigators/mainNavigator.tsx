import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabNavigator } from './bottomNavigator';
import { ParingNavigator } from './paringNavigator';
import { useRoute } from '@react-navigation/native';

import OrderScreen from '@Screens/shop/OrderScreen';
import PlantOrderDetailScreen from '@Screens/shop/PlantOrderDetailScreen';
import PlantDetail from '@Screens/home/PlantDetail';
import FanSpeedScreen from '@Screens/home/FanSpeedScreen';
import SoilDetailScreen from '@Screens/home/SoilDetailScreen';

const MainStack = createStackNavigator();
export type MainStackParamList = {
  TabBar: undefined;
  Paring: undefined;
  PlantDetail: undefined;
  FanSpeedScreen: undefined;
  OrderScreen: undefined;
};

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
      <MainStack.Screen name="OrderScreen" component={(props: any) => <OrderScreen {...props} />} />
      <MainStack.Screen
        name="PlantOrderDetailScreen"
        component={(props: any) => <PlantOrderDetailScreen {...props} />}
      />
      <MainStack.Screen
        name="PlantDetail"
        component={(props: any) => <PlantDetail {...props} />}
        options={{ headerShown: true }}
      />
      <MainStack.Screen
        name="FanSpeedScreen"
        component={(props: any) => <FanSpeedScreen {...props} />}
        options={{ headerShown: true }}
      />
      <MainStack.Screen name="SoilDetailScreen" component={(props: any) => <SoilDetailScreen {...props} />} />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
