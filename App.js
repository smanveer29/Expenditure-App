import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreens from './src/Screens/LoginScreens';
import HomeScreen from './src/Screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterScreen from './src/Screens/RegisterScreen';
import SplashScreen from './src/Screens/SplashScreen';
import AddScreen from './src/Screens/AddScreen';

const Stack = createStackNavigator();
class App extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen options={{ headerShown: false }} name="Splash" component={SplashScreen} />
              <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreens} />
              <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
              <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
              <Stack.Screen  name="Add" component={AddScreen} />
            </Stack.Navigator>
        </NavigationContainer>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
});

export default App;
