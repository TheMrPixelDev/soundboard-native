import { Pressable, View, Text } from 'react-native';
import { SoundData } from './types';

export type SoundButtonProps = {
  soundData: SoundData;
  onClick: (sound: SoundData) => void;
};

export const SoundButton = (props: SoundButtonProps) => {
  const { text, color } = props.soundData;
  return (
    <Pressable
      style={{
        backgroundColor:
          color === 'red'
            ? '#e80077'
            : color === 'green'
            ? '#53f92a'
            : color === 'yellow'
            ? '#bbf92a'
            : '#48afea',
        width: '40%',
        height: 70,
        margin: 10,
        borderRadius: 5,
        padding: 10,
      }}
      onPress={() => props.onClick(props.soundData)}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{
            color: 'black',
            fontWeight: '500',
          }}
        >
          {text}
        </Text>
      </View>
    </Pressable>
  );
};
