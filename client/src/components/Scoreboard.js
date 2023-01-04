import React, { useEffect, useState } from "react";

const Scoreboard = (props) => {
  const [name, setName] = useState("");
  const [highScores, setHighScores] = useState([]);
  const [submittedScore, setSubmittedScore] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const score = props.score;

  useEffect(() => {
    getHighScores();
    console.log(highScores);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getHighScores();
    console.log(highScores);
    // eslint-disable-next-line
  }, [submittedScore, props.gameState]);

  const postScore = async() => {
    if (name.replace(" ", "") === "") {
      setErrorMsg("Not a valid name!");
      return;
    }

    try {
      const body = {
        "player_name" : `${name}`, 
        "score" : score
      };

      const postScore = await fetch(
        "https://stinky-scoreboard.onrender.com/scoreboard", {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
        }
      );
      
      // eslint-disable-next-line
      const jsonData = await postScore.json();
      setSubmittedScore(true);
    } catch (e) {
      console.log(e.message);
    }
  }

  const getHighScores = async() => {
    try {
      fetch(
        "https://stinky-scoreboard.onrender.com/scoreboard", {
          method: "GET",
          headers: {"Accept" : "application/json"}
        }
      )
      .then(response => response.json())
      .then(response => {
        let temp = [];
        for (let i = 0; i < response.length; i ++)
          temp[i] = {key: i, playerName: response[i]["player_name"], playerScore: response[i]["score"]}
        setHighScores(temp);
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div className="scoreboard">
      <div className="scores">
        <div className="header-scores"><h1>High Scores</h1></div>
        <div>
          {highScores.map((item) => {
            return <div className="score-tile" key={item.key}>
              {item.playerName} score: {item.playerScore}</div>
          })}
        </div>
      </div>
      <h1>Your score: {props.score}</h1>
      <input placeholder="Provide your name" value={name} onChange={(e) => {
        setName(e.target.value);
        setErrorMsg();
        }}/>
      <div>{errorMsg}</div>
      <div><button onClick={postScore} disabled={submittedScore}>{submittedScore ? "Submitted!" : "Submit"}</button></div>
      <div><button onClick={() => {
        props.setGameState(0);
        props.setScore(0);
        }}>Back to start</button></div>
    </div>
  )
} 

export default Scoreboard;