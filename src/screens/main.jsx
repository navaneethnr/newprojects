import React from 'react';
import { useColorScheme } from 'react-native-appearance';
import { DarkTheme, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { RootNavigator } from '../components/rootNavigator';
import { PreferencesContext } from '../context/preferencesContext';

export const Main = () => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = React.useState(
    colorScheme === 'dark' ? 'dark' : 'light'
  );

  function toggleTheme() {
    setTheme(theme => (theme === 'light' ? 'dark' : 'light'));
  }

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      theme,
    }),
    [theme]
  );

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider
        theme={
          theme === 'light'
            ? {
                ...DefaultTheme,
                colors: { ...DefaultTheme.colors, primary: '#1ba1f2', secondary: 'blue' },
              }
            : {
                ...DarkTheme,
                colors: { ...DarkTheme.colors, primary: '#1ba1f2', secondary: 'blue' },
              }
        }
      >
        <RootNavigator />
      </PaperProvider>
    </PreferencesContext.Provider>
  );
};
