import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';
import { Header } from './Header';
import { Body } from './Body';
import { useState } from 'react';
import { SoundData, SoundDataAndPlayback } from './types';
import { Audio } from 'expo-av';
import { PlaybackDialog } from './PlaybackDialog';

export default function App() {
  const [currentSound, setCurrentSound] = useState<
    SoundDataAndPlayback | undefined
  >(undefined);
  const [playbackStatus, setPlaybackStatus] = useState<
    'PLAYING' | 'PAUSED' | 'NONE'
  >('NONE');

  async function playSound(soundToPlay: SoundData) {
    if (playbackStatus === 'NONE') {
      const { sound } = await Audio.Sound.createAsync(soundToPlay.sound);
      setCurrentSound({ sound: soundToPlay, playback: sound });
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setCurrentSound({ sound: soundToPlay, playback: sound });

          if (status.isPlaying) {
            setPlaybackStatus('PLAYING');
          }

          if (status.didJustFinish) {
            setPlaybackStatus('NONE');
          }
        } else {
          setPlaybackStatus('NONE');
        }
      });
      await sound.playAsync();
    }
  }

  async function stopSound() {
    if (currentSound !== undefined) {
      await currentSound.playback.stopAsync();
      setPlaybackStatus('NONE');
    } else {
      console.log('Current sound is undefined');
    }
  }

  async function pauseSound() {
    if (currentSound !== undefined) {
      currentSound.playback.pauseAsync();
      setPlaybackStatus('PAUSED');
    } else {
      console.log('Current sound is undefined');
    }
  }

  async function resumeSound() {
    if (currentSound !== undefined) {
      currentSound.playback.playAsync();
      setPlaybackStatus('PLAYING');
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
      <PlaybackDialog
        playbackStatus={playbackStatus}
        soundData={currentSound?.sound}
        onStop={stopSound}
        onPause={pauseSound}
        onResume={resumeSound}
      />
    </View>
  );
}
