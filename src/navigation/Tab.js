import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import MailScreen from '../screens/MailScreen';
import SettingScreen from '../screens/SettingScreen';
import DocScreen from '../screens/DocScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const BottomTab = createBottomTabNavigator();

const Tab = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <BottomTab.Screen name="Home" component={HomeScreen} />
      <BottomTab.Screen name="Doc" component={DocScreen} />
      <BottomTab.Screen name="Mail" component={MailScreen} />
      <BottomTab.Screen name="Setting" component={SettingScreen} />
    </BottomTab.Navigator>
  );
};

export default Tab;

const styles = StyleSheet.create({});
