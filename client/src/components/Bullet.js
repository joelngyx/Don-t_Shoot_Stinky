import React, { useEffect, useState } from "react";
import BlankBullet from "../assets/BlankBullet.svg";
import DefaultBullet from "../assets/DefaultBullet.svg";
import LiveBullet from "../assets/LiveBullet.svg";
import FiredBullet from "../assets/FiredBullet.svg";

const Bullet = (props) => {
  const [bulletState, setBulletState] = useState("default");
  
  useEffect(() => {
    if (props.rollState === "resting" || (props.rollState === "rolling" && props.liveBulletIndex !== props.bulletId))
      setBulletState("default");
    else if (props.rollState === "rolling" && props.liveBulletIndex === props.bulletId)
      setBulletState("live");
    else if (props.rollState === "hidden")
      setBulletState("blank");
    else if (props.rollState === "flash")
      setBulletState("live");
      // eslint-disable-next-line 
  }, [props.liveBulletIndex, props.rollState]);

  useEffect(() => {
    if (props.current > props.bulletId) 
      setBulletState("fired");
      // eslint-disable-next-line 
  }, [props.current]);

  switch (bulletState) {
    case "live":
      return (<img className="bulletImg" src={LiveBullet} alt="live-bullet"/>);
    case "default":
      return (<img className="bulletImg" src={DefaultBullet} alt="default-bullet"/>);
    case "blank":
      return (<img className="bulletImg" src={BlankBullet} alt="blank-bullet"/>);
    case "fired":
      return (<img className="bulletImg" src={FiredBullet} alt="fired-bullet"/>);
    default:
      return (<h1>Error</h1>)
  }
}

export default Bullet;

