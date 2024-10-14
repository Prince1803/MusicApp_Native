import React, {useContext, useEffect, useRef, useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  BackHandler,
} from 'react-native'
import Slider from '@react-native-community/slider'
import TrackPlayer, {
  Capability,
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player'
import {LikedSongsContext} from '../LikeScreenContext'
import Header from '../../Assets/Constants/Header'
import {colors} from '../../Assets/Constants/Color'
import images from '../../Assets/Constants/images'
import {songall} from '../../Assets/Constants/data'

const {width, height} = Dimensions.get('window')

const SongDetail = ({route, navigation}) => {
  const {song, index} = route.params
  const [currentSong, setCurrentSong] = useState(index)
  const ref = useRef()
  const playback = usePlaybackState()
  const Progress = useProgress()
  const {likedSongs, toggleLikeSong} = useContext(LikedSongsContext)

  useEffect(() => {
    if (route.params?.index !== undefined) {
      if (currentSong === route.params.index) {
        TrackPlayer.seekTo(0);
        TrackPlayer.play();
      } else {
        setCurrentSong(route.params.index);
      }
    }
  }, [route.params?.index]);

  useEffect(() => {
    setTimeout(() => {
      ref.current.scrollToIndex({animated: true, index: currentSong})
    }, 100)
  }, [currentSong])

  const playNewSong = async songIndex => {
    try {
      const currentTrackId = await TrackPlayer.getCurrentTrack();
  
      if (currentTrackId !== songall[songIndex].id) {
        await TrackPlayer.stop();
        await TrackPlayer.reset();
        await TrackPlayer.add(songall[songIndex]);
      } 
      await TrackPlayer.seekTo(0);  
      await TrackPlayer.play();
    } catch (error) {
      console.error('Error playing new song:', error);
    }
  };
  

  useEffect(() => {
    playNewSong(currentSong)
  }, [currentSong,index])

  const handleBackPress = () => {
    const currentRoute =
      navigation.getState().routes[navigation.getState().index].name
    if (currentRoute === 'SongDetail') {
      navigation.navigate('Home', {currentSongIndex: currentSong})
    } else {
      navigation.goBack()
    }
    return true
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress, 
    )

    return () => {
      backHandler.remove()
    }
  }, [currentSong])

  const toggleSound = async () => {
    const state = await TrackPlayer.getState()
    if (state === State.Paused.toLowerCase() || state === State.Ready.toLowerCase()) {
      await TrackPlayer.play()
    } else {
      await TrackPlayer.pause()
    }
  }

  const previous = async () => {
    if (currentSong > 0) {
      setCurrentSong(currentSong - 1)
      ref.current.scrollToIndex({animated: true, index: currentSong - 1})
      playNewSong(currentSong - 1)
    }
  }

  const next = async () => {
    if (songall.length - 1 > currentSong) {
      setCurrentSong(currentSong + 1)
      ref.current.scrollToIndex({animated: true, index: currentSong + 1})
      playNewSong(currentSong + 1)
    }
  }

  const handleLike = () => {
    toggleLikeSong(songall[currentSong])
  }

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
  }

  useEffect(() => {
    return () => {
      TrackPlayer.stop()
    }
  }, [])

  return (
    <View style={styles.container}>
      <Header
        showBackButton={true}
        title="Playing Now"
        currentSong={currentSong}
      />
      <ScrollView>
        <FlatList
          ref={ref}
          horizontal
          pagingEnabled
          data={songall}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={styles.bannerView}>
              <Image source={item.img} style={styles.banner} />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          onScrollToIndexFailed={info => {
            const wait = new Promise(resolve => setTimeout(resolve, 500))
            wait.then(() => {
              ref.current?.scrollToIndex({index: info.index, animated: true})
            })
          }}
        />

        <View style={styles.titlemain}>
          <View></View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{songall[currentSong].title}</Text>
            <Text style={styles.artist}>{songall[currentSong].artist}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={handleLike} style={styles.likeButton}>
              <Image
                source={
                  likedSongs.some(s => s.id === songall[currentSong].id)
                    ? images.LikeIconFilled
                    : images.LikeIcon
                }
                style={[
                  styles.likeIcon,
                  likedSongs.some(s => s.id === songall[currentSong].id) && {
                    tintColor: 'red',
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(Progress.position)}</Text>
          <Text style={styles.timeText}>{formatTime(Progress.duration)}</Text>
        </View>

        <View style={styles.sliderview}>
          <Slider
            style={styles.progress}
            value={Progress.position}
            minimumValue={0}
            maximumValue={Progress.duration}
            thumbTintColor={colors.white}
            minimumTrackTintColor={colors.white}
            maximumTrackTintColor={colors.white}
            onSlidingComplete={async value => {
              await TrackPlayer.seekTo(value)
            }}
          />
        </View>

        <View style={styles.musiccontrol}>
          <TouchableOpacity onPress={previous} style={styles.maincontrol}>
            <Image source={images.previous} style={styles.control} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleSound}
            style={styles.maincontrolplay}>
            <Image
              source={
                playback.state === State.Paused.toLowerCase() || playback.state === State.Ready.toLowerCase()
                  ? images.play
                  : images.pause
              }
              style={styles.controlplay}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={next} style={styles.maincontrol}>
            <Image source={images.next} style={styles.control} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primarycolor,
  },
  bannerView: {
    width: width,
    height: height / 2 - 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  banner: {
    width: '90%',
    height: '100%',
    alignSelf: 'center',
    borderRadius: 20,
  },
  titlemain: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: 250,
    marginLeft: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    alignSelf: 'center',
    marginTop: 20,
  },
  artist: {
    fontSize: 20,
    color: colors.text,
    alignSelf: 'center',
  },
  likeButton: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginRight: 10,
  },
  likeIcon: {
    width: 25,
    height: 23,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  timeText: {
    color: colors.white,
  },
  sliderview: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    width: '90%',
    height: 40,
    marginTop: 5,
  },
  musiccontrol: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  maincontrol: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  control: {
    width: 35,
    height:35,
  },
  maincontrolplay: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlplay: {
    width: 40,
    height: 40,
  },
})

export default SongDetail
