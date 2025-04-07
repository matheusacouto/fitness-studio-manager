import React from 'react'
import { View, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import ProfileIcon from '@/src/components/ProfileIcon'
import { SafeAreaView } from 'react-native-safe-area-context'

const Header = () => (
  <View style={styles.header}>
    <Ionicons
      name="notifications-outline"
      size={24}
      color="black"
      style={styles.icon}
    />
    <ProfileIcon />
  </View>
)

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    paddingHorizontal: 8,
  },
})

export default Header
