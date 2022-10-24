import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';


const Stack = createStackNavigator();

export const SettingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Setting">
      <Stack.Screen name="Setting" component={()=><View><Text>Setting</Text></View>} />
    </Stack.Navigator>
  );
};

