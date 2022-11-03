export interface Order {
  uuid: string;
  name: string;
  type: string;
  quantity: number;
  price: number;
  image: string;
}

export interface MyPlantProps {
  data: Order;
}
