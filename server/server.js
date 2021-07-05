const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const fetch = require("node-fetch");
const http = require("http").createServer(app);

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  console.log(require("dotenv").config());
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

http.listen(process.env.PORT || 3001, function () {
  console.log("listening on *:3001");
});

let data = [];
let dataGames = [];

async function fetchStreams() {
  await fetch("https://api.twitch.tv/helix/streams", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "client-id": process.env.TWITCH_CLIENT_ID,
      Authorization: process.env.TWITCH_ACCESS_TOKEN,
    },
    mode: "cors",
  })
    .then((res) => res.json())
    // .then((res) => console.log(res))
    .then((res) => data.push(res))
    .catch(function (error) {
      console.log.warn(error);
    });
}

fetchStreams();

app.get("/data", function (req, res) {
  res.send(data);
});

async function fetchGamesTop() {
  await fetch("https://api.twitch.tv/helix/games/top", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "client-id": process.env.TWITCH_CLIENT_ID,
      Authorization: process.env.TWITCH_ACCESS_TOKEN,
    },
    mode: "cors",
  })
    .then((res) => res.json())
    // .then((res) => console.log(res))
    .then((res) => dataGames.push(res))
    .catch(function (error) {
      console.log.warn(error);
    });
}

fetchGamesTop();

app.get("/data-games", function (req, res) {
  res.send(dataGames);
});
