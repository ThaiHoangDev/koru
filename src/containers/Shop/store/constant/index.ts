export interface IMyOrderList {
  uuid: string;
  name: string;
  type: string;
  quantity: number;
  price: number;
  image: string;
}

export const MY_ORDER_LIST_DATA: IMyOrderList[] = [
  {
    uuid: 'sd',
    name: 'Ageratum1',
    type: 'Plant type',
    quantity: 1,
    price: 15000,
    image: 'hh',
  },
  {
    uuid: 'dss',
    name: 'Ageratum2',
    type: 'Plant type',
    quantity: 1,
    price: 15000,
    image: 'df',
  },
  {
    uuid: 'ghj',
    name: 'Ageratum3',
    type: 'Plant type',
    quantity: 1,
    price: 15000,
    image: 'df',
  },
];
