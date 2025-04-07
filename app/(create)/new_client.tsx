import React from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'

import { useSQLiteContext } from 'expo-sqlite'

export default function NewStudent() {
  const db = useSQLiteContext()

  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [plan, setPlan] = React.useState('')

  const handleSubmit = async () => {
    try {
      const submit = await db.runAsync(
        `INSERT INTO client (name, email, phone, plan) VALUES (?, ?, ?, ?)`,
        [name, email, phone, plan],
      )
      console.log(
        'Inserted ID:',
        submit.lastInsertRowId,
        'Changes:',
        submit.changes,
      )
    } catch (error) {
      console.error('Failed to insert client:', error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Student</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Plan"
        value={plan}
        onChangeText={(text) => setPlan(text)}
      />
      <Button title="Create Student" onPress={handleSubmit} />
    </View>
  )
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
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
})
