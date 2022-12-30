const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5500;

app.use(cors());
app.use(express.json());

const pgp = require("pg-promise")();
const db = pgp("postgres://liklfhpf:nryPSAifMSFRzT8IqX7Zwm0B4d6ZmtLs@tiny.db.elephantsql.com/liklfhpf");

app.route("/scoreboard")
	.post(async (req, res) => {
		try {
			console.log(req.body);

			const {player_name, score} = req.body;
			const newEntry = await db.query(
				"INSERT INTO scoreboard(player_name, score) VALUES($1, $2);", 
				[player_name, score]
			);

			res.json({received : "true"});
		} catch (e) {
			console.log(e.message);
		}
	}
);

app.route("/scoreboard")
  .get(async (req, res) => {
    try {
      console.log("request received");

      const resultEntries = await db.query(
        "SELECT player_name, score FROM scoreboard ORDER BY score DESC LIMIT 5;"
      )

      res.json(resultEntries);
    } catch (e) {
      console.log(e.message);
    }
  }
);

app.listen(PORT, () => {
  console.log("Server running on port 5500");
});
