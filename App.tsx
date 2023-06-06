import { StatusBar } from 'expo-status-bar';
import { Modal, ScrollView, Text, View } from 'react-native';
import { Header } from './Header';
import { Body } from './Body';
import { useState } from 'react';
import { SoundData, SoundDataAndPlayback } from './types';
import { Button, Dialog } from '@rneui/base';
import { Audio } from 'expo-av';

export default function App() {
  //const soundAndPlayback = useRef<SoundDataAndPlayback | undefined>(undefined);
  const [currentSound, setCurrentSound] = useState<
    SoundDataAndPlayback | undefined
  >(undefined);
  const [playbackStatus, setPlaybackStatus] = useState<
    'PLAYING' | 'PAUSED' | 'NONE'
  >('NONE');

  async function playSound(soundToPlay: SoundData) {
    if (currentSound === undefined) {
      const { sound } = await Audio.Sound.createAsync(soundToPlay.sound);
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setCurrentSound({ sound: soundToPlay, playback: sound });
          //soundAndPlayback.current = { sound: soundToPlay, playback: sound };

          if (status.isPlaying) {
            setPlaybackStatus('PLAYING');
          }

          if (status.didJustFinish) {
            setPlaybackStatus('NONE');
            setCurrentSound(undefined);
            //soundAndPlayback.current = undefined;
          }
        } else {
          setCurrentSound(undefined);
          setPlaybackStatus('NONE');
          //soundAndPlayback.current = undefined;
        }
      });
      await sound.playAsync();
    }
  }

  async function stopSound() {
    if (currentSound !== undefined) {
      //soundAndPlayback.current.playback
      //.stopAsync()
      //.then(() => setPlaybackStatus('NONE'));
      await currentSound.playback.stopAsync();
      setCurrentSound(undefined);
      setPlaybackStatus('NONE');
    } else {
      console.log('Current sound is undefined');
    }
  }

  return (
    <View style={{ width: '100%' }}>
      <StatusBar style="light" />
      <Header />
      <ScrollView>
        <Body onSoundClicked={(sound) => playSound(sound)} />
      </ScrollView>
      <Dialog
        isVisible={playbackStatus === 'PAUSED' || playbackStatus === 'PLAYING'}
        ModalComponent={Modal}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text style={{ color: 'white', fontWeight: '600' }}>
          {currentSound !== undefined ? currentSound.sound.text : null}
        </Text>
        <Button onPress={() => stopSound()}>stop</Button>
      </Dialog>
    </View>
  );
}
