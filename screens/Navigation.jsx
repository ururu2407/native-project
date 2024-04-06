import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { FullPostScreen } from './FullPost';
import { HomeScreen } from './Home';
import { CreatePostScreen } from './CreatePost';

const Stack = createNativeStackNavigator();

// <Routes>....</Routes> => Stack.Navigator

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'News' }} />
        <Stack.Screen name="FullPost" component={FullPostScreen} options={{ title: 'Article' }} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: 'Create Post' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};