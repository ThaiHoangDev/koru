export interface Plant {
  uuid: string;
  name: string;
  bluetooth_uid: string;
  user_id: string;
  species_name: string;
  species: string;
  identity_id: string;
  secret: string;
  species_image: string;
  [key: string]: string;
}

export interface MyPlantProps {
  data: Plant;
}

export interface IMoreInfoProps {
  title: string;
  image: React.ReactNode;
  status: string;
  statusColor: string;
  background: any;
  subTitle: string;
  unit: string;
}
