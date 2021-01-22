import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = (): object => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
}

export default function App(): JSX.Element {

  const [userNumber, setUserNumber] = useState<undefined | number | null>();
  const [guessRounds, setGuessRounds] = useState<number>(0);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  if(!dataLoaded){
    return (
      <AppLoading 
        startAsync={fetchFonts} 
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)} 
      />
    );
  }

  const configureNewGameHandler = (): void => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  const startGameHandler = (selectedNumber: number): void => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  }

  const gameOverHandler = (numOfRounds: number): void => {
    setGuessRounds(numOfRounds)
  }

  let content: object = <StartGameScreen onStartGame={startGameHandler} />

  if(userNumber && guessRounds <= 0){
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  } else if(guessRounds > 0) {
    content = (
      <GameOverScreen 
        roundsNumber={guessRounds} 
        userNumber={userNumber} 
        onRestart={configureNewGameHandler} 
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Adivina un número" />
      {content}

      <StatusBar style="auto" />
    </View>
  ); 
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
