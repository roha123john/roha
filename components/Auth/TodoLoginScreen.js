// TodoLoginScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from '../Background';

const TodoLoginScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const currentUserJSON = await AsyncStorage.getItem('currentUser');
    const currentUser = currentUserJSON ? JSON.parse(currentUserJSON) : {};
    const userId = currentUser.id;

    if (currentUser.id != null) {
      navigation.replace('Todo');
    }
  };

  const handleLogin = async () => {
    try {
      const existingUsersJSON = await AsyncStorage.getItem('users');
      const existingUsers = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];
  
      console.log('Entered Username:', userName);
      console.log('Entered Password:', password);
      console.log('Existing Users:', existingUsers);
  
      const matchedUser = existingUsers.find(
        user => user.userName === userName && user.password === password
      );
  
      console.log('Matched User:', matchedUser);
  
      if (userName !== '' && password !== '' && matchedUser) {
        await AsyncStorage.setItem('currentUser', JSON.stringify(matchedUser));
        setErrorMessage('');
        navigation.navigate('Todo');
      } else {
        setErrorMessage('Invalid username or password. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.maintitle}>WELCOME</Text>
        <Text style={styles.title}>LOG IN</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={userName}
          onChangeText={text => setUserName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text>Log in </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('TodoSignup')}>
          <Text style={styles.link}>Explore more by creating an account</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
    fontWeight: 'bold',
  },
  maintitle: {
    fontSize: 30,
    marginBottom: 70,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
  link: {
    color: 'blue',
    marginTop: 100,
  },
  button: {
    height: 40,
    width: '80%',
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#035E30',
    marginBottom: 30,
  },
});

export default TodoLoginScreen;
