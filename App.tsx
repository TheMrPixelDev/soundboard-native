import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { Soundboard } from './Soundboard';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={darkMode ? MD3DarkTheme : MD3LightTheme}>
        <Soundboard onChangeTheme={(darkMode) => setDarkMode(darkMode)} />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
