import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const LikedSongsContext = createContext();

export const LikedSongsProvider = ({children}) => {
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {

    const loadLikedSongs = async () => {
      try {
        const storedLikedSongs = await AsyncStorage.getItem('likedSongs');
        if (storedLikedSongs !== null) {
          setLikedSongs(JSON.parse(storedLikedSongs));
        }
      } catch (error) {
        console.error('Failed to load liked songs from AsyncStorage:', error);
      }
    };

    loadLikedSongs();
  }, []);

  const toggleLikeSong = song => {
    const isLiked = likedSongs.some(s => s.id === song.id);
    let updatedLikedSongs;

    if (isLiked) {

      updatedLikedSongs = likedSongs.filter(s => s.id !== song.id);
    } else {
     
      updatedLikedSongs = [...likedSongs, song];
    }

    setLikedSongs(updatedLikedSongs);

    AsyncStorage.setItem('likedSongs', JSON.stringify(updatedLikedSongs)).catch(
      error => {
        console.error('Failed to save liked songs to AsyncStorage:', error);
      },
    );
  };

  return (
    <LikedSongsContext.Provider value={{likedSongs, toggleLikeSong}}>
      {children}
    </LikedSongsContext.Provider>
  );
};
