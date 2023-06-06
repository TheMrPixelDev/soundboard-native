import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SoundsDatabase } from './sounds';
import { SoundData } from './types';
import { Audio } from 'expo-av';
import { SoundButton } from './SoundButton';

export type BodyProps = {
  onSoundClicked: (sound: SoundData) => void;
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
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '90%',
        backgroundColor: '#222',
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
                onClick={(sd) => onSoundClicked(sd)}
                soundData={soundData}
              ></SoundButton>
            );
          })
        : null}
    </View>
  );
};
