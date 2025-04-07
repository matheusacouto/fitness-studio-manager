import '~/css/global.css'

import {
  Theme,
  ThemeProvider,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { Platform } from 'react-native'
import { NAV_THEME } from '@/src/utils/constants'
import { useColorScheme } from '@/src/utils/useColorScheme'
import { SQLiteProvider } from 'expo-sqlite'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/src/components/Header'

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
}
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export default function RootLayout() {
  const hasMounted = React.useRef(false)
  const { colorScheme, isDarkColorScheme } = useColorScheme()
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false)

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return
    }

    if (Platform.OS === 'web') {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add('bg-background')
    }
    setIsColorSchemeLoaded(true)
    hasMounted.current = true
  }, [])

  if (!isColorSchemeLoaded) {
    return null
  }

  return (
    <ThemeProvider value={LIGHT_THEME}>
      <StatusBar style="dark" />
      <SQLiteProvider databaseName="database.db">
        <SafeAreaView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{ header: () => <Header /> }}
            />
            <Stack.Screen
              name="(create)/new_lesson"
              options={{
                title: 'Nova turma',
                presentation: 'formSheet',
                sheetAllowedDetents: 'fitToContents',
                sheetCornerRadius: 20,
              }}
            />
            <Stack.Screen
              name="(create)/new_client"
              options={{
                title: 'Novo aluno',
                headerTitleAlign: 'center',
                presentation: 'formSheet',
                sheetAllowedDetents: 'fitToContents',
                sheetCornerRadius: 20,
              }}
            />
          </Stack>
        </SafeAreaView>
      </SQLiteProvider>
    </ThemeProvider>
  )
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined'
    ? React.useEffect
    : React.useLayoutEffect
