async function getStreams() {
  await fetch("http://localhost:3001/data", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
  })
    .then((res) => res.json())
    .then((res) => {
      let resCopy = res.slice();
      console.log(resCopy);

      document.getElementById("thumbnail-url").innerHTML = resCopy[0].data
        .map(
          (stream) =>
            "<li>" +
            `<img src=${stream.thumbnail_url
              .replace("{width}", 1000)
              .replace("{height}", 1000)} />` +
            "</li>"
        )
        .join("");

      document.getElementById("container").innerHTML = resCopy[0].data
        .map(
          (stream) =>
            "<li>" +
            `<a href=${
              "https://www.twitch.tv/" + stream.user_login
            } target="_blank">${stream.user_login}</a>` +
            "</li>"
        )
        .join("");

      document.getElementById("container2").innerHTML = resCopy[0].data
        .map((stream) => "<li>" + stream.game_name + "</li>")
        .join("");

      document.getElementById("container3").innerHTML = resCopy[0].data
        .map((stream) => "<li>" + stream.viewer_count + "</li>")
        .join("");
    });
}

getStreams();

async function getGamesTop() {
  fetch("http://localhost:3001/data-games", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
  })
    .then((res) => res.json())
    .then((res) => {
      let resCopy = res.slice();
      console.log(resCopy);

      // let img = "<img />";

      document.getElementById("container4").innerHTML = resCopy[0].data
        .map(
          (stream) =>
            "<li>" +
            `<img src=${stream.box_art_url
              .replace("{width}", 1000)
              .replace("{height}", 1000)} />` +
            "</li>"
        )
        .join("");

      document.getElementById("container5").innerHTML = resCopy[0].data
        .map((stream) => "<li>" + stream.name + "</li>")
        .join("");

      document.getElementById("container6").innerHTML = resCopy[0].data
        .map((stream) => "<li>" + stream.id + "</li>")
        .join("");
    });
}

getGamesTop();

function refresh() {
  getStreams();
  getGamesTop();
}

const refreshBtn = document.getElementById("refresh-btn");
refreshBtn.addEventListener("click", refresh);
