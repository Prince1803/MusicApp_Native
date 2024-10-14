import React, {useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import images from '../../Assets/Constants/images';
import {LikedSongsContext} from '../LikeScreenContext';
import Header from '../../Assets/Constants/Header';
import {colors} from '../../Assets/Constants/Color';
import {useNavigation} from '@react-navigation/native';
import {songall} from '../../Assets/Constants/data';

const Like = () => {
  const {likedSongs} = useContext(LikedSongsContext);
  const navigation = useNavigation();

  const findSongIndex = song => {
    return songall.findIndex(s => s.id === song.id);
  };

  return (
    <View style={styles.container}>
      <Header drawerImage={images.drawer} title="Like Songs" />

      {likedSongs.length === 0 ? (
        <Text style={styles.noLikedSongsText}>No liked songs yet</Text>
      ) : (
        <FlatList
          data={likedSongs}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            const songIndex = findSongIndex(item);
            return (
              <TouchableOpacity
                style={styles.songItem}
                onPress={() =>
                  navigation.navigate('SongDetail', {
                    song: item,
                    index: songIndex,
                  })
                }>
                <Image source={item.img} style={styles.songImage} />
                <View style={styles.songtitle}>
                  <Text style={styles.songTitle}>{item.title}</Text>
                  <Text style={styles.songArtist}>{item.artist}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primarycolor,
  },
  noLikedSongsText: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: '75%',
    color: colors.text,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 12,
  },
  songImage: {
    width: 70,
    height: 50,
    marginRight: 15,
  },
  songtitle: {},
  songTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
  songArtist: {
    fontSize: 14,
    color: colors.text,
  },
});

export default Like;
