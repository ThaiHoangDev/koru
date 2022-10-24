import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';


const Stack = createStackNavigator();

export const ShopNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Stack.Screen name="Home" component={()=><View><Text>ShopScreen</Text></View>} />
    </Stack.Navigator>
  );
};

