import React from 'react';
import {SafeAreaView, Text, Pressable, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

export function ImagePickerModal({isVisible, onClose, onImageLibraryPress}) {
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={styles.modal}>
      <SafeAreaView
        style={[styles.buttons, {marginBottom: '8%', marginLeft: '5%'}]}>
        <Text style={[styles.buttonText, {color: 'black'}]}>ADD PICTURE</Text>
      </SafeAreaView>
      <SafeAreaView
        style={[
          styles.buttons,
          {alignItems: 'stretch', marginHorizontal: '8%'},
        ]}>
        <Pressable style={[styles.button]} onPress={onClose}>
          <Text style={styles.buttonText}>CANCEL</Text>
        </Pressable>
        <Pressable style={[styles.button]} onPress={onImageLibraryPress}>
          <Text style={[styles.buttonText]}>CHOOSE FROM LIBRARY</Text>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    marginVertical: '80%',
  },
  buttonIcon: {
    width: 30,
    height: 30,
    margin: 10,
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginHorizontal: -15,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'turquoise',
  },
});
