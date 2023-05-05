import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        // Set the duration for the GIF to play, then navigate to the main screen
        const timer = setTimeout(() => {
            navigation.replace('StartingScreen');
        }, 3500); // 5000ms (5 seconds) is the duration before navigating

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image style={styles.gif} source={require('../assets/animations/splashscreen_logo.gif')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    gif: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});

export default SplashScreen;
