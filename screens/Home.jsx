import React from 'react';
import axios from 'axios';
import { View, Alert, FlatList, ActivityIndicator, Text, RefreshControl, TouchableOpacity } from 'react-native';
import { Post } from '../components/Post';
import { Loading } from '../components/Loading';

export const HomeScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [items, setItems] = React.useState([]);

    const fetchPosts = () => {
        setIsLoading(true)
        axios.get('https://660d70b96ddfa2943b346cd8.mockapi.io/Posts')
            .then(({ data }) => {
                setItems(data)
            }).catch(err => {
                console.log(err)
                Alert.alert('Error', 'Unable to get articles')
            }).finally(() => setIsLoading(false))
    }
    React.useEffect(fetchPosts, [])

    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <View >
            <FlatList
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}
                data={items}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('FullPost', { id: item.id, title: item.title })}>
                        <Post title={item.title} date={item.date} image={item.image} />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
