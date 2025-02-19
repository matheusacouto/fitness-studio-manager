import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { Lesson } from '@/db/lesson.entity'

interface LessonListProps {
  lessons: Lesson[];
}

export default function LessonList({ lessons }: LessonListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Turmas e Alunos</Text>
      <FlatList
        data={lessons}
        renderItem={({ item }) => (
          <View style={styles.lessonContainer}>
            <Text style={styles.lessonName}>{item.name}</Text>
            <Text style={styles.lessonInfo}>
              {item.max_clients} alunos - {item.day_of_week} - {item.start_time}{' '}
              - {item.teacher.name}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  lessonContainer: {
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  lessonName: {
    fontSize: 18,
    marginBottom: 8,
  },
  lessonInfo: {
    fontSize: 14,
  },
})
