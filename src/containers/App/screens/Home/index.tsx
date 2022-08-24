import { ScrollView, View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';

export const HomeContainer = () => {
  const dispatch = useDispatch();
  // const devices = useSelector(
  //   (state: RootState) => state.bluetooth.availableDevices,
  // );

  return (
    <ScrollView>
      {/* {devices.map(device => (
        <>
          <Text>{JSON.stringify(device)}</Text>
          <View height={20} />
        </>
      ))}
      <Button
        title="Press Here To Scan"
        onPress={() => {
          dispatch(scanForPeripherals());
        }}
      /> */}
    </ScrollView>
  );
};
