import {View, Text, StyleSheet, Image, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import images from '../../Assets/Constants/images';
import { colors } from '../../Assets/Constants/Color';


const SplashScreen = () => {


  return (
    <View style={styles.container}> 
      <Image source={images.splash} style={styles.image} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.splash,
  },
  image: {
    // borderWidth:1,
    height: 400,
    width: 400,
    marginLeft:45

  },
});

export default SplashScreen;
