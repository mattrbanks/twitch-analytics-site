fetch("http://localhost:3001/data", {
  method: "GET",
  headers: { "Content-Type": "application/json" },
  mode: "cors",
})
  .then((res) => res.json())
  //   .then((res) => console.log(res))
  .then((res) => {
    // let userLogin = ["1", "2", "3", "4", "5", "6"];
    let resCopy = res.slice();
    console.log(resCopy);

    // let ul = document.createElement("ul");

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
