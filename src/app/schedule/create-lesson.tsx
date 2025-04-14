import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'

// eslint-disable-next-line import/no-unresolved

export default function NewLesson() {
  const [name, setName] = useState('')
  const [dayOfWeek, setDayOfWeek] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [teacherId, setTeacherId] = useState('')
  const [maxClients, setMaxClients] = useState('')

  const handleSubmit = () => {
    console.log({
      name,
      dayOfWeek,
      startTime,
      endTime,
      teacherId,
      maxClients,
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Turma</Text>
      <TextInput
        keyboardType="default"
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Dia da semana"
        value={dayOfWeek}
        onChangeText={(text) => setDayOfWeek(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Horário de início"
        value={startTime}
        onChangeText={(text) => setStartTime(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Horário de término"
        value={endTime}
        onChangeText={(text) => setEndTime(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="ID do professor"
        value={teacherId}
        onChangeText={(text) => setTeacherId(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de alunos"
        value={maxClients.toString()}
        onChangeText={(text) => setMaxClients(parseInt(text))}
      />
      <Button title="Criar" onPress={handleSubmit} />
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
