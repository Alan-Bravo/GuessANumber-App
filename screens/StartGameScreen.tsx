import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

const StartGameScreen = (props: any): JSX.Element => {

    const [enteredValue, setEnteredValue] = useState<string>('');
    const [confirmed, setConfirmed] = useState<boolean>(false);
    const [selectedNumber, setSelectedNumber] = useState<undefined | number>();

    const numberInputHandler = (inputText: any): void => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }

    const resetInputHandler = (): void => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = (): void => {
        const chosenNumber = parseInt(enteredValue);
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
            Alert.alert(
                'Número inválido!', 
                'El número tiene que ser entre 1 y 99', 
                [{text: 'Ok', style: 'destructive', onPress: resetInputHandler}]);
            return;
        }
        setConfirmed(true);
        setEnteredValue('');
        setSelectedNumber(chosenNumber);
        Keyboard.dismiss();
    }

    let confirmedOutPut: object | undefined;

    if(confirmed){
        confirmedOutPut = 
          <Card style={styles.summaryContainer}>
              <BodyText>Seleccionaste</BodyText>
              <NumberContainer>{selectedNumber}</NumberContainer>
              <MainButton onPress={() => props.onStartGame(selectedNumber)}>Comenzar</MainButton>
          </Card>
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
        <View style={styles.screen}>
            <TitleText style={styles.title}>Empezá un nuevo juego!</TitleText>
            <Card style={styles.inputContainer}>
                <BodyText>Seleccioná un número</BodyText>
                <Input style={styles.input} 
                       blurOnSubmit 
                       autoCapitalize='none' 
                       autoCorrect={false} 
                       keyboardType="number-pad" 
                       maxLength={2} 
                       onChangeText={numberInputHandler}
                       value={enteredValue}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="Resetear" onPress={resetInputHandler} color={Colors.accent}/>
                    </View>
                    <View style={styles.button}>
                        <Button title="Confirmar" onPress={confirmInputHandler} color={Colors.primary} />
                    </View>
                </View>
            </Card>
            {confirmedOutPut}
        </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold',
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100,
    },
    input: {
        width: 50,
        textAlign: 'center',
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    text: {
        fontFamily: 'open-sans'
    }
});


export default StartGameScreen;
