import React, {useState} from 'react'
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  Pressable,
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {colors} from '../../Assets/Constants/Color'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleRegister = async () => {
    if (email === '') {
      Alert.alert('Error', 'email are required!')
      return
    } else if (password === '') {
      Alert.alert('Error', 'password are required!')
      return
    } else if (username === '') {
      Alert.alert('Error', 'username are required!')
      return
    } else {
      
      if (!validateEmail(email)) {
        Alert.alert('Error', 'Please enter a valid email address.')
        return
      }
  
      try {
        const storedUsers = await AsyncStorage.getItem('users')
        const users = storedUsers ? JSON.parse(storedUsers) : []
  
        const existingUser = users.find(user => user.email === email)
        if (existingUser) {
          Alert.alert('Error', 'Email is already registered.')
          return
        }
  
        const newUser = {username, email, password}
        users.push(newUser)
        await AsyncStorage.setItem('users', JSON.stringify(users))
  
        Alert.alert('Success', 'Registration successful!')
        navigation.navigate('Login')
      } catch (error) {
        console.error('Error during registration', error)
      }
    }

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor={colors.black}
      />
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

      <Pressable onPress={handleRegister} style={styles.btn}>
        <Text style={styles.btntxt}>Register</Text>
      </Pressable>

      <Text
        style={styles.switchText}
        onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
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

export default Register
