// TodoLogoutScreen.js
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const TodoLogoutScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('currentUser');
      console.log("Logged out");

      // Reset the navigation stack to only include the login screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'TodoLogin' }],
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <View style={styles.container}>
      {/* You can add a loading spinner or any other UI elements if needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default TodoLogoutScreen;
