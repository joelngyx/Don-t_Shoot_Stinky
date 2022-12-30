import React, { useState } from 'react';
import './style.scss';
import Landing from './components/Landing';
import GameLoop from './components/GameLoop';
import Scoreboard from './components/Scoreboard';

function App() {
  const [gameState, setGameState] = useState(0);
  const [score, setScore] = useState(0);

  const startGame = () => {
    setGameState(1);
  }

  switch (gameState) {
    case 0:
      return (<Landing startGame={startGame}/>);  
    case 1:
      return (<GameLoop setGameState={setGameState} score={score} setScore={setScore}/>);
    case 2:
      return (<Scoreboard gameState={gameState} setGameState={setGameState} score={score} setScore={setScore}/>);
    default:
      return (<h1>sum tin wong</h1>)
  }
}

export default App;
