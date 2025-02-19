import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

export default function AccountPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Page</Text>
      <Text style={styles.info}>Name: John Doe</Text>
      <Text style={styles.info}>Email: john.doe@example.com</Text>
      <Button title="Edit Profile" onPress={() => {}} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
})
