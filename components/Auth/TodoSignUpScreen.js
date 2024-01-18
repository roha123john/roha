// TodoSignUpScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import Background from '../Background';

const TodoSignUpScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    try {
      if (!firstName || !lastName || !userName || !password) {
        setErrorMessage('All fields are required.');
        Alert.alert('Signup Failed', 'All fields are required.');
        return;
      }

      const existingUsersJSON = await AsyncStorage.getItem('users');
      const existingUsers = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];

      const userNameExists = existingUsers.some(user => user.userName === userName);

      if (userNameExists) {
        setErrorMessage('Username already exists. Please choose another.');
        Alert.alert('Signup Failed', 'Username already exists. Please choose another.');
      } else {
        const newUser = {
          id: uuidv4(),
          firstName,
          lastName,
          userName,
          password,
        };
        existingUsers.push(newUser);

        await AsyncStorage.setItem('users', JSON.stringify(existingUsers));

        setErrorMessage('');
        Alert.alert('Account created successfully', '', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('TodoLogin');
              setFirstName('');
              setLastName('');
              setUserName('');
              setPassword('');
            },
          },
        ]);
      }
    } catch (error) {
      console.error('Signup Failed:', error);
      Alert.alert('Signup Failed', 'An error occurred. Please try again later.');
    }
  };

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.maintitle}>Register yourself</Text>
        <Text style={styles.title}>SIGN UP</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={text => setFirstName(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={text => setLastName(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={userName}
          onChangeText={text => setUserName(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text>Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('TodoLogin')}>
          <Text style={styles.link}>Already have an account? Log in here.</Text>
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
    padding: 16,
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

export default TodoSignUpScreen;
