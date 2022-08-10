import { createRef } from 'react';
import { StackActions } from '@react-navigation/native';

export const navigationRef = createRef<any>();

export let isMountedRef = createRef<any>();

export function navigate(name: string, params = {}) {
  navigationRef.current?.navigate(name, params);
}

export function pushNav(name: string, params = {}) {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}

export function goBack() {
  navigationRef.current?.goBack();
}
