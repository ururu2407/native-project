import React from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Button, TextInput, View, Image, StyleSheet, } from 'react-native';
import { Loading } from '../components/Loading';
import styled from 'styled-components/native';
const defaultImageUrl = 'https://i.imgur.com/HP6lYty.png';

const CreateInput = styled.TextInput`
    border: 1px solid ;
    border-color: ${props => (props.isFocused ? '#000' : 'rgba(0, 0, 0, 0.4)')};
    border-radius: 12px;
    height: 50px;
    color: #0d0d0d;  
    width: 100%;
    padding: 10px;
`
const CreateButton = styled.Button`
   width: 200px;
   padding: 10px;
   border-radius: 12px;
`
export const CreatePostScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [newPostTitle, setNewPostTitle] = React.useState('');
    const [newPostText, setNewPostText] = React.useState('');
    const [newPostImage, setNewPostImage] = React.useState('');
    const [isTitleFocused, setIsTitleFocused] = React.useState(false);
    const [isTextFocused, setIsTextFocused] = React.useState(false);
    const [isImageFocused, setIsImageFocused] = React.useState(false);

    React.useEffect(() => {
        setIsLoading(false);
    }, [])

    const createPost = () => {
        setIsLoading(true);
        const formattedDate = format(new Date(), 'dd/MM/yyyy');
        const imageUrl = newPostImage || defaultImageUrl;
        axios.post('https://660d70b96ddfa2943b346cd8.mockapi.io/Posts', {
            title: newPostTitle,
            text: newPostText,
            image: imageUrl,
            date: formattedDate
        }).then(response => {
            console.log('Post created:', response.data);
            setNewPostTitle('');
            setNewPostText('');
            setNewPostImage('');
        }).catch(err => {
            console.error('Error creating post:', err);
            Alert.alert('Error', 'Unable to create post');
        }).finally(() => setIsLoading(false));
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, gap: 15, width: '100%' }} >
            <CreateInput
                placeholder="Enter post title"
                value={newPostTitle}
                isFocused={isTitleFocused}
                onFocus={() => setIsTitleFocused(true)}
                onBlur={() => setIsTitleFocused(false)}
                onChangeText={text => setNewPostTitle(text)}
            />
            <CreateInput
                placeholder="Enter post text"
                value={newPostText}
                isFocused={isTextFocused}
                onFocus={() => setIsTextFocused(true)}
                onBlur={() => setIsTextFocused(false)}
                onChangeText={text => setNewPostText(text)}
            />
            <CreateInput
                placeholder="Enter post image URL"
                value={newPostImage}
                isFocused={isImageFocused}
                onFocus={() => setIsImageFocused(true)}
                onBlur={() => setIsImageFocused(false)}
                onChangeText={text => setNewPostImage(text)}
            />
            <View style={{ alignItems: 'center', }}>
                {newPostImage ? (
                    <Image source={{ uri: newPostImage }} style={{ width: 200, height: 200 }} />
                ) : (
                    <Image source={{ uri: defaultImageUrl }} style={{ width: 200, height: 200 }} />
                )}
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        createPost();
                        navigation.navigate('Home');
                    }}
                    title="Create Post"
                    color="#228415"
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    buttonContainer: {
      margin: 10,
      borderRadius: 8,
      width: '100%',
      overflow: 'hidden', // чтобы обрезать углы кнопки
    },
  });