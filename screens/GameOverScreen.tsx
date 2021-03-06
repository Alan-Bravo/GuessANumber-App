import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

const GameOverScreen = (props: any) => {
    return (
        <View style={styles.screen}>
            <TitleText>Game Over</TitleText>
            <View style={styles.imageContainer}>
              <Image 
                source={require('../assets/success.png')} 
                style={styles.image} 
                resizeMode="cover" 
              />
            </View>
            <View style={styles.resultContainer}>
            <BodyText style={styles.resultText}>
                Tu SmartPhone necesitó <Text style={styles.highlight}>
                    {props.roundsNumber}
                </Text> rondas para adivinar el número <Text style={styles.highlight}>
                    {props.userNumber}
                </Text>
            </BodyText>
            </View>

            <MainButton onPress={props.onRestart}>Nuevo Juego</MainButton>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%',
    },
    resultContainer: {
        marginHorizontal: 30,
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20,
    },
    highlight: {
        color: Colors.primary,
    }
});


export default GameOverScreen;
