import {createStackNavigator} from '@react-navigation/stack'

import {Image, StyleSheet, View} from 'react-native'

import {createDrawerNavigator} from '@react-navigation/drawer'
import images from '../../Assets/Constants/images'

import Home from '../HomeScreen'
import {colors} from '../../Assets/Constants/Color'
import CustomeDrawer from '../../Assets/Constants/CustomeDrawer'
import SongDetail from '../SongDetail'
import Recomandent from '../HomeScreen/Recomandent'
import Like from '../LikeScreen'
import Profile from '../ProfileScreen'
import Login from '../Login'
import Register from '../Register'
import {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

export const AuthStack = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUserLogin = async () => {
      const user = await AsyncStorage.getItem('user')
      if (user) {
        setIsLoggedIn(true)
      }
      setLoading(false)
    }
    checkUserLogin()
  }, [])

  if (loading) {
    return null
  }
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Drawer"
            component={DrawerScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Drawer"
            component={DrawerScreen}
            options={{headerShown: false}}
          />
        </>
      )}
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SongDetail"
        component={SongDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Like"
        component={Like}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}

const DrawerScreen = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomeDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: colors.secondarycolor,
        drawerActiveTintColor: colors.white,
        drawerInactiveTintColor: colors.primarycolor,
        drawerLabelStyle: {marginLeft: -20, fontSize: 15},
        // overlayColor:colors.secondarycolor
      }}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={images.BottomHome}
              tintColor={color}
              style={styles.img}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Like"
        component={Like}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={images.LikeIcon}
              tintColor={color}
              style={styles.img}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={images.Profile}
              tintColor={color}
              style={styles.img}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  iconImg: {
    width: 20,
    height: 20,
  },
  tebText: {
    fontSize: 12,
    width: '100%',
    textAlign: 'center',
  },
  img: {
    height: 23,
    width: 25,
  },
})
