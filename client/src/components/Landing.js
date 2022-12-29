import React from "react";
import "../style.scss";
import Stinky from "../assets/Stinky.svg";

const Landing = (props) => {

  return (
    <div id="landingDiv">
      <div><h1>Don't Shoot Stinky</h1></div>
      <div><img src={Stinky} alt="stinky"></img></div>
      <div><button onClick={() => {props.startGame()}}>Start</button></div>
    </div>
  )
}

export default Landing;