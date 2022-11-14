export interface PlantProps {
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
