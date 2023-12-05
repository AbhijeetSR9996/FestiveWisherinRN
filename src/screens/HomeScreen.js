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

// import React, {useRef} from 'react';
// import {View, TextInput, Button} from 'react-native';
// import ViewShot from 'react-native-view-shot'; // Import react-native-view-shot

// const HomeScreen = () => {
//   const textInputRef = useRef();
//   const viewShotRef = useRef(); // Create a reference for the ViewShot component

//   const onSaveImage = async () => {
//     if (viewShotRef.current) {
//       viewShotRef.current.capture().then(uri => {
//         // `uri` contains the path to the captured image
//         console.log('Image captured:', uri);
//         // Perform actions with the captured image path (e.g., save it, display it, etc.)
//       });
//     }
//   };

//   return (
//     <View style={{flex: 1}}>
//       {/* Add festive background */}
//       {/* Consider using an image or custom design */}

//       {/* Wrap the content you want to capture within the ViewShot component */}
//       <ViewShot ref={viewShotRef} options={{format: 'jpg', quality: 0.9}}>
//         {/* Editable text input */}
//         <TextInput
//           ref={textInputRef}
//           placeholder="Type your wishes here"
//           style={{
//             /* Style your input */
//             color: '#000',
//           }}
//         />
//       </ViewShot>

//       {/* Save as image button */}
//       <Button title="Save as Image" onPress={onSaveImage} />
//     </View>
//   );
// };

// export default HomeScreen;

// import React, {useRef} from 'react';
// import {View, TextInput, Button, Image} from 'react-native';

// const HomeScreen = () => {
//   const textInputRef = useRef();

//   const onSaveImage = async () => {
//   };

//   return (
//     <View style={{flex: 1}}>
//       {/* Add festive background */}
//       {/* Consider using an image or custom design */}

//       {/* Editable text input */}
//       <TextInput
//         ref={textInputRef}
//         placeholder="Type your wishes here"
//         style={
//           {
//             /* Style your input */
//           }
//         }
//       />

//       {/* Save as image button */}
//       <Button title="Save as Image" onPress={onSaveImage} />
//     </View>
//   );
// };

// export default HomeScreen;

// import React, {useState} from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import {captureScreen} from 'react-native-view-shot';

// const HomeScreen = () => {
//   const [imageURI, setImageURI] = useState(
//     'https://raw.githubusercontent.com/AboutReact/sampleresource/master/sample_img.png',
//   );
//   const [savedImagePath, setSavedImagePath] = useState('uri');

//   const takeScreenShot = () => {
//     captureScreen({
//       format: 'jpg',
//       quality: 0.8,
//     }).then(
//       uri => {
//         setImageURI(uri);
//         setSavedImagePath(uri);
//       },
//       error => console.error('Oops, Something Went Wrong', error),
//     );
//   };

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <View style={styles.container}>
//         <Text style={styles.titleText}>React Native Take Screenshot</Text>
//         <Image
//           source={{uri: imageURI}}
//           style={{
//             width: 200,
//             height: 300,
//             resizeMode: 'contain',
//             marginTop: 5,
//             borderWidth: 1,
//             borderColor: 'red',
//             marginBottom: 5,
//             borderRadius: 3,
//           }}
//         />
//         <TouchableOpacity style={styles.buttonStyle} onPress={takeScreenShot}>
//           <Text style={styles.buttonTextStyle}>Get Screenshot</Text>
//         </TouchableOpacity>
//         <Text style={styles.textStyle}>Your Screenshot url is</Text>
//         <Text style={styles.textLinkStyle}>
//           {savedImagePath ? ` \n ${savedImagePath}` : ''}
//         </Text>
//         <Text style={styles.textStyle}>From ASR</Text>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     padding: 10,
//     alignItems: 'center',
//   },
//   titleText: {
//     fontSize: 22,
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   textStyle: {
//     textAlign: 'center',
//     padding: 10,
//   },
//   textLinkStyle: {
//     textAlign: 'center',
//     padding: 10,
//     color: 'blue',
//   },
//   buttonStyle: {
//     fontSize: 16,
//     color: 'white',
//     backgroundColor: 'green',
//     padding: 5,
//     minWidth: 250,
//   },
//   buttonTextStyle: {
//     padding: 5,
//     color: 'white',
//     textAlign: 'center',
//   },
// });

// export default HomeScreen;

// import React from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TouchableOpacity,
// } from 'react-native';

// const HomeScreen = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         style={styles.scrollview}
//         contentContainerStyle={styles.sv}>
//         {/* heading */}
//         <View
//           style={{
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'stretch',
//           }}>
//           <View
//             style={{
//               flex: 0.2,
//               backgroundColor: 'orange',
//               flexDirection: 'row',
//               alignItems: 'stretch',
//             }}>
//             <View
//               style={{
//                 backgroundColor: 'red',
//                 flex: 0.2,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <Image
//                 source={require('../assets/images/profilepic.png')}
//                 style={{height: 60, width: 60}}
//               />
//             </View>
//             <View
//               style={{
//                 flex: 0.5,
//                 justifyContent: 'center',
//                 alignItems: 'flex-start',
//                 flexDirection: 'column',
//                 paddingLeft: 20,
//               }}>
//               <Text style={{fontSize: 20, color: '#250075'}}>Good Morning</Text>
//               <Text style={{fontSize: 16, color: '#6544f2'}}>Jay Kamuju</Text>
//             </View>
//             <View
//               style={{
//                 backgroundColor: 'red',
//                 flex: 0.3,
//                 justifyContent: 'space-around',
//                 alignItems: 'center',
//                 flexDirection: 'row',
//               }}>
//               <TouchableOpacity>
//                 <Image source={require('../assets/images/bell.png')} />
//               </TouchableOpacity>
//               <TouchableOpacity>
//                 <Image source={require('../assets/images/bookmark.png')} />
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View style={{flex: 0.8, flex: 1}}>
//             {/* search box */}
//             <View
//               style={{
//                 flex: 0.13,
//                 backgroundColor: 'lightgrey',
//                 justifyContent: 'space-evenly',
//                 alignItems: 'center',
//                 flexDirection: 'row',
//                 marginHorizontal: 20,
//                 borderRadius: 15,
//               }}>
//               <Image
//                 source={require('../assets/images/magnifer.png')}
//                 style={{height: 40, width: 40, right: 40}}
//               />
//               <Text style={{fontSize: 18, color: '#808080', right: 80}}>
//                 Search
//               </Text>
//               <Image
//                 source={require('../assets/images/filter.png')}
//                 style={{height: 25, width: 25, left: 40}}
//               />
//             </View>
//             <View style={{flex: 0.87}}>
//             <View
//             style={{
//             flex: 0.1,
//             justifyContent: 'flex-start',
//             alignItems: 'center',
//           }}>
//           </View>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//   },
//   scrollview: {
//     backgroundColor: '#f1f1f1',
//     flex: 1,
//   },
//   sv: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'stretch',
//     flexDirection: 'column',
//   },
//   heading: {
//     backgroundColor: 'grey',
//     //flex: 1,
//   },
// });
