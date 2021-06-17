fetch("http://localhost:3001/data", {
  method: "GET",
  headers: { "Content-Type": "application/json" },
  mode: "cors",
})
  .then((res) => res.json())
  .then((res) => {
    let resCopy = res.slice();
    console.log(resCopy);

    document.getElementById("container").innerHTML = resCopy[0].data
      .map((stream) => "<li>" + stream.user_login + "</li>")
      .join("");

    document.getElementById("container2").innerHTML = resCopy[0].data
      .map((stream) => "<li>" + stream.game_name + "</li>")
      .join("");

    document.getElementById("container3").innerHTML = resCopy[0].data
      .map((stream) => "<li>" + stream.viewer_count + "</li>")
      .join("");
  });

fetch("http://localhost:3001/data-games", {
  method: "GET",
  headers: { "Content-Type": "application/json" },
  mode: "cors",
})
  .then((res) => res.json())
  .then((res) => {
    let resCopy = res.slice();
    console.log(resCopy);

    let img = "<img />";

    document.getElementById("container4").innerHTML = resCopy[0].data
      .map(
        (stream) =>
          "<li>" +
          `<img src=${stream.box_art_url
            .replace("{width}", 60)
            .replace("{height}", 60)} />` +
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
