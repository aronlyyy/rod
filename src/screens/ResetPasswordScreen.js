import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleResetPassword = async () => {
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Password Error', 'Passwords do not match');
      return;
    }

    try {
      const storedUser = await AsyncStorage.getItem('user');
      const user = storedUser ? JSON.parse(storedUser) : null;

      if (user && user.email === email) {
        // Update the user password
        user.password = newPassword;
        await AsyncStorage.setItem('user', JSON.stringify(user));
        Alert.alert('Success', 'Password has been reset successfully');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', 'User not found or email does not match');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while resetting password. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo and University Text */}
      <View style={styles.logoContainer}>
        <Image source={require('../assets/bmc.png')} style={styles.logoImage} />
        <Text style={styles.logoText}>University of Batangas</Text>
      </View>

      {/* Reset Password Title */}
      <Text style={styles.title}>Reset Password</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="UB Mail"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
      />
      
      {/* Reset Button */}
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>RESET PASSWORD</Text>
      </TouchableOpacity>

      {/* Footer with Login Link */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.footer}>
          Remember your password? <Text style={styles.link}>Log in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#757272' },
  logoContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  logoImage: { width: 50, height: 50, marginRight: 10 },
  logoText: { fontSize: 26, fontWeight: 'bold', color: '#fff' },
  title: { fontSize: 18, color: '#fff', marginBottom: 20 },
  input: { width: '80%', backgroundColor: '#4D1616', padding: 15, borderRadius: 10, color: '#fff', marginBottom: 10 },
  button: { backgroundColor: '#e63946', padding: 15, borderRadius: 10, width: '80%', alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  footer: { marginTop: 20, color: '#ccc' },
  link: { color: '#87ceeb', textDecorationLine: 'underline' },
});

export default ResetPasswordScreen;
