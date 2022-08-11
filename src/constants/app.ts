import { Platform, Dimensions } from 'react-native'

export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const APP_ENV = process.env.NODE_ENV
export const BASE_API_URL = process.env.BASE_API_URL || ''
export const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY || ''
export const TOKEN_NAME = 'token'
export const TOKEN_PASSENGER = 'token_passenger'
export const TOKEN_FCM = 'token_fcm'
export const DRIVER_ID = 'driver_id'
export const REFRESH_TOKEN = 'refresh_token'
export const REFRESH_TOKEN_PASSENGER = 'refresh_token_passenger'
export const LANG_NAME = 'lang'
export const DEVICE_ID = 'idDevice'
export const THEME = 'useTheme'
export const DEFAULT_THEME = 'auto'

export const APPROX_STATUSBAR_HEIGHT = 0
export const DEFAULT_APPBAR_HEIGHT = 56
export const IS_ANDROID = Platform.OS === 'android'


export const WIDTH = Dimensions.get('screen').width
export const HEIGHT = Dimensions.get('screen').height
