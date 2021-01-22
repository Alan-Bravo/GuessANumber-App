import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

interface Num {
    min: number,
    max: number,
    exclude: number,
}

const generateRandomBetween = ({min, max, exclude}: Num): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min
    if(rndNum === exclude){
        return generateRandomBetween({min, max, exclude});
    } else {
        return rndNum;
    }
}

const renderListItem = (listLength: number, itemData: any): object => {
    return (
        <View style={styles.listItem}>
            <BodyText>#{listLength - itemData.index}</BodyText>
            <BodyText>{itemData.item}</BodyText>
        </View>
    )
}

const GameScreen = (props: any): JSX.Element => {

    const initialGuess: number = generateRandomBetween({min: 1, max: 100, exclude: props.userChoice})

    const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);
    const [pastGuesses, setPastGuesses] = useState<string[]>([initialGuess.toString()]);

        const currentLow = useRef(1);
        const currentHigh = useRef(100);

        const { userChoice, onGameOver } = props;

        useEffect(() => {
            if(currentGuess === userChoice){
                onGameOver(pastGuesses.length);
            }
        }, [currentGuess, userChoice, onGameOver]);

        const nextGuessHandler = (direction: any): void => {
            if(
                (direction === 'lower' && currentGuess < props.userChoice) || 
                (direction === 'greater' && currentGuess > props.userChoice)
              ){
                Alert.alert('No mientas!', 'Sabes que eso está mal', [
                    {text: 'Perdón!', style: 'cancel'}
                ]);
                return;
            }
            if(direction === 'lower'){
                currentHigh.current = currentGuess;
            } else {
                currentLow.current =  currentGuess + 1;
            }
            const nextNumber: number = generateRandomBetween(
                {
                  min: currentLow.current, 
                  max: currentHigh.current, 
                  exclude: currentGuess
                }
                );
                setCurrentGuess(nextNumber);
                //setRounds(curRounds => curRounds + 1);
                setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
        }

    return (

        <View style={styles.screen}>
            <Text>Número que adivinó el oponente</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
            {/*<ScrollView contentContainerStyle={styles.list}>
                {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
            </ScrollView>*/}
            <FlatList 
               keyExtractor={(item) => item} 
               data={pastGuesses} 
               renderItem={renderListItem.bind(this, pastGuesses.length)}
               contentContainerStyle={styles.list} 
            />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '90%',
    },
    listContainer: {
        flex: 1,
        width: '60%'
    },
    list: {
        flexGrow: 1,
        //alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
});


export default GameScreen;