import { Dialog, Button } from '@rneui/base';
import { PlaybackStatus, SoundData } from './types';
import { Modal, Text, StyleSheet } from 'react-native';

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
    <Dialog
      isVisible={playbackStatus === 'PAUSED' || playbackStatus === 'PLAYING'}
      ModalComponent={Modal}
    >
      <Text style={{ color: 'white', fontWeight: '600', margin: 10 }}>
        {soundData !== undefined
          ? soundData.text
          : 'Es wird kein Sound abgespielt'}
      </Text>
      <Button
        color={playbackStatus === 'PLAYING' ? 'primary' : 'success'}
        containerStyle={styles.iconButton}
        onPress={
          playbackStatus === 'PAUSED'
            ? onResume
            : playbackStatus === 'PLAYING'
            ? onPause
            : undefined
        }
      >
        <Text>{playbackStatus === 'PLAYING' ? 'PAUSE' : 'FORTFAHREN'}</Text>
      </Button>
      <Button color="error" containerStyle={styles.iconButton} onPress={onStop}>
        <Text>STOP</Text>
      </Button>
    </Dialog>
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
