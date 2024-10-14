import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import {colors} from '../Color';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import images from '../images';

interface HeaderProps {
  title?: string;
  leftImage: any;
  rightImage: any;
  onLeftImagePress?: () => void;
  onRightImagePress?: () => void;
  showBackButton?: boolean;
  drawerImage?: any;
  currentSong?: number;
}

const Header: React.FC<HeaderProps> = ({
  title,
  leftImage,
  rightImage,
  onLeftImagePress,
  onRightImagePress,
  showBackButton = false,
  drawerImage,
  currentSong,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerStyle}>
      {drawerImage && (
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Image source={drawerImage} style={styles.drawerImageStyle} />
        </TouchableOpacity>
      )}

      {showBackButton && (
        <TouchableOpacity
          onPress={() => {
            const currentRoute =
              navigation.getState().routes[navigation.getState().index].name;
            if (currentRoute === 'SongDetail') {
              navigation.navigate('Home', {currentSongIndex: currentSong});
            } else {
              navigation.goBack();
            }
          }}
          style={styles.backButton}>
          <Image source={images.back} style={styles.backbtn} />
        </TouchableOpacity>
      )}

      {title && <Text style={styles.headerTitle}>{title}</Text>}
      <TouchableOpacity onPress={onRightImagePress}>
        <Image source={rightImage} style={styles.rightImageStyle} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
    paddingHorizontal: 15,
    backgroundColor: colors.primarycolor,
  },
  drawerImageStyle: {
    width: 25,
    height: 20,
    tintColor: colors.white,
    alignSelf: 'center',
    marginTop: 5,
  },
  backButton: {
    marginRight: 10,
  },
  backbtn: {
    height: 20,
    width: 30,
    color: colors.white,
  },
  leftImageStyle: {
    width: 20,
    height: 20,
    tintColor: colors.white,
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rightImageStyle: {
    width: 25,
    height: 22,
    tintColor: colors.white,
  },
});

export default Header;
