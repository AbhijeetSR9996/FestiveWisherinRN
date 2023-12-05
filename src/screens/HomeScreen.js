import React, {useRef, useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import * as ImagePicker from 'react-native-image-picker';
import Styles from './styles';
import {ImagePickerModal} from '../components/imagepickermodal';

const HomeScreen = () => {
  const textInputRef = useRef();
  const viewShotRef = useRef();

  const [pickerResponse, setPickerResponse] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Request permission to access the device's external storage
    const checkPermission = async () => {
      try {
        // Request storage permission
        const storagePermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message:
              'This app requires permission to access your device storage for downloading.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (storagePermission !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage permission denied');
        }
      } catch (error) {
        console.error('Error requesting permissions:', error);
      }
    };

    if (Platform.OS === 'android') {
      // Only request external storage permission here if needed for other operations
      checkPermission();
    }
  }, []);

  const onSaveImage = async () => {
    if (viewShotRef.current) {
      viewShotRef.current.capture().then(async uri => {
        console.log('Image captured:', uri);
        try {
          // Get the original file path
          const originalImagePath = uri.replace('file://', '');

          // Define the path for the "Download" folder
          const downloadFolderPath = `${RNFS.ExternalDirectoryPath}/Download/`;

          // Create the "Download" folder if it doesn't exist
          await RNFS.mkdir(downloadFolderPath);

          // Move the image file to the "Download" folder using rn-fetch-blob
          const fileName = 'diwali_wish.jpg'; // Set the desired file name
          const destinationPath = `${downloadFolderPath}${fileName}`;
          await RNFetchBlob.fs.cp(originalImagePath, destinationPath);
          // await RNFetchBlob.fs.dirs.DownloadDir(
          //   originalImagePath,
          //   destinationPath,
          // );

          console.log('Image saved in Download folder:', destinationPath);
        } catch (error) {
          console.error('Error saving image:', error);
        }
      });
    }
  };

  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, setPickerResponse);
  }, []);

  const onCameraPress = useCallback(() => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchCamera(options, setPickerResponse);
  }, []);

  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

  return (
    <View style={{flex: 1}}>
      <ViewShot
        ref={viewShotRef}
        options={{format: 'jpg', quality: 0.9}}
        style={{flex: 1}}>
        <ImageBackground
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
          }}
          source={require('../assets/images/cel_bg.jpg')}>
          <View
            style={{
              flex: 0.7,
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Text
              style={{
                color: 'blue',
                fontSize: 50,
                fontWeight: 'bold',
                alignSelf: 'center',
                marginTop: '10%',
                marginHorizontal: 20,
                textAlign: 'center',
                letterSpacing: 30,
                //top: 340,
              }}>
              HAPPY
            </Text>
            <Text
              style={{
                color: '#499e6d',
                fontSize: 50,
                fontWeight: 'bold',
                alignSelf: 'center',
                marginHorizontal: 20,
                textAlign: 'center',
                letterSpacing: 25,
                //top: 340,
              }}>
              DIWALI
            </Text>
          </View>

          <TouchableOpacity
            style={Styles.card_box}
            onPress={() => setVisible(true)}>
            {uri ? (
              <Image
                style={{
                  height: 290,
                  width: 290,
                  borderRadius: 290 / 2,
                }}
                source={uri ? {uri} : ''}
              />
            ) : (
              <Text style={Styles.buttonText}>Choose your pic</Text>
            )}
          </TouchableOpacity>

          <ImagePickerModal
            isVisible={visible}
            onClose={() => setVisible(false)}
            onImageLibraryPress={onImageLibraryPress}
            onCameraPress={onCameraPress}
          />

          <View
            style={{
              flex: 0.3,
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Text
              style={{
                color: '#4fee',
                fontSize: 20,
                fontStyle: 'italic',
                fontWeight: 'bold',
                alignSelf: 'center',
                marginHorizontal: 20,
                textAlign: 'center',
              }}>
              Wishing you a safe, joyful, prosperous and memorable Diwali..!!
            </Text>
          </View>
        </ImageBackground>
      </ViewShot>

      <Button title="DOWNLOAD" onPress={onSaveImage} />
    </View>
  );
};

export default HomeScreen;

