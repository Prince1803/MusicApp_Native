import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, Pressable, Alert, TextInput, Button } from 'react-native'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { colors } from '../../Assets/Constants/Color'
import Header from '../../Assets/Constants/Header'
import images from '../../Assets/Constants/images'
import { useIsFocused, useNavigation } from '@react-navigation/native'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [profilePhoto, setProfilePhoto] = useState(null)
  const [isEditing, setIsEditing] = useState(false) 
  const [newName, setNewName] = useState('') 
  const navigation = useNavigation() 
  const isFocus=useIsFocused()

  useEffect(() => {
    const getUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user')
        const storedPhoto = await AsyncStorage.getItem('profilePhoto')

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser)
          setUser(parsedUser)
          setNewName(parsedUser.username) 
        }
        if (storedPhoto) {
          setProfilePhoto(storedPhoto)
        }
      } catch (error) {
        console.error('Error fetching data from AsyncStorage', error)
      }
    }
    getUserData()
  }, [isFocus])

  const selectProfilePhoto = async () => {
    Alert.alert(
      'Select Profile Photo',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: () => openCamera(),
        },
        {
          text: 'Gallery',
          onPress: () => openGallery(),
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    )
  }

  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo' }, async (response) => {
      if (!response.didCancel && !response.error && response.assets) {
        const uri = response.assets[0].uri
        setProfilePhoto(uri)
        await AsyncStorage.setItem('profilePhoto', uri)
      } else {
        Alert.alert('Error', 'Failed to select photo')
      }
    })
  }

  const openCamera = () => {
    launchCamera({ mediaType: 'photo' }, async (response) => {
      if (!response.didCancel && !response.error && response.assets) {
        const uri = response.assets[0].uri
        setProfilePhoto(uri)
        await AsyncStorage.setItem('profilePhoto', uri)
      } else {
        Alert.alert('Error', 'Failed to capture photo')
      }
    })
  }

  const updateName = async () => {
    if (!newName.trim()) {
      Alert.alert('Error', 'Name cannot be empty.')
      return
    }
    
    try {
      const updatedUser = { ...user, username: newName } 
      setUser(updatedUser) 
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser)) 
      Alert.alert('Success', 'Name updated successfully!')
      setIsEditing(false) 
    } catch (error) {
      console.error('Error updating name', error)
    }
  }

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user')
    await AsyncStorage.removeItem('profilePhoto')
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <Header drawerImage={images.drawer} title="Profile" />
      <ScrollView contentContainerStyle={styles.content}>
        {user ? (
          <View style={styles.detailContainer}>
            <Pressable onPress={selectProfilePhoto}>
              <Image
                source={profilePhoto ? { uri: profilePhoto } : images.Avatar}
                style={styles.profileImage}
              />
            </Pressable>

            {isEditing ? (
              <>
                <TextInput
                  style={styles.input}
                  value={newName}
                  onChangeText={setNewName}
                  placeholder="Enter new name"
                  placeholderTextColor={colors.black}
                />
                <View style={styles.editbtn}>
                  <Button title="Save" onPress={updateName} color={colors.text} />
                  <Button title="Cancel" onPress={() => setIsEditing(false)} color={colors.text} />
                </View>
              </>
            ) : (
              <View style={styles.detailedit}>
                <Text style={styles.detail}>Name: {user.username}</Text>
                <Pressable onPress={() => setIsEditing(true)}>
                  <Image
                    source={images.Edit} 
                    style={styles.editImage}
                  />
                </Pressable>
              </View>
            )}

            <Text style={styles.detail}>Email: {user.email}</Text>
            
            <Button title="Logout" onPress={handleLogout} color={colors.text} style={styles.logoutButton} />
          </View>
        ) : (
          <Text style={styles.nodata}>No user data available</Text>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primarycolor,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContainer: {
    alignItems: 'center',
    marginTop: '20%',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.text,
  },
  input: {
    color: colors.black,
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 10,
    width: '80%',
    backgroundColor: 'white',
  },
  editbtn: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 5
  },
  detail: {
    color: colors.white,
    fontSize: 20,
    marginBottom: 7,
  },
  editImage: {
    height: 17,
    width: 17,
    marginLeft: 7
  },
  detailedit: {
    flexDirection: "row",
    alignItems: "center",
  },
  nodata: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: '75%',
    color: colors.text,
  },
  logoutButton: {
    marginTop: 0,
    color: colors.text,
    
  }
})

export default Profile
