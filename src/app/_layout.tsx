import '@/global.css';

import {
  Theme,
  ThemeProvider,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform } from 'react-native';
import { NAV_THEME } from '@/src/lib/constants';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import { SQLiteProvider } from 'expo-sqlite';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '@/src/components/Header';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === 'web') {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add('bg-background');
    }
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <SQLiteProvider databaseName="database.db">
          <StatusBar
            backgroundColor={NAV_THEME[colorScheme].secondary}
            style={isDarkColorScheme ? 'light' : 'dark'}
          />

          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{ header: () => <Header /> }}
            />
            <Stack.Screen
              name="schedule/create-lesson"
              options={{
                headerTitleAlign: 'center',
                title: 'Nova turma',
                presentation: 'formSheet',
                sheetAllowedDetents: 'fitToContents',
                sheetCornerRadius: 20,
              }}
            />
            <Stack.Screen
              name="schedule/create-client"
              options={{
                headerTitleAlign: 'center',
                presentation: 'formSheet',
                sheetAllowedDetents: 'fitToContents',
                sheetCornerRadius: 20,
              }}
            />
            <Stack.Screen
              name="lessons/[id]"
              options={{
                headerTitleAlign: 'center',
                presentation: 'card',
                sheetAllowedDetents: 'fitToContents',
                sheetCornerRadius: 20,
              }}
            />
          </Stack>
        </SQLiteProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined'
    ? React.useEffect
    : React.useLayoutEffect;
