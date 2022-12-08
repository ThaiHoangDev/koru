import { createRef } from 'react';
import { StackActions } from '@react-navigation/native';
// import { NavigatorScreenParams } from '@react-navigation/native';
import type { NavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '@Navigators/appNavigator';

export const navigationRef = createRef<NavigationContainerRef<RootStackParamList>>();

export let isMountedRef = createRef<any>();

export function navigate(name: any, params = {}) {
  navigationRef.current?.navigate(name, params);
}

export function pushNav(name: string, params = {}) {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}

export function goBack() {
  navigationRef.current?.goBack();
}
