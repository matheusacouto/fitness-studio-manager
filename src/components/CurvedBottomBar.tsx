import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { router } from 'expo-router'

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'

import Home from '@/src/app/(tabs)'
import ClientList from '@/src/app/(tabs)/client-list'
import Calendar from '@/src/app/(tabs)/calendar'
import LessonList from '@/src/app/(tabs)/lesson-list'

import { useColorScheme } from '@/src/hooks/useColorScheme'
import { NAV_THEME } from '@/src/lib/constants'

export default function CurvedBottomBar() {
  const [open, setOpen] = useState(false)
  const scale = useSharedValue(0)
  const translateX1 = useSharedValue(0) // botão 1
  const translateX2 = useSharedValue(0) // botão 2
  const translateY1 = useSharedValue(0)
  const translateY2 = useSharedValue(0)
  const rotate = useSharedValue(0)
  const radius = 80

  const { colorScheme } = useColorScheme()

  const toggleMenu = () => {
    if (open) {
      scale.value = withTiming(0, { duration: 300 })
      translateX1.value = withTiming(0, { duration: 300 })
      translateY1.value = withTiming(0, { duration: 300 })
      translateX2.value = withTiming(0, { duration: 300 })
      translateY2.value = withTiming(0, { duration: 300 })
      rotate.value = withTiming(0, { duration: 300 })
    } else {
      const angle1 = (135 * Math.PI) / 180
      translateX1.value = withTiming(radius * Math.cos(angle1), {
        duration: 300,
      })
      translateY1.value = withTiming(-radius * Math.sin(angle1), {
        duration: 300,
      })

      const angle2 = (90 * Math.PI) / 180
      translateX2.value = withTiming(radius * Math.cos(angle2), {
        duration: 300,
      })
      translateY2.value = withTiming(-radius * Math.sin(angle2), {
        duration: 300,
      })

      scale.value = withTiming(1, { duration: 300 })
      rotate.value = withTiming(45, { duration: 300 })
    }

    setOpen(!open)
  }

  const animatedStyleLeft = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX1.value },
      { translateY: translateY1.value },
      { scale: scale.value },
    ],
    opacity: scale.value,
  }))

  const animatedStyleRight = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX2.value },
      { translateY: translateY2.value },
      { scale: scale.value },
    ],
    opacity: scale.value,
  }))

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }))

  const _renderIcon = (routeName, selectedTab) => {
    switch (routeName) {
      case 'index':
        return (
          <Ionicons
            name="home-outline"
            size={25}
            color={
              routeName === selectedTab ? NAV_THEME[colorScheme].text : 'gray'
            }
          />
        )
      case 'calendar':
        return (
          <Ionicons
            name="calendar-outline"
            size={25}
            color={
              routeName === selectedTab ? NAV_THEME[colorScheme].text : 'gray'
            }
          />
        )
      case 'lesson-list':
        return (
          <MaterialCommunityIcons
            name="account-group-outline"
            size={25}
            color={
              routeName === selectedTab ? NAV_THEME[colorScheme].text : 'gray'
            }
          />
        )
      default:
        return (
          <MaterialCommunityIcons
            name="weight-lifter"
            size={25}
            color={
              routeName === selectedTab ? NAV_THEME[colorScheme].text : 'gray'
            }
          />
        )
    }
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
      type="DOWN"
      circlePosition="RIGHT"
      initialRouteName="index"
      tabBar={renderTabBar}
      circleWidth={50}
      borderColor={NAV_THEME[colorScheme].border}
      screenOptions={{ headerShown: false }}
      height={55}
      bgColor={NAV_THEME[colorScheme].secondary}
      // borderTopLeftRight
      renderCircle={({ selectedTab, navigate }) => (
        <Animated.View style={[styles.btnCircleUp]}>
          <Animated.View style={[styles.fabOption, animatedStyleLeft]}>
            <TouchableOpacity
              style={[
                styles.fabSmall,
                {
                  backgroundColor: NAV_THEME[colorScheme].background,
                  borderWidth: colorScheme === 'dark' ? 1 : 0,
                  borderColor:
                    colorScheme === 'dark'
                      ? NAV_THEME[colorScheme].border
                      : 'transparent',
                },
              ]}
              onPress={() => {
                toggleMenu()
                router.navigate('/schedule/create-lesson')
              }}
            >
              <MaterialCommunityIcons
                name="account-group-outline"
                size={24}
                color={NAV_THEME[colorScheme].text}
              />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={[styles.fabOption, animatedStyleRight]}>
            <TouchableOpacity
              style={[
                styles.fabSmall,
                {
                  backgroundColor: NAV_THEME[colorScheme].background,
                  borderWidth: colorScheme === 'dark' ? 1 : 0,
                  borderColor:
                    colorScheme === 'dark'
                      ? NAV_THEME[colorScheme].border
                      : 'transparent',
                },
              ]}
              onPress={() => {
                toggleMenu()
                router.navigate('/schedule/create-client')
              }}
            >
              <MaterialCommunityIcons
                name="weight-lifter"
                size={24}
                color={NAV_THEME[colorScheme].text}
              />
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity
            style={[
              styles.fabMain,
              {
                backgroundColor: NAV_THEME[colorScheme].background,
                borderColor: NAV_THEME[colorScheme].border,
              },
            ]}
            onPress={toggleMenu}
          >
            <Animated.View style={animatedIconStyle}>
              <Ionicons
                name="add"
                size={30}
                color={NAV_THEME[colorScheme].text}
              />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      )}
    >
      <CurvedBottomBarExpo.Screen
        name="index"
        position="LEFT"
        component={Home}
      />
      <CurvedBottomBarExpo.Screen
        name="calendar"
        position="RIGHT"
        component={Calendar}
      />
      <CurvedBottomBarExpo.Screen
        name="client-list"
        position="LEFT"
        component={ClientList}
      />
      <CurvedBottomBarExpo.Screen
        name="lesson-list"
        position="LEFT"
        component={LessonList}
      />
    </CurvedBottomBarExpo.Navigator>
  )
}

export const styles = StyleSheet.create({
  fabMain: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  fabOption: {
    position: 'absolute',
  },
  fabSmall: {
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
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
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 30,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
})
