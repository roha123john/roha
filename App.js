import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack


import StackNavigator from './Routes/LoginStack'


export default function App() {
  return (
   
     <NavigationContainer>
        <StackNavigator />
        </NavigationContainer>
   
  );
}

