import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, Alert } from 'react-native';

// Sample posts data
const postsData = [
  {
    id: '1',
    user: 'hdsay904a',
    time: '1 hour ago',
    postText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    comments: [
      'Great post!',
      'Interesting thought...',
      'I agree with you!',
    ],
  },
  {
    id: '2',
    user: 'anonymous',
    time: '9 hours ago',
    postText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    comments: [
      'Wow!',
      'Nice one!',
      'This is insightful.',
    ],
  },
];

const Homepage = ({ navigation }) => {
  const [postText, setPostText] = useState('');

  const handlePost = () => {
    if (!postText) {
      Alert.alert('Empty Post', 'Please write something to post.');
      return;
    }
    console.log('New post:', postText);
    setPostText(''); // Clear input after posting
  };

  const handleLogout = () => {
    Alert.alert('Logged Out', 'You have logged out successfully.');
    navigation.navigate('Login'); // Adjust navigation based on your setup
  };

  const handleReply = (post) => {
    navigation.navigate('Comment', { post });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/bmc.png')} style={styles.logo} />
        <Text style={styles.appName}>SafeSpace</Text>
        <View style={styles.profileContainer}>
          <Text style={styles.profileName}>kcir-dor</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Post Section */}
      <View style={styles.postContainer}>
        <TextInput
          style={styles.postInput}
          placeholder="What's on your mind?"
          value={postText}
          onChangeText={setPostText}
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>

      {/* News and Updates */}
      <View style={styles.newsContainer}>
        <Text style={styles.newsTitle}>News and Updates</Text>

        {/* FlatList to render posts */}
        <FlatList
          data={postsData}
          renderItem={({ item }) => (
            <View style={styles.postCard}>
              <Text style={styles.postUser}>{item.user} • {item.time}</Text>
              <Text style={styles.postText}>{item.postText}</Text>
              <Text style={styles.commentCount}>Comments: {item.comments.length}</Text>
              <TouchableOpacity style={styles.replyButton} onPress={() => handleReply(item)}>
                <Text style={styles.replyButtonText}>Reply</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#757272', // Background color
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4D1616', // Header color
    padding: 10,
    marginBottom: 20,
    marginTop: 10,
    marginHorizontal: -20, // Negative margin to offset the container padding
  },
  logo: {
    width: 40,
    height: 40,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    color: '#FFFFFF',
    marginRight: 10,
  },
  logoutText: {
    color: '#C43D3D', // Button color
  },
  postContainer: {
    marginBottom: 20,
  },
  postInput: {
    backgroundColor: '#FFFFFF', // TextField color
    color: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  postButton: {
    backgroundColor: '#575757', // Button color
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  newsContainer: {
    backgroundColor: '#4D1616', // TextField color
    padding: 20,
    borderRadius: 10,
    marginBottom: 200,
  },
  newsTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 10,
  },
  postCard: {
    backgroundColor: '#4D1616', // TextField color
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  postUser: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  postText: {
    color: '#FFFFFF',
    marginTop: 10,
  },
  commentCount: {
    color: '#AAA',
    marginTop: 10,
  },
  replyButton: {
    marginTop: 10,
    backgroundColor: '#FFFFFF', // Send OTP button color
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  replyButtonText: {
    color: '#C43D3D', // Button color
  },
});

export default Homepage;

