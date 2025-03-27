import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import LessonCard from '@/src/components/LessonCard'

export default function HomePage() {
  return (
    <SafeAreaView style={{ flex: 1, margin: 15 }}>
      <View
        style={{
          flex: 0.1,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 2,
        }}
      >
        <Text style={{ fontSize: 18 }}>
          Olá, <Text style={{ fontWeight: 'bold' }}>Usuário</Text>
        </Text>
      </View>
      <View
        style={{
          flex: 0.3,
          justifyContent: 'center',
          borderWidth: 2,
        }}
      >
        <LessonCard
          style={styles.card}
          data={{
            id: 1,
            title: 'Aula 1',
            description: 'Descrição da aula 1',
            teacher: 'Prof 1',
          }}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  card: {
    elevation: 1,
  },
})
