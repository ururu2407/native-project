import React from 'react';
import axios from 'axios';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { Loading } from '../components/Loading';

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`;

const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`;

export const FullPostScreen = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState();
    const { id, title } = route.params;

    React.useEffect(() => {
        navigation.setOptions({
            title,
        });
        axios
            .get('https://660d70b96ddfa2943b346cd8.mockapi.io/Posts/' + id)
            .then(({ data }) => {
                setData(data);
            })
            .catch((err) => {
                console.log(err);
                Alert.alert('Error', 'Could not get article');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <Loading />
        );
    }

    return (
        <View style={{ padding: 20 }}>
            <PostImage source={{ uri: data.image }} />
            <PostText>{data.text}</PostText>
        </View>
    );
}