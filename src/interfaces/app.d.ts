import { TabParamList } from '@Navigators/bottomNavigator';
import { ShopStackParamList } from '@Navigators/shopNavigator';
import { HomeStackParamList } from '@Navigators/homeNavigator';

import type { CompositeNavigationProp, CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';

// screen props
export type HomeProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Home'>,
  StackScreenProps<HomeStackParamList>
>;
export type ShopProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Shop'>,
  StackScreenProps<ShopStackParamList, 'ShopScreen'>
>;
//navigation
export type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Home'>,
  StackNavigationProp<HomeStackParamList, 'HomeScreen'>
>;
export type ShopScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Shop'>,
  StackNavigationProp<ShopStackParamList, 'ShopScreen'>
>;


export type SettingProps = StackScreenProps<RootStackParamList, 'Setting'>;

export type RootStackParamList = {
  Home: undefined;
  Shop: undefined;
  Setting: undefined;
};
export interface GlobalTypes {
  profile: object | null;
  isLoading: boolean;
  isRequesting: boolean;
  errors: object | null;
  permissionLocation: boolean;
}

export interface IRoute {
  name: string;
  params: object | any;
}

export interface INavigation {
  navigate(route: string | object, params?: object): void;
  goBack(): void;
  toggleDrawer?(): void;
  push(route: string, params?: object): void;
}

export interface ModalPropType {
  title?: string;
  isVisible: boolean;
  onClose?(): void;
  children: any;
  [data: string]: any;
}

export interface IErrors {
  message: string;
  message_code: string | number;
  [data: string]: any;
}

export interface IAction {
  type: string;
  payload: any;
}

export interface PropsScreen {
  navigation: INavigation;
  route: IRoute;
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface DutyStatusItem {
  duty_status: string;
  id: number;
}

export interface Vehicle {
  engine_hours: number;
  id: number;
  make: string;
  mileage: number;
  model: string;
  year: number;
}

export interface VehicleConfig {
  id: number;
  driverId: number;
  vehicleId: number;
  trailerIds: number[];
  shippingIds: number[];
}

export interface Trailer {
  id: number;
  name: string;
  link: string;
}

export interface Remark {
  id: number;
  title: string;
}

export interface ShippingID {
  id: number;
  name: string;
}

export interface Journey {
  id: number;
  driver_id: number;
  trailers: Trailer[];
  shippings: ShippingID[];
  vehicle: Vehicle;
}

export interface Profile {
  id: number;
  username: string;
  avatar: string;
  cover: string;
  address: string;
  driver_id: number;
  phone?: string;
  cover_image_key: string;
  cover_image_url: string;
  image_key: null;
  image_url: null;
}

export interface DOC {
  id: number;
  document_template_name: string;
  created_at: number;
  status: string;
}

export interface DOC_DETAIL extends DOC {
  field_inputs: {
    label: string;
    type: string;
    answer: string | number | string[] | object | any;
  }[];
  notes: string;
}

export interface Driver {
  driver_name: string;
  id: number;
  is_passenger: boolean;
  status: string;
  username: string;
}

export type LANGUAGE = 'en' | 'de';

export interface IMessage {
  id: string;
  senderId: number;
  message: string;
  time: number;
}

export interface IProfile {
  id: number;
  name: string;
  vehicle: string;
  username: string;
}

export interface ILogEdit {
  id: number;
  duty_status: string;
  start_time: number;
  end_time: number;
  remark: string;
  location: string;
}

export interface IGetMessages {
  channel_id: string;
  channel: string;
}

export interface ISendMessage extends IGetMessages {
  idProfile: number;
  msg: string;
  date: number;
}

export interface ISendMessageNotification {
  title: string;
  body: string;
}

export interface IDataAddDeviceId {
  device_id: string;
}

export interface ITrailerVehicle {
  vehicle_id: number;
  vehicle_name: string;
}

export interface IListInspectionVehicle {
  inspection: IInspection[];
  vehicle_name: string;
  vehicle_serialnumber: string;
  trailer_name: string;
}

export interface CreateDVIRPayload {
  type: string;
  inspectionType: string;
  safetyStatus: string;
  name: string;
  vehicleVIN: string;
  license: string;
  odometer: string;
  location: string;
  listPhoto: any;
  listInspectVehicle: any;
  id: number;
}

export interface IListPerformInspectionPayload {
  id: number;
  type: string;
}

export interface IDvirDetail {
  inspection_type: string;
  license_plate: string;
  odomenter: string;
  location: string;
  perform_inspection: IListInspectionVehicle;
  photo_back: string;
  photo_driver: string;
  photo_front: string;
  photo_passenger: string;
  photo_trailer_back: string;
  photo_trailer_left: string;
  photo_trailer_right: string;
  safety_status: string;
  vehicle_name: string;
  vehicle_serialnumber: string;
  trailer_name: string;
}

export interface CreateDVIRPayloadService {
  inspection_type: string;
  safety_status: string;
  license_plate: string;
  location: string;
  odomenter: string;
}

export interface IInspection {
  defect_location: string;
  defect_name: string[];
}

export interface IDvir {
  dvir_id: number;
  dvir_created: string;
  dvir_inspection_type: string;
  dvir_safety_status: string;
  dvir_user_name: string;
}

export interface IDailyLogs {
  id: number;
  date: string;
  duration: string;
  label: string;
}

export interface ILog {
  duration: string;
  end_time: number;
  id: number;
  location: string | null;
  remark: string | null;
  start_time: number;
  status_in_team: string | null;
  vehicle_name: string;
  duty_status: string;
}

export interface IDailyDetail {
  id: number;
  confirmed: boolean;
  exemptions: string[];
  remarks: { remark: string; time: number }[] | [];
  ruleset: string;
  shipping_ids: string;
  trailers: string;
  timezone: string;
  violations: any[];
  driver_logs: ILog[];
}

export interface IUpdateDailyLog {
  id: number;
  remarks: { remark: string; time: number }[] | [];
  shipping_ids: string;
  trailers: string;
}

export interface IDataChart {
  id: number;
  start_time: number;
  end_time: number;
}

export interface IDataLog extends IDataChart {
  duty_status: string;
  remark: string | null;
  location: string | null;
}

export interface IPayloadEditDailyLog {
  duty_status: string;
  end_time: number;
  location: string;
  remark: string;
  start_time: number;
  id: number;
  selectedDate: string;
}

export interface IServiceEditDailyLog {
  dataPayload: {
    duty_status: string;
    end_time: number;
    location: string;
    remark: string;
    start_time: number;
  };
  id: number;
}

export interface ICheckPinCode {
  pin_code: string;
  session: string;
}

export interface IInfoDailyLog {
  carrier: string;
  co_drivers: string;
  distance: string;
  dl_number: number;
  dl_state: string;
  driver_id: number;
  driver_name: string;
  eld_id: string;
  eld_provider: string;
  exempt: string;
  hours_start_24: string;
  main_office: string;
  shipping_id: string;
  time_zone: string;
  trailer_id: string;
  truck_tractor_id: string;
  truck_tractor_vin: string;
  us_dot: string;
}

export interface ILogInspection {
  duration: string;
  duty_status: string;
  location: string;
  odometer: string;
  start_time: string;
  vehicle: string;
}

export interface IOdometerInspection {
  end: string;
  start: string;
  tractor_id: number;
  truck: string;
}

export interface IRecapInspection {
  hours_worker_today: string;
  list_date: {
    date: string;
    duration: string;
  }[];
  total_hours_avaliable_today: string;
  total_hours_last_7_days: string;
}

export interface IUnassignedInspection {
  start_time: string;
  unassigned_driving_hours: string;
  vehicle: string;
}

export interface IDailyLogInspection {
  info_daily_log: IInfoDailyLog;
  logs: ILogInspection[];
  odometer: IOdometerInspection;
  recap: IRecapInspection;
  unassigned: IUnassignedInspection;
}

export interface ICoordinate {
  latitude: number;
  longitude: number;
}
