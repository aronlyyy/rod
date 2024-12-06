import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo-vector-icons

const CommentScreen = ({ route, navigation }) => {
  const { post } = route.params; // Get the post data passed from Homepage
  const [commentText, setCommentText] = useState('');

  const handleCommentPost = () => {
    if (!commentText) {
      Alert.alert('Empty Comment', 'Please write something to post.');
      return;
    }
    console.log('New comment:', commentText);
    setCommentText(''); // Clear input after posting
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={24} color="#fff" />
      </TouchableOpacity>
      <FlatList
        data={post.comments} // Assuming comments are an array of strings
        renderItem={({ item }) => (
          <View style={styles.commentCard}>
            <Text style={styles.commentText}>{item}</Text>
            <View style={styles.commentFooter}>
              <Text style={styles.commentTime}>Anonymous 10/12/23</Text>
              <TouchableOpacity>
                <Text style={styles.likeIcon}>♥</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={() => (
          <View style={styles.postSection}>
            <Text style={styles.postText}>{post.postText}</Text>
            <Text style={styles.commentCount}>{post.comments.length} Comments</Text>
          </View>
        )}
      />
      <View style={styles.commentInputSection}>
        <TextInput
          style={styles.commentInput}
          placeholder="Write a comment..."
          value={commentText}
          onChangeText={setCommentText}
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.commentButton} onPress={handleCommentPost}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4D1616',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10, // Ensure it is above other elements
  },
  postSection: {
    padding: 20,
    backgroundColor: '#4D1616',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 60, // To avoid overlap with the close button
  },
  postText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  commentCount: {
    color: '#aaa',
  },
  commentInputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#444',
    borderTopWidth: 1,
    borderColor: '#555',
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  commentButton: {
    backgroundColor: '#757272',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  commentCard: {
    backgroundColor: '#757272',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 20,
  },
  commentText: {
    color: '#fff',
    marginBottom: 10,
  },
  commentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentTime: {
    color: '#aaa',
  },
  likeIcon: {
    color: '#e63946',
  },
});

export default CommentScreen;
