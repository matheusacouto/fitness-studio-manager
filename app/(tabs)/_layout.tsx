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
import AccountPage from './account'
import FinancialPage from './client_list'
import LessonList from './lesson_list'

export default function TabBar() {
  const [open, setOpen] = useState(false)

  // Valores animáveis para cada botão
  const scale = useSharedValue(0)
  const rotate = useSharedValue(0)
  const translateY = useSharedValue(0)
  const translateX1 = useSharedValue(0) // Esquerda
  const translateX2 = useSharedValue(0) // Direita

  // Função para animar os botões e girar o FAB principal
  const toggleMenu = () => {
    if (open) {
      scale.value = withTiming(0, { duration: 300 })
      translateY.value = withTiming(0, { duration: 300 })
      translateX1.value = withTiming(0, { duration: 300 })
      translateX2.value = withTiming(0, { duration: 300 })
      rotate.value = withTiming(0, { duration: 300 })
    } else {
      scale.value = withTiming(1, { duration: 300 })
      translateY.value = withTiming(-70, { duration: 300 })
      translateX1.value = withTiming(50, { duration: 300 }) // Move to right
      translateX2.value = withTiming(-50, { duration: 300 }) // Move to left
      rotate.value = withTiming(90, { duration: 300 }) // Rotate 90 degrees
    }
    setOpen(!open)
  }

  const animatedStyleLeft = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value + 20 },
      { translateX: translateX1.value },
    ],
    opacity: scale.value,
  }))

  const animatedStyleRight = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value + 20 },
      { translateX: translateX2.value },
    ],
    opacity: scale.value,
  }))

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
      style={styles.bottomBar}
      shadowStyle={styles.shadow}
      height={55}
      circleWidth={50}
      bgColor="white"
      initialRouteName="home"
      borderTopLeftRight
      renderCircle={({ selectedTab, navigate }) => (
        <View style={styles.btnCircleUp}>
          <Animated.View style={[styles.fabOption, animatedStyleLeft]}>
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

          <Animated.View style={[styles.fabOption, animatedStyleRight]}>
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
            <Animated.View style={animatedIconStyle}>
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
        component={FinancialPage}
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
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 30,
    height: 30,
  },
})
