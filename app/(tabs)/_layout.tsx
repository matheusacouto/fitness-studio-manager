import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { router } from 'expo-router'

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'

import HomePage from '.'
import ClientList from './client_list'
import LessonList from './lesson_list'

export default function TabBar() {
  const [open, setOpen] = useState(false)
  const rotate = useSharedValue(0)
  const progress1 = useSharedValue(0) // Para weight-lifter (90°)
  const progress2 = useSharedValue(0) // Para account-group-outline (135°)

  const toggleMenu = () => {
    if (open) {
      progress1.value = withTiming(0, { duration: 300 })
      progress2.value = withTiming(0, { duration: 300 })
      rotate.value = withTiming(0, { duration: 300 })
    } else {
      progress1.value = withTiming(1, { duration: 500 })
      progress2.value = withTiming(1, { duration: 600 }) // levemente defasado
      rotate.value = withTiming(45, { duration: 300 })
    }
    setOpen(!open)
  }

  const radius = 80

  const useOrbitStyle = (angleInDegrees, progress) => {
    const angleRad = (angleInDegrees * Math.PI) / 180

    return useAnimatedStyle(() => {
      const currentAngle = angleRad * progress.value
      const x = radius * Math.cos(currentAngle)
      const y = radius * Math.sin(currentAngle)

      return {
        transform: [
          { translateX: x },
          { translateY: -y },
          { scale: progress.value },
        ],
        opacity: progress.value,
      }
    })
  }

  const animatedStyleLeft = useOrbitStyle(135, progress2)
  const animatedStyleRight = useOrbitStyle(90, progress1)

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }))

  const _renderIcon = (routeName, selectedTab) => {
    return routeName === 'home' || routeName === 'lesson_list' ? (
      <Ionicons
        name={routeName === 'home' ? 'home-outline' : 'calendar-outline'}
        size={25}
        color={routeName === selectedTab ? 'black' : 'gray'}
      />
    ) : (
      <MaterialCommunityIcons
        name="weight-lifter"
        size={25}
        color={routeName === selectedTab ? 'black' : 'gray'}
      />
    )
  }

  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    )
  }

  return (
    <CurvedBottomBarExpo.Navigator
      screenOptions={{ headerShown: false }}
      type="DOWN"
      circlePosition="RIGHT"
      shadowStyle={styles.shadow}
      height={55}
      circleWidth={50}
      bgColor="white"
      initialRouteName="home"
      borderTopLeftRight
      renderCircle={({ selectedTab, navigate }) => (
        <View style={styles.btnCircleUp}>
          <Animated.View
            style={[styles.fabOption, animatedStyleLeft]}
            pointerEvents={open ? 'auto' : 'none'}
          >
            <TouchableOpacity
              style={styles.fabSmall}
              onPress={() => router.push('/(create)/new_lesson')}
              onPressOut={toggleMenu}
            >
              <MaterialCommunityIcons
                name="account-group-outline"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={[styles.fabOption, animatedStyleRight]}
            pointerEvents={open ? 'auto' : 'none'}
          >
            <TouchableOpacity
              style={styles.fabSmall}
              onPress={() => router.push('/(create)/new_client')}
              onPressOut={toggleMenu}
            >
              <MaterialCommunityIcons
                name="weight-lifter"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity style={styles.fabMain} onPress={toggleMenu}>
            <Animated.View
              style={animatedIconStyle}
              key={open ? 'open-left' : 'closed-left'}
            >
              <Ionicons name="add" size={30} color="black" />
            </Animated.View>
          </TouchableOpacity>
        </View>
      )}
      tabBar={renderTabBar}
    >
      <CurvedBottomBarExpo.Screen
        name="home"
        position="LEFT"
        component={HomePage}
      />
      <CurvedBottomBarExpo.Screen
        name="lesson_list"
        position="RIGHT"
        component={LessonList}
      />
      <CurvedBottomBarExpo.Screen
        name="financial"
        position="LEFT"
        component={ClientList}
      />
      {/* <CurvedBottomBarExpo.Screen
        name="account"
        position="RIGHT"
        component={AccountPage}
      /> */}
    </CurvedBottomBarExpo.Navigator>
  )
}

export const styles = StyleSheet.create({
  fabMain: {
    backgroundColor: '#fff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    // elevation: 5,
  },
  fabOption: {
    position: 'absolute',
    // zIndex: 10, // Adiciona isso para garantir que fique acima
  },
  fabSmall: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  shadow: {
    shadowColor: '#DDDDDD',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    bottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
})
