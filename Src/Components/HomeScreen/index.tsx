import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native'
import React from 'react'
import Header from '../../Assets/Constants/Header'
import images from '../../Assets/Constants/images'
import Recomandent from './Recomandent'
import PlayList from './Playlist'

import { colors } from '../../Assets/Constants/Color'
import MusicPlayer from './MusicPlayer'
import { songall } from '../../Assets/Constants/data'
import { useNavigation } from '@react-navigation/native'

const { height } = Dimensions.get('window')

const Home = ({route}) => {
  const { currentSongIndex } = route.params || {}
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Header drawerImage={images.drawer} rightImage={images.LikeIcon} onRightImagePress={()=>navigation.navigate('Like')}/>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.maincontainer}>
          <PlayList />
          <Recomandent />
        </View>
      </ScrollView>
      <View style={styles.musicPlayerContainer}>
        <MusicPlayer songsList={songall} currentSongdetail={currentSongIndex}/>
      </View>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primarycolor,
  },
  scrollContent: {
    paddingBottom: 80, 
  },
  maincontainer: {
    backgroundColor: colors.primarycolor,
  },
  musicPlayerContainer: {
    position: 'absolute',
    bottom: "1.3%",
    width: '99%',
    height: 80, 
    backgroundColor: colors.primarycolor, 
    alignItems:"center"
  },
})

export default Home
