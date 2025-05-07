import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

import { useSQLiteContext } from 'expo-sqlite';

export default function NewClient() {
  const db = useSQLiteContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [plan, setPlan] = useState('');

  const handleSubmit = async () => {
    try {
      const submit = await db.runAsync(
        `INSERT INTO client (name, email, phone, plan) VALUES (?, ?, ?, ?)`,
        [name, email, phone, plan],
      );
      console.log(
        'Inserted ID:',
        submit.lastInsertRowId,
        'Changes:',
        submit.changes,
      );
    } catch (error) {
      console.error('Failed to insert client:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Aluno</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Plano"
        value={plan}
        onChangeText={setPlan}
      />
      <Button title="Create Student" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
});
