import React, { useEffect, useState } from 'react';
import './style.scss';
import Landing from './components/Landing';
import GameLoop from './components/GameLoop';
import Scoreboard from './components/Scoreboard';
import BlinkyWGun from "./assets/BlinkyGun.svg";
import StinkyWGun from "./assets/StinkyGun.svg";
import Blinky from "./assets/Blinky.svg";
import Stinky from "./assets/Stinky.svg";
import BlankBullet from "./assets/BlankBullet.svg";
import DefaultBullet from "./assets/DefaultBullet.svg";
import LiveBullet from "./assets/LiveBullet.svg";
import FiredBullet from "./assets/FiredBullet.svg";

function App() {
  const [gameState, setGameState] = useState(3);
  const [score, setScore] = useState(0);

  const startGame = () => {
    setGameState(1);
  }

  useEffect(() => {
    const imagesToLoad = [
      BlinkyWGun, StinkyWGun, Blinky, Stinky, BlankBullet,
      DefaultBullet, LiveBullet, FiredBullet
    ];

    const cacheImages = async(imgArray) => {
      const promises = await imgArray.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve();
          img.onerror = reject();
        });
      });

      await Promise.all(promises);
      setGameState(0);
    }

    cacheImages(imagesToLoad);
  }, [])

  switch (gameState) {
    case 0:
      return (<Landing startGame={startGame}/>);  
    case 1:
      return (<GameLoop setGameState={setGameState} score={score} setScore={setScore}/>);
    case 2:
      return (<Scoreboard gameState={gameState} setGameState={setGameState} score={score} setScore={setScore}/>);
    default:
      return (
        <div className='loading-page'>
          Loading...
        </div>
      )
  }
}

export default App;
