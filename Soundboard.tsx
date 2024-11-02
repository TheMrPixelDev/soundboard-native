import { View, ScrollView } from 'react-native';
import { Header } from './Header';
import { StatusBar } from 'expo-status-bar';
import { Body } from './Body';
import { PlaybackDialog } from './PlaybackDialog';
import { PlaybackStatus, SoundData, SoundDataAndPlayback } from './types';
import { useState } from 'react';
import { Audio } from 'expo-av';
import { useTheme } from 'react-native-paper';

export type SounddboardProps = {
  onChangeTheme: (darkMode: boolean) => void;
};

export const Soundboard = ({ onChangeTheme }: SounddboardProps) => {
  const [currentSound, setCurrentSound] = useState<
    SoundDataAndPlayback | undefined
  >(undefined);
  const [playbackStatus, setPlaybackStatus] = useState<PlaybackStatus>('NONE');

  const theme = useTheme();

  async function playSound(soundToPlay: SoundData, stopCallback: () => void) {
    if (playbackStatus === 'NONE') {
      const { sound } = await Audio.Sound.createAsync(soundToPlay.sound);
      setCurrentSound({
        sound: soundToPlay,
        playback: sound,
        onStop: stopCallback,
      });
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setCurrentSound({
            sound: soundToPlay,
            playback: sound,
            onStop: stopCallback,
          });

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
    <View style={{ backgroundColor: theme.colors.background }}>
      <StatusBar style={theme.dark ? 'light' : 'dark'}></StatusBar>
      <Header onThemeChange={onChangeTheme} />
      <ScrollView>
        <Body
          onSoundClicked={(sound, stopCallback) =>
            playSound(sound, stopCallback)
          }
        />
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
};
