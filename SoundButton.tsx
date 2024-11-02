import { useState } from 'react';
import { SoundData } from './types';
import { Card, IconButton, MD3Colors, Text } from 'react-native-paper';

export type SoundButtonProps = {
  soundData: SoundData;
  onClick: (sound: SoundData, stopCallback: () => void) => void;
};

export const SoundButton = ({ soundData, onClick }: SoundButtonProps) => {
  const [playing, setPlaying] = useState<boolean>(false);

  const { text } = soundData;

  return (
    <Card mode="contained" style={{ width: '40%', margin: 10 }}>
      <Card.Content>
        <Text lineBreakMode="middle">{text}</Text>
      </Card.Content>
      <Card.Actions>
        <IconButton
          mode="contained"
          iconColor={MD3Colors.error0}
          containerColor={'#af8ee5'}
          icon={playing ? 'stop' : 'play'}
          onPress={() => {
            setPlaying(true);
            onClick(soundData, () => setPlaying(false));
          }}
        />
      </Card.Actions>
    </Card>
  );
};
