import 'react-native-gesture-handler'
import React, {createContext, useState} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import SplashScreen from './Src/Components/SplashScreen'
import {StatusBar} from 'react-native'
import {colors} from './Src/Assets/Constants/Color'
import {AuthStack} from './Src/Components/Navigation/Index'
import {LikedSongsProvider} from './Src/Components/LikeScreenContext'

export const AuthenticatedUserContext = createContext({})

const AuthenticatedProvider = ({children}: any) => {
  const [user, setUser] = useState(null)
  return (
    <AuthenticatedUserContext.Provider value={{user, setUser}}>
      {children}
    </AuthenticatedUserContext.Provider>
  )
}

const App = () => {
  const [splash, setSplash] = useState(true)
  setTimeout(() => {
    setSplash(false)
  }, 1500)
  return (
    <>
    <LikedSongsProvider>
      <NavigationContainer>
        <AuthenticatedProvider>
          <StatusBar
            barStyle="light-content"
            backgroundColor={colors.primarycolor}
          />
          {/* <SplashScreen /> */}
          {splash ? <SplashScreen /> : <AuthStack />}
        </AuthenticatedProvider>
      </NavigationContainer>
    </LikedSongsProvider>
    </>
  )
}

export default App
