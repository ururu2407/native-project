import React from 'react';
import axios from 'axios';
import { View, Alert, FlatList, ActivityIndicator, Text, RefreshControl, TouchableOpacity } from 'react-native';
import { Post } from '../components/Post';

export const HomeScreen = () => {
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
            <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} />
                <Text style={{ marginTop: 15 }}>Loadind...</Text>
            </View>)
    }

    return (
        <View >
            <FlatList
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}
                data={items}
                renderItem={({ item }) => (
                    <TouchableOpacity>
                        <Post title={item.title} date={item.date} image={item.image} />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
