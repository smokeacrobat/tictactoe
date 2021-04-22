import React, {useState} from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  const [gameState, setGameState] = useState([
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ]);
  const [currentPlayer, setCurrentPalyer] = useState(1);

  
  const initializeGame = () => {
    setGameState([
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ])
    setCurrentPalyer(1);
  }

  const getWinner = () => {
    const numtiles = 3;
    var sum;
    for (var i=0; i<3; i++){
      sum=gameState[i][0]+gameState[i][1]+gameState[i][2];
      if (sum===3){return 1;}
      else if (sum===-3){return -1;}

    }

    for (var j=0; j<3; j++){
      sum=gameState[0][j]+gameState[1][j]+gameState[2][j];
      if (sum===3){return 1;}
      else if (sum===-3){return -1;}
    }

    sum=gameState[0][0]+gameState[1][1]+gameState[2][2];
    if (sum===3){return 1;}
    else if (sum===-3){return -1;}

    return 0;

  }

  const onTilePress = (row, col) => {
    // Dont allow tiles to change
    var value = gameState[row][col];
    if (value!==0){
      return;
    }

    var currPlayer = currentPlayer;

    // Set the correct tile
    var array = gameState.slice();
    array[row][col] = currPlayer;
    setGameState(array);

    //Switch player
    var nextPlayer = currPlayer == 1 ? -1: 1;
    setCurrentPalyer(nextPlayer);

    //Check Winners
    var winner = getWinner();
    if(winner==1){
      alert("Player 1 is the winner")
      initializeGame();
    }
    else if(winner==-1){
      alert("Player 2 is the winner")
      initializeGame();
    }
  }

  const renderIcon = (row, col) => {
    var value = gameState[row][col];
    switch (value){
      case 1: 
        return <Text style={styles.input}> X </Text>;
      case -1:
      return <Text style={styles.input}> O </Text>;
      default: return <View />;
    }
  }

  return (
    <View style={styles.container}>
    <Text style={{textAlign:"center", fontSize: 30, fontWeight: "bold"}}>Tic Tac Toe</Text>
    
    <View >
      <View style={styles.row}>
        <TouchableOpacity style={styles.box} onPress={onTilePress.bind(this, 0, 0)} > {renderIcon(0,0)} </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={onTilePress.bind(this, 0, 1)} > {renderIcon(0,1)} </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={onTilePress.bind(this, 0, 2)} > {renderIcon(0,2)} </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.box} onPress={onTilePress.bind(this, 1, 0)} > {renderIcon(1,0)} </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={onTilePress.bind(this, 1, 1)} > {renderIcon(1,1)} </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={onTilePress.bind(this, 1, 2)} > {renderIcon(1,2)} </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.box} onPress={onTilePress.bind(this, 2, 0)} > {renderIcon(2,0)} </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={onTilePress.bind(this, 2, 1)} > {renderIcon(2,1)} </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={onTilePress.bind(this, 2, 2)} > {renderIcon(2,2)} </TouchableOpacity>
      </View>
      
    </View>
    <Button title="Start Game" style={{width: "50%"}} onPress={initializeGame} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
  },
  box: {
    borderWidth: 1,
    height: 80,
    width: 80,
  },
  input: {
    fontSize: 50,
    textAlign: "center"
  }
});
