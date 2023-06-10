import { Header as RNUIHeader } from '@rneui/base';
import { Text, View } from 'react-native';

export const Header = () => {
  return (
    <RNUIHeader
      centerComponent={
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
          PXL's Soundboard
        </Text>
      }
    ></RNUIHeader>
  );
};
