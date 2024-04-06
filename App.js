import React from 'react';
import { Navigation } from './screens/Navigation';
import {StatusBar} from 'react-native';
export default function App() {
    return (
        <>
            <Navigation />
            <StatusBar style="auto" />
        </>

    )
}
