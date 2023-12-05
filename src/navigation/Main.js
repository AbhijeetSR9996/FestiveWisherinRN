import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import Tab from './Tab';

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Home">
        <Stack.Screen name={'Home'} component={HomeScreen} />
        {/* <Stack.Screen name="Home" component={Tab} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
