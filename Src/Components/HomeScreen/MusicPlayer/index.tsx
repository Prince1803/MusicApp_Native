import React, {useContext, useEffect, useRef, useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player'
import {colors} from '../../../Assets/Constants/Color'
import images from '../../../Assets/Constants/images'
import Slider from '@react-native-community/slider'

const {width} = Dimensions.get('window')

const MusicPlayer = ({songsList, currentSongdetail}) => {
  const playback = usePlaybackState()
  const [currentSongIndex, setCurrentSongIndex] = useState(
    currentSongdetail || 0,
  )
  const [isPlaying, setIsPlaying] = useState(false)
  const currentSong = songsList[currentSongIndex]
  const Progress = useProgress()

  useEffect(() => {
    const setupPlayer = async () => {
      await TrackPlayer.setupPlayer()
      await TrackPlayer.add(songsList)
      // await TrackPlayer.play()
      setIsPlaying(false)
    }

    setupPlayer()

    return () => {
      TrackPlayer.stop()
    }
  }, []) 

  useEffect(() => {
    const playCurrentSong = async () => {
      await TrackPlayer.stop()
      await TrackPlayer.reset()
      await TrackPlayer.add([currentSong])
      // await TrackPlayer.play()
      setIsPlaying(false)
    }

    if (currentSongIndex >= 0) {
      playCurrentSong()
    }
  }, [currentSongIndex])

  const playNewSong = async songIndex => {
    setCurrentSongIndex(songIndex)
  }
  const togglePlayPause = async () => {
    const playbackState = await TrackPlayer.getState()
    if (
      playbackState === State.Paused.toLowerCase() ||
      playbackState === State.Ready.toLowerCase()
    ) {
      await TrackPlayer.play()
      setIsPlaying(true)
    } else {
      await TrackPlayer.pause()
      setIsPlaying(false)
    }
  }

  const nextSong = async () => {
    if (currentSongIndex < songsList.length - 1) {
      playNewSong(currentSongIndex + 1)
    }
  }

  const previousSong = async () => {
    if (currentSongIndex > 0) {
      playNewSong(currentSongIndex - 1)
    }
  }

  return (
    <View style={styles.container}>
      {/* <View style={styles.sliderview}>
    <Slider
      style={styles.progress}
      value={Progress.position}
      minimumValue={0}
      maximumValue={Progress.duration}
      thumbTintColor={colors.white}
      minimumTrackTintColor={colors.white}
      maximumTrackTintColor={colors.white}
      onSlidingComplete={async (value) => {
        await TrackPlayer.seekTo(value)
      }}
    />
  </View> */}
      <View style={styles.Musiccontainer}>
        <View style={styles.album}>
          <Image source={currentSong.img} style={styles.albumArt} />
          <View style={styles.songDetails}>
            <Text style={styles.songTitle}>{currentSong.title}</Text>
          </View>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity onPress={previousSong}>
            <Image source={images.previous} style={styles.controlIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={togglePlayPause}>
            <Image
              source={
                playback.state === State.Paused.toLowerCase() ||
                playback.state === State.Ready.toLowerCase()
                  ? images.play
                  : images.pause
              }
              style={styles.controlIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={nextSong}>
            <Image source={images.next} style={styles.controlIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#11234d',

    width: '97%',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 6,
  },
  sliderview: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    width: '99%',
    height: 17,
  },
  Musiccontainer: {
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingRight: 0,
  },
  album: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 180,
  },
  albumArt: {
    width: width / 5.5,
    height: width / 5.5,
    borderRadius: 10,
  },
  songDetails: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
  songTitle: {
    fontSize: 14,
    color: colors.white,
    fontWeight: 'bold',
    paddingLeft: 17,
  },
  artist: {
    fontSize: 10,
    color: colors.text,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '47%',
  },
  controlIcon: {
    width: 20,
    height: 20,
    tintColor: colors.white,
  },
})

export default MusicPlayer
