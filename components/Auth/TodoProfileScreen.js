// TodoProfileScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from '../Background';

const TodoProfileScreen = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUserJSON = await AsyncStorage.getItem('currentUser');
        const currentUser = currentUserJSON ? JSON.parse(currentUserJSON) : {};
        setUser(currentUser);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>User Profile</Text>

        {user && (
          <View style={styles.profileInfo}>
            <Text style={styles.label}>First Name:</Text>
            <Text style={styles.infoItem}>{user.firstName}</Text>

            <Text style={styles.label}>Last Name:</Text>
            <Text style={styles.infoItem}>{user.lastName}</Text>

            <Text style={styles.label}>Username:</Text>
            <Text style={styles.infoItem}>{user.userName}</Text>

            {/* Displaying password for demo purposes, consider removing this line */}
            <Text style={styles.label}>Password:</Text>
            <Text style={styles.infoItem}>{user.password}</Text>
          </View>
        )}
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  profileInfo: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    width: '80%',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  infoItem: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default TodoProfileScreen;
