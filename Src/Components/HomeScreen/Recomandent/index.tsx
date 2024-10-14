import React from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { recomandentdata } from '../../../Assets/Constants/data'
import { colors } from '../../../Assets/Constants/Color'
import { useNavigation } from '@react-navigation/native'

const Recomandent = () => {
  const navigation = useNavigation()

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('SongDetail', { song: item, index:index })}
    >
      <Image source={item.img} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.artist}>{item.artist}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recommended for you</Text>
      <FlatList
        data={recomandentdata}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default Recomandent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.primarycolor,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.white,
  },
  itemContainer: {
    marginRight: 16,
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: colors.secondarycolor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  artist: {
    fontSize: 14,
    color: colors.text,
  },
})

