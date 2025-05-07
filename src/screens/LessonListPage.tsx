import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

interface LessonListProps {
  data: { id: number; name: string; description: string }[];
}

export default function LessonListPage({ data }: LessonListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Turmas</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    marginBottom: 16,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemDescription: {
    fontSize: 16,
  },
});
