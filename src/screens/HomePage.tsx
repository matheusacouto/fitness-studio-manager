import { StyleSheet, View } from 'react-native';
import ImageCard from '@/src/components/ImageCard';
import { Text } from '../components/ui/text';

export default function HomePage() {
  return (
    <View style={styles.container}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, margin: 20 },
  card: {
    flex: 1,
    // padding: 20,
    elevation: 2,
    backgroundColor: '#E9F6FA',
  },
});
