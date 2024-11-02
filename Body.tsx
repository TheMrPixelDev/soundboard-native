import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SoundsDatabase } from './sounds';
import { SoundData } from './types';
import { Audio } from 'expo-av';
import { SoundButton } from './SoundButton';
import { Surface } from 'react-native-paper';

export type BodyProps = {
  onSoundClicked: (sound: SoundData, stopCallback: () => void) => void;
};

export const Body = (props: BodyProps) => {
  const { onSoundClicked } = props;
  const [sounds, setSounds] = useState<SoundData[] | undefined>(undefined);

  useEffect(() => {
    const categoryKeys = Object.keys(SoundsDatabase);
    let mergedSounds: SoundData[] = [];
    for (const key of categoryKeys) {
      mergedSounds = [...mergedSounds, ...SoundsDatabase[key]];
    }
    setSounds(mergedSounds);
  }, []);

  return (
    <Surface
      style={{
        flex: 1,
        width: '100%',
        height: '90%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      {sounds !== undefined
        ? sounds.map((soundData, idx) => {
            return (
              <SoundButton
                key={idx}
                onClick={(sd, stopCallback) => onSoundClicked(sd, stopCallback)}
                soundData={soundData}
              ></SoundButton>
            );
          })
        : null}
    </Surface>
  );
};
