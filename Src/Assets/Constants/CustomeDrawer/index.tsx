import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import images from '../images'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../Color'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CustomDrawer = (props) => {
  const navigation = useNavigation()
  const [user, setUser] = useState(null)
  const [profilePhoto, setProfilePhoto] = useState(null)

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user')
    await AsyncStorage.removeItem('profilePhoto')
    navigation.navigate('Login')
  }
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user')
        const storedPhoto = await AsyncStorage.getItem('profilePhoto')

        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
        if (storedPhoto) {
          setProfilePhoto(storedPhoto) 
        }
      } catch (error) {
        console.log('Error fetching user data from AsyncStorage', error)
      }
    }

    fetchUserData()
  }, [props])


  return (
    <View style={styles.header}>
      <DrawerContentScrollView>
        <View style={styles.profileContainer}>
          <Image
            source={profilePhoto ? { uri: profilePhoto } : images.Avatar} 
            style={styles.profileimg}
          />
          <View style={styles.usernameContainer}>
            <Text style={styles.profiletext}>
              {user ? user.username : 'Guest'}
            </Text>
          </View>
        </View>

        <View style={styles.list}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View style={styles.bottommain}>
        <TouchableOpacity style={styles.bottomfirst}>
          <View style={styles.bottomfirstcontain}>
            <Image
              source={images.Share}
              style={styles.shareimg}
              resizeMode="contain"
            />
            <Text style={styles.sharetxt}>Share with Friends</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomfirst} onPress={handleLogout}>
          <View style={styles.bottomfirstcontain}>
            <Image
              source={images.Logout}
              style={styles.shareimg}
              resizeMode="contain"
            />
            <Text style={styles.sharetxt}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileimg: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth:2,
    borderColor:colors.text
  },
  usernameContainer: {
    alignItems: 'center',
  },
  profiletext: {
    fontSize: 22,
    color: colors.black,
    fontWeight: 'bold',
    marginLeft: 7,
  },
  list: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 6,
  },
  bottommain: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  bottomfirst: {
    paddingVertical: 15,
  },
  bottomfirstcontain: {
    flexDirection: 'row',
  },
  shareimg: {
    height: 20,
    width: 20,
  },
  sharetxt: {
    fontSize: 15,
    color: colors.black,
    marginLeft: 5,
    fontWeight: '500',
  },
})

export default CustomDrawer
