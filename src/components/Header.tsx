import React from 'react';
import { View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProfileIcon from '@/src/components/ProfileIcon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import { NAV_THEME } from '@/src/lib/constants';

const Header = () => {
  const { colorScheme } = useColorScheme(); // colorScheme is an object

  return (
    <SafeAreaView>
      <View
        style={[
          styles.header,
          {
            backgroundColor: NAV_THEME[colorScheme].secondary,
          },
        ]}
      >
        <Ionicons
          name="notifications-outline"
          size={24}
          color={useColorScheme().colorScheme === 'dark' ? 'white' : 'black'}
          style={styles.icon}
        />
        <ProfileIcon />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    paddingHorizontal: 8,
  },
});

export default Header;
