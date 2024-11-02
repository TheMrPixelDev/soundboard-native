import { Text, View } from 'react-native';
import { Appbar, IconButton, useTheme } from 'react-native-paper';
import { BodyProps } from './Body';

export type HeaderProps = {
  onThemeChange: (darkMode: boolean) => void;
};

export const Header = ({ onThemeChange }: HeaderProps) => {
  const theme = useTheme();

  return (
    <Appbar.Header mode="center-aligned">
      <Appbar.Content title="PXL's Soundboard" />
      <IconButton
        icon={theme.dark ? 'white-balance-sunny' : 'moon-waning-crescent'}
        onPress={() => onThemeChange(!theme.dark)}
      />
    </Appbar.Header>
  );
};
