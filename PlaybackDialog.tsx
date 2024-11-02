import { PlaybackStatus, SoundData } from './types';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Dialog, Portal, IconButton } from 'react-native-paper';

export type PlaybackDialogProps = {
  playbackStatus: PlaybackStatus;
  soundData?: SoundData;
  onStop?: () => void;
  onPause?: () => void;
  onResume?: () => void;
};

export const PlaybackDialog = (props: PlaybackDialogProps) => {
  const { soundData, playbackStatus, onStop, onResume, onPause } = props;

  return (
    <SafeAreaView>
      <Portal>
        <Dialog
          visible={playbackStatus === 'PLAYING' || playbackStatus === 'PAUSED'}
        >
          <Dialog.Title>
            {soundData !== undefined
              ? soundData.text
              : 'Es wird kein Sound abgespielt'}
          </Dialog.Title>
          <Dialog.Actions>
            <IconButton
              icon={playbackStatus === 'PLAYING' ? 'pause' : 'play'}
              mode="contained"
              onPress={
                playbackStatus === 'PAUSED'
                  ? onResume
                  : playbackStatus === 'PLAYING'
                  ? onPause
                  : undefined
              }
            />
            <IconButton
              mode="contained"
              containerColor="#d8545b"
              icon="stop"
              onPress={onStop}
            />
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    margin: 10,
  },
  innerIcon: {
    padding: 10,
  },
});
