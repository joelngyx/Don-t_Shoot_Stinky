import React from "react";
import BlinkyWGun from "../assets/BlinkyGun.svg";
import StinkyWGun from "../assets/StinkyGun.svg";
import Blinky from "../assets/Blinky.svg";

const Player = (props) => {
  switch (props.turn) {
    case ("blinky"):
      return (<img className="playerImg" src={BlinkyWGun} alt="blinky's turn"/>);
    case ("stinky"):
      return (<img className="playerImg" src={StinkyWGun} alt="stinky's turn"/>);
    case ("blinky-died"):
      return (<img className="playerImg" src={Blinky} alt="blinky wants a rematch"/>);
    default:
      return (<h1>error</h1>)
  }
}

export default Player;