import { Stack } from 'expo-router/stack'
import { DatabaseProvider } from '@/db/DatabaseProvider'

export default function RootLayout() {
  return (
    <DatabaseProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </DatabaseProvider>
  )
}
