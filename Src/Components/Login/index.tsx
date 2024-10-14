import React, {useState, useEffect} from 'react'
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {colors} from '../../Assets/Constants/Color'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem('users')
        if (storedUsers) {
          setUsers(JSON.parse(storedUsers))
        }
      } catch (error) {
        console.error('Error fetching users', error)
      }
    }

    fetchUsers()
  }, [])

  useEffect(() => {
    setEmail('')
    setPassword('')
  }, [])

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const loggedInUser = await AsyncStorage.getItem('user')
        if (loggedInUser) {
          navigation.navigate('Drawer')
        }
      } catch (error) {
        console.error('Error checking logged-in user', error)
      }
    }

    checkLoggedInUser()
  }, [])

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Email and Password are required!')
      return
    }

    setLoading(true)
    try {
      const storedUsers = await AsyncStorage.getItem('users')
      const users = storedUsers ? JSON.parse(storedUsers) : []

      const user = users.find(
        user => user.email === email && user.password === password,
      )

      if (user) {
        await AsyncStorage.setItem(
          'user',
          JSON.stringify({username: user.username, email: user.email}),
        )
        navigation.navigate('Drawer')
      }
      else{
        Alert.alert('Error', 'Invalid User')
      }
    } catch (error) {
      console.error('Error during login', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={colors.black}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={colors.black}
        secureTextEntry
      />

      <Pressable onPress={handleLogin} style={styles.btn}>
        {loading ? (
          <ActivityIndicator size="small" color={colors.black} />
        ) : (
          <Text style={styles.btntxt}>Login</Text>
        )}
      </Pressable>

      <Text
        style={styles.switchText}
        onPress={() => navigation.navigate('Register')}>
        Don't have an account? Register
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.secondarycolor,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: colors.white,
  },
  input: {
    color: colors.black,
    borderWidth: 1,
    marginBottom: 20,
    padding: 8,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  btn: {
    backgroundColor: colors.text,
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 12,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btntxt: {
    color: colors.black,
  },
  switchText: {
    color: colors.white,
    marginTop: 12,
    textAlign: 'center',
  },
})

export default Login
