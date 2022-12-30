import React, { useState, useEffect, useRef } from "react";
import Bullet from "./Bullet";
import Player from "./Player";

const GameLoop = (props) => {
  // states
  const [liveBulletIndex, setLiveBulletIndex] = useState(0)
  const [currentBullet, setCurrentBullet] = useState(0);
  const [rollState, setRollState] = useState("resting"); 
  const [roundStarted, setRoundStarted] = useState(false);
  const [ableToPass, setAbleToPass] = useState(false);
  const [turn, setTurn] = useState("stinky");
  const [dead, setDead] = useState(false);
  const [msg, setMsg] = useState();
  const [rollsThisTurn, setRollsThisTurn] = useState(1);

  const currentBulletRef = useRef(currentBullet);
  const setCurrentBulletRef = (data) => {currentBulletRef.current = data;}
  const liveBulletIndexRef = useRef(liveBulletIndex);
  const setliveBulletIndexRef = (data) => {liveBulletIndexRef.current = data;}

  // standard functions
  const setRollStateRolling = () => {setRollState("rolling");}
  const setRollStateHidden = () => {setRollState("hidden");}
  const setRollStateFlash = () => {setRollState("flash");}
  const setRollStateResting = () => {setRollState("resting");}
  const setTurnBlinky = () => {setTurn("blinky");}
  const setTurnStinky = () => {setTurn("stinky");}
  const timer = ms => new Promise(res => setTimeout(res, ms));
  const setMsgDefault = () => {setMsg("Roll to begin this round!");}
  const setMsgBlinkyTurn = () => {setMsg("It's Blinky's turn.");}
  const setMsgStinkyTurn = () => {setMsg("It's Stinky's turn");}

  const handleRoll = async () => {
    setCurrentBullet(0);
    setCurrentBulletRef(0);
    let rollNum = 2 + Math.floor(Math.random() * 50 + 10 * props.score);
    let hideNum = rollNum - Math.floor(Math.random() * rollNum);

    setRollStateRolling();
    for (let count = 0; count < rollNum; count ++) {
      setLiveBulletIndex(count % 6);
      setliveBulletIndexRef(count % 6);
      if (count === hideNum)
        setRollStateHidden();
      if (count === rollNum - 2)
        setRollStateFlash();
      if (count === rollNum - 1) 
        setRollStateResting();
      await timer(350 / rollsThisTurn);
      if (count === rollNum - 1)
        setRoundStarted(true);
    }

    setRollsThisTurn(rollsThisTurn + 1);
  }

  // eslint-disable-next-line 
  const checkState = () => {
    console.log(`live is ${liveBulletIndex}`);
    console.log(`current is ${currentBullet}`);
    console.log(`current bullet ref is ${currentBulletRef.current}`);
  }

  const handleShoot = () => {
    if (currentBulletRef.current >= liveBulletIndexRef.current) {
      setDead(true);
    } else {
      setCurrentBulletRef(currentBulletRef.current + 1);
      setCurrentBullet(currentBulletRef.current);
    }

    if (ableToPass === false)
      setAbleToPass(true);
  }

  useEffect(() => {
    const blinkyPlay = async() => {
      let blinkyChance = Math.floor(Math.random() * 100);

      // roll chance
      if (currentBulletRef.current === liveBulletIndexRef.current) {
        if (blinkyChance > 40) 
          await handleRoll();
      } else {
        if (blinkyChance > 90)
          await handleRoll();
      }

      await timer(1500);
      handleShoot();
      
      // blinky shoots more than once chance
      for (let count = 0; count < 3; count ++) {
        blinkyChance = Math.floor(Math.random() * 100);
        if (blinkyChance > (70 + 10 * count)) {
          handleShoot();
          await timer(150);
        } else {
          break;
        }
      }
      
      await timer(500);
      setTurnStinky();
    }

    if (turn === "blinky") {
      setMsgBlinkyTurn();
      blinkyPlay();
      setAbleToPass(false);
      setRollsThisTurn(1);    
    }

    if (turn === "stinky") {
      setMsgStinkyTurn();
    }
    // eslint-disable-next-line 
  }, [turn])

  useEffect(() => {
    if (dead === true) {
      if (turn === "stinky")
        props.setGameState(2);
      else if (turn === "blinky")
        props.setScore(props.score + 1);
    }
    // eslint-disable-next-line 
  }, [dead])

  useEffect(() => {
    setMsgDefault();
  }, [])

  useEffect(() => {
    if (roundStarted === true)
      setMsg();
    else 
      setMsgDefault();
  }, [roundStarted])


  if (!dead) {
    return (
      <div className="gameloop">
        <button onClick={() => {
          props.setGameState(0);
          props.setScore(0);
        }}>Back to start</button>
        <div className="score">Score: {props.score}</div>
        <div><Player turn={turn} dead={dead}/></div>
        <div><Bullet bulletId={0} liveBulletIndex={liveBulletIndex} current={currentBullet} rollState={rollState}/></div>
        <div><Bullet bulletId={1} liveBulletIndex={liveBulletIndex} current={currentBullet} rollState={rollState}/></div>
        <div><Bullet bulletId={2} liveBulletIndex={liveBulletIndex} current={currentBullet} rollState={rollState}/></div>
        <div><Bullet bulletId={3} liveBulletIndex={liveBulletIndex} current={currentBullet} rollState={rollState}/></div>
        <div><Bullet bulletId={4} liveBulletIndex={liveBulletIndex} current={currentBullet} rollState={rollState}/></div>
        <div><Bullet bulletId={5} liveBulletIndex={liveBulletIndex} current={currentBullet} rollState={rollState}/></div>
        <button onClick={handleShoot} disabled={!roundStarted || !(rollState === "resting") || turn === "blinky"}>Shoot</button>
        <button onClick={handleRoll} disabled={!(rollState === "resting") || turn === "blinky"}>Roll</button>
        {/* <button onClick={checkState}>Debug</button> */}
        <button onClick={setTurnBlinky} disabled={!ableToPass}>Pass</button>
        <p>{msg}</p>
      </div>
    );
  } else {
    return (
      <div className="gameloop">
        <h1>Blinky died</h1>
        <div><Player turn="blinky-died"/></div>
        <p>But Blinky got better</p>
        <p>And Blinky demands a rematch!</p>
        <button onClick={() => {
          setDead(false);
          setRoundStarted(false);
          setCurrentBullet(0);
          setCurrentBulletRef(0);
        }}>Accept rematch</button>
        <button onClick={() => {
          props.setGameState(2);
        }}>Refuse rematch</button>
        <button onClick={() => {
          props.setGameState(0);
          props.setScore(0);
        }}>Back to start</button>
      </div>
    )
  }
}

export default GameLoop;