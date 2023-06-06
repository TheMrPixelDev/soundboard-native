import { Text, View } from 'react-native';

export const Header = () => {
  return (
    <View
      style={{
        width: '100%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#222',
        paddingTop: 20,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
        PXL's Soundboard
      </Text>
    </View>
  );
};
