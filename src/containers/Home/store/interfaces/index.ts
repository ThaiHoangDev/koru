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
  species_latin_name: string;
  species_max_height: number;
  species_replant_year: number;
  species_bright_ctf: number;
  species_bright_max_h: number;
  species_bright_min_h: number;
  species_bright_prio: string;
  species_fertilize_week: number;
  species_humidity_max: number;
  species_humidity_min: number;
  species_watering_frequency: number;
  species_temperature_max: number;
  species_temperature_min: number;
  species_soil_moisture_max: number;
  species_soil_moisture_min: number;
  reported: ReportedProps;
  [key: string]: string | boolean | number | ReportedProps;
}
export interface ReportedProps {
  br1: number;
  br2: number;
  br3: number;
  fan: number;
  hm: number;
  mst: number;
  pump: number;
  temp: number;
  ts: number;
  tvoc: number;
  wtl: number;
  tvoc_1_lvl_ppb: number;
  tvoc_2_lvl_ppb: number;
}
