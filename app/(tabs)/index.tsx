import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import LessonCard from '@/src/components/Card'
import ImageCard from '@/src/components/ImageCard'

export default function HomePage() {
  return (
    <View style={{ flex: 1, margin: 20 }}>
      <View
        style={{
          flex: 0.1,
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontFamily: 'georgia', fontSize: 18 }}>
          Olá, <Text style={{ fontWeight: 'bold' }}>Usuário</Text>
        </Text>
      </View>
      <View
        style={{
          flex: 0.3,
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontFamily: 'georgia',
            fontSize: 18,
            fontWeight: 'bold',
            color: '#606264',
            marginBottom: 10,
            marginLeft: 10,
          }}
        >
          Aula em andamento
        </Text>
        <ImageCard
          cardStyle={styles.card}
          footer="Ver Alunos"
          data={{
            id: 1,
            title: 'Turma 1',
            description: 'Esta aula possui 10 alunos vinculados',
          }}
        />
        {/* <LessonCard
          cardStyle={styles.card}
          contentTextStyle={{ fontSize: 15 }}
          contentStyle={{
            flexDirection: 'row',
            maxWidth: '80%',
          }}
          footer="Ver alunos"
          data={{
            id: 1,
            title: 'Turma 1',
            description: 'Esta aula possui 10 alunos vinculados',
          }}
        /> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 20,
    elevation: 2,
    backgroundColor: '#E9F6FA',
  },
})
