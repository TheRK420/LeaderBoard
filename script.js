let players = [];

function addPlayer() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const country = document.getElementById("country").value;
  const score = parseInt(document.getElementById("score").value);
  const creationDate = new Date().toLocaleString();

  if (firstName && lastName && country && !isNaN(score)) {
    const player = { firstName, lastName, country, score, creationDate };
    players.push(player);

    updateTable();
  } else {
    alert("Please enter valid player details.");
  }
}

function updateTable() {
  const tableBody = document.querySelector("#scoreTable tbody");
  tableBody.innerHTML = "";

  players.sort((a, b) => b.score - a.score);

  players.forEach((player) => {
    const row = tableBody.insertRow();

    row.insertCell().innerHTML = `
<div>
  <strong>${player.firstName} ${player.lastName}</strong>
  <br>
  <span style="font-size: 0.8em;">Created: ${player.creationDate}</span>
</div>
`;

    row.insertCell().textContent = player.country;
    row.insertCell().textContent = player.score;

    const actionsCell = row.insertCell();
    actionsCell.innerHTML = `
<button onclick="adjustScore('${player.firstName}', 5)">+5</button>
<button onclick="adjustScore('${player.firstName}', -5)">-5</button>
<button onclick="deletePlayer('${player.firstName}')">Delete</button>
`;
  });
}

function adjustScore(firstName, points) {
  const player = players.find((p) => p.firstName === firstName);

  if (player) {
    player.score += points;
    updateTable();
  }
}

function deletePlayer(firstName) {
  players = players.filter((player) => player.firstName !== firstName);
  updateTable();
}
