import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // To store user data

// Function to validate the email format
const validateEmail = (email) => {
  const regex = /^[0-9]{7}@ub\.edu\.ph$/; // Ensures the email has 7 digits followed by @ub.edu.ph
  return regex.test(email);
};

// Function to generate OTP (for demonstration purposes)
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // 6 digit OTP
};

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(null);

  const handleRegister = () => {
    // Step 1: Validate email
    if (!validateEmail(email)) {
      Alert.alert('Invalid email', 'Please enter a valid UB email address with 7 digits and ending with @ub.edu.ph');
      return;
    }

    // Step 2: Check if passwords match
    if (password !== confirmPassword) {
      Alert.alert('Password Error', 'Passwords do not match');
      return;
    }

    // Step 3: Generate OTP
    const otp = generateOTP();
    setGeneratedOtp(otp);

    // Step 4: Send OTP (for now, we just log it to simulate sending an email)
    console.log(`OTP sent to ${email}: ${otp}`);
    
    Alert.alert('OTP Sent', `An OTP has been sent to ${email}. Please check your email and enter the OTP.`);
  };

  const handleSubmit = async () => {
    // Step 5: Verify OTP before submitting
    if (otp !== String(generatedOtp)) {
      Alert.alert('Invalid OTP', 'The OTP entered is incorrect. Please try again.');
      return;
    }

    // Store user data in AsyncStorage
    const user = { email, password };
    await AsyncStorage.setItem('user', JSON.stringify(user));

    Alert.alert('Registration Complete', 'Your registration is now complete.');

    // Navigate to the Login screen
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/bmc.png')} style={styles.logo} />
        <Text style={styles.logoText}>University of Batangas</Text>
      </View>

      <Text style={styles.title}>Register</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your UB Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#aaa"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#aaa"
      />

      {/* Confirm Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        placeholderTextColor="#aaa"
      />

      {/* OTP Input and Send Code Button */}
      <View style={styles.otpContainer}>
        <TextInput
          style={styles.inputOtp}
          placeholder="Enter OTP"
          value={otp}
          onChangeText={setOtp}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.sendCodeButton} onPress={handleRegister} disabled={generatedOtp !== null}>
          <Text style={styles.buttonText}>SEND CODE</Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>SUBMIT</Text>
      </TouchableOpacity>

      {/* Footer with Login Link */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.footer}>
          Already have an account? <Text style={styles.link}>Log in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#757272' },
  header: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: { fontSize: 18, color: '#fff', marginBottom: 20 },
  input: { width: '80%', backgroundColor: '#4D1616', padding: 15, borderRadius: 10, color: '#fff', marginBottom: 10 },
  otpContainer: { flexDirection: 'row', alignItems: 'center', width: '80%', marginBottom: 20 },
  inputOtp: { backgroundColor: '#4D1616', padding: 15, borderRadius: 10, color: '#fff', flex: 1, marginRight: 10 },
  sendCodeButton: { backgroundColor: '#e63946', padding: 15, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  submitButton: { backgroundColor: '#e63946', padding: 15, borderRadius: 10, width: '80%', alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  footer: { marginTop: 20, color: '#ccc' },
  link: { color: '#87ceeb', textDecorationLine: 'underline' },
});

export default RegisterScreen;
