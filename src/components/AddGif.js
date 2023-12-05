import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const AddGif = () => {
  return (
    <View style={styles.container}>
      <Image
        style={{width: '100%', height: '80%'}}
        source={require('../assets/blog.gif')}
      />
    </View>
  );
};

export default AddGif;

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    margin: 25,
  },
});
