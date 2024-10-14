// import React, {useRef, useEffect} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   ScrollView,
//   Dimensions,
// } from 'react-native';
// import {colors} from '../../Assets/Constants/Color';
// import Header from '../../Assets/Constants/Header';
// import Slider from '@react-native-community/slider';
// import images from '../../Assets/Constants/images';
// import {Playlist, recomandentdata} from '../../Assets/Constants/data';

// const {width, height} = Dimensions.get('window');
// const SongDetail = ({route}) => {
//   const {song, index} = route.params;
//   const allSongs = [...recomandentdata, ...Playlist];
//   const ref = useRef();

//   useEffect(() => {
//     if (ref.current && index >= 0 && index < allSongs.length) {
//       ref.current.scrollToIndex({animated: true, index});
//     }
//   }, [index]);

//   const renderSongs = ({item}) => (
//     <View style={styles.wrapper}>
//       <Image source={item.img} style={styles.image} />
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Header showBackButton={true} title="Playing Now" />
//       <ScrollView>
//         <View style={styles.flatitems}>
//           <FlatList
//             ref={ref}
//             data={allSongs}
//             renderItem={renderSongs}
//             keyExtractor={item => item.id.toString()}
//             horizontal
//             pagingEnabled
//             showsHorizontalScrollIndicator={false}
//             scrollEventThrottle={16}
//             initialScrollIndex={index}
//             getItemLayout={(data, index) => ({
//               length: 300,
//               offset: 300 * index,
//               index,
//             })}
//           />
//         </View>
//         <Text style={styles.title}>{song.title}</Text>
//         <Text style={styles.artist}>{song.artist}</Text>

//         <View>
//           <Slider
//             style={styles.progress}
//             value={0}
//             minimumValue={0}
//             maximumValue={100}
//             thumbTintColor={colors.white}
//             minimumTrackTintColor={colors.white}
//             maximumTrackTintColor={colors.white}
//             onSlidingComplete={() => {}}
//           />
//         </View>
//         <View style={styles.progresslabel}>
//           <Text style={styles.progresslabeltext}>0.00</Text>
//           <Text style={styles.progresslabeltext}>3.45</Text>
//         </View>
//         <View style={styles.musiccontrol}>
//           <TouchableOpacity onPress={() => {}} style={styles.maincontrol}>
//             <Image source={images.previous} style={styles.control} />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => {}} style={styles.maincontrolplay}>
//             <Image source={images.pause} style={styles.controlplay} />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => {}} style={styles.maincontrol}>
//             <Image source={images.next} style={styles.control} />
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default SongDetail;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: colors.primarycolor,
//     alignItems: 'center',
//   },
//   flatitems: {
//     // justifyContent: 'center',
//     // alignItems: 'center',
//   },
//   image: {
//     width: '90%',
//     height: '100%',
//     alignSelf: 'center',
//     borderRadius: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: colors.white,
//   },
//   artist: {
//     fontSize: 20,
//     color: colors.text,
//   },
//   progress: {
//     width: 350,
//     height: 60,
//     marginTop: 10,
//     flexDirection: 'row',
//   },
//   progresslabel: {
//     width: 340,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   progresslabeltext: {
//     color: colors.white,
//   },
//   musiccontrol: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '75%',
//     marginTop: 15,
//   },
//   maincontrolplay: {
//     height: 60,
//     width: 60,
//     backgroundColor: colors.white,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 35,
//   },
//   maincontrol: {
//     height: 40,
//     width: 40,
//     backgroundColor: colors.white,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 30,
//     marginTop: 10,
//   },
//   control: {
//     height: 20,
//     width: 20,
//   },
//   controlplay: {
//     height: 40,
//     width: 40,
//     backgroundColor: colors.white,
//   },
//   renderimage: {
//     width: 320,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//   },
//   wrapper: {
//     width: width,
//     height: height / 2 - 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 10,

//     // paddingLeft:200,
//     // paddingRight:0
//   },
// });
