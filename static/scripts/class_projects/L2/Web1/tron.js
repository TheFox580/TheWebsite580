var posList = [];
var canvas;
var ctx;

const Direction = Object.freeze({
  UP: 0,
  LEFT: 1,
  DOWN: 2,
  RIGHT: 3,
  JUMP: 4,
  0: "Up",
  1: "Left",
  2: "Down",
  3: "Right",
  4: "Jump",
  "-1": "Undefined",
  text(number) {
    return this[number];
  },
});

class Player {
  #upKey;
  #leftKey;
  #downKey;
  #rightKey;
  #jumpKey;
  #startCoords;
  winCount;

  constructor(
    upKey = "z",
    leftKey = "q",
    downKey = "w",
    rightKey = "d",
    jumpKey = "e",
    name = "Player",
    color = new Color(0, 0, 0),
    position = [0, 0]
  ) {
    this.#upKey = upKey;
    this.#leftKey = leftKey;
    this.#downKey = downKey;
    this.#rightKey = rightKey;
    this.#jumpKey = jumpKey;
    this.name = name;
    this.currentDirection = Direction.RIGHT;
    this.lastNonJumpDirection = Direction.RIGHT;
    this.directionList = [];
    this.color = color;
    this.position = position;
    this.#startCoords = position;
    this.winCount = 0;
    this.roundWinCount = 0;
    this.dead = false;
  }

  getDirectionFromKeyPress(key) {
    if (key === this.#upKey) {
      return Direction.UP;
    } else if (key === this.#leftKey) {
      return Direction.LEFT;
    } else if (key === this.#downKey) {
      return Direction.DOWN;
    } else if (key === this.#rightKey) {
      return Direction.RIGHT;
    } else if (key === this.#jumpKey) {
      return Direction.JUMP;
    }
    return -1;
  }

  addDirection(direction) {
    this.directionList.push(direction);
  }

  updateDirection() {
    if (this.directionList.length > 0) {
      var newDirection = this.directionList.shift();
      if (newDirection !== -1) {
        if (newDirection != Direction.JUMP) {
          if (isValidInput(this.lastNonJumpDirection, newDirection)) {
            this.currentDirection = newDirection;
            this.lastNonJumpDirection = newDirection;
          }
        } else {
          this.currentDirection = newDirection;
        }
      }
    } else if (this.currentDirection == Direction.JUMP) {
      this.currentDirection = this.lastNonJumpDirection;
    }
  }

  getCurrentDirection() {
    return this.currentDirection;
  }

  moveKeys() {
    return [
      this.#upKey,
      this.#leftKey,
      this.#downKey,
      this.#rightKey,
      this.#jumpKey,
    ];
  }

  getCurrentPosition() {
    return {
      x: this.position[0],
      y: this.position[1],
    };
  }

  setNewPosition(position = { x: 0, y: 0 }) {
    this.position = [position.x, position.y];
  }

  getNonJumpDirection() {
    return this.lastNonJumpDirection;
  }

  newKey(direction, newKey) {
    if (direction === Direction.UP) {
      this.#upKey = newKey;
    } else if (direction === Direction.LEFT) {
      this.#leftKey = newKey;
    } else if (direction === Direction.DOWN) {
      this.#downKey = newKey;
    } else if (direction === Direction.RIGHT) {
      this.#rightKey = newKey;
    } else if (direction === Direction.JUMP) {
      this.#jumpKey = newKey;
    } else {
      console.log("This direction does not exist");
    }
  }

  resetPlayer() {
    this.position = this.#startCoords;
    this.currentDirection = Direction.RIGHT;
    this.lastNonJumpDirection = Direction.RIGHT;
    this.directionList = [];
    this.dead = false;
  }

  setColour(colour) {
    this.color = new Color(
      parseInt(colour[0]),
      parseInt(colour[1]),
      parseInt(colour[2])
    );
  }
}

class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

function drawCanvas() {
  let startButton = document.getElementById("start");
  if (startButton.disabled) {
    ctx.lineWidth = 1;
    for (player of playerList) {
      player.updateDirection();
      drawPlayerRect(player);
      movePlayer(player);
      drawPlayerArc(player);
    }

    for (player of playerList) {
      for (pos of posList) {
        if (
          (pos.x === player.getCurrentPosition().x &&
            pos.y === player.getCurrentPosition().y) ||
          player.getCurrentPosition().x <= -1 ||
          player.getCurrentPosition().x >= 80 ||
          player.getCurrentPosition().y <= -1 ||
          player.getCurrentPosition().y >= 60
        ) {
          player.dead = true;
        }
      }
    }

    updateScore();

    setTimeout(() => {
      window.requestAnimationFrame(drawCanvas);
    }, 100); // Vitesse du jeu, plus petit = plus rapide (max(1, valeur entrée))
  }
}

function updateScore() {
  let alive = 0;
  let gameOver = false;
  for (player of playerList) {
    if (!player.dead) {
      alive++;
    }
  }

  if (alive === 1) {
    for (let index = 0; index < playerList.length; index++) {
      const player = playerList[index];

      player.updateDirection();
      drawPlayerRect(player);
      movePlayer(player);
      drawPlayerArc(player);

      if (!player.dead) {
        player.roundWinCount++;
        if (player.roundWinCount === 3) {
          player.winCount++;
          player.roundWinCount = 0;
          gameOver = true;

          let score = document.getElementById(`p${index + 1}_score`);
          score.textContent = String(player.winCount);
        }
      } else {
        alert(player.name + " est mort");
      }
    }

    if (gameOver) {
      let startButton = document.getElementById("start");
      startButton.disabled = false;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    posList = [];
    for (player of playerList) {
      player.resetPlayer();
    }
  } else if (alive === 0) {
    for (player of playerList) {
      player.updateDirection();
      drawPlayerRect(player);
      movePlayer(player);
      drawPlayerArc(player);
    }

    alert("égalité! Tous les joueurs sont morts");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    posList = [];
    for (player of playerList) {
      player.resetPlayer();
    }
  }
}

function isValidInput(currentDirection, nextDirection) {
  if (currentDirection == Direction.UP && nextDirection == Direction.DOWN) {
    return false;
  } else if (
    currentDirection == Direction.LEFT &&
    nextDirection == Direction.RIGHT
  ) {
    return false;
  } else if (
    currentDirection == Direction.DOWN &&
    nextDirection == Direction.UP
  ) {
    return false;
  } else if (
    currentDirection == Direction.RIGHT &&
    nextDirection == Direction.LEFT
  ) {
    return false;
  }
  return true;
}

function movePlayer(player = new Player()) {
  let currentPos = player.getCurrentPosition();
  let nextPos = structuredClone(currentPos);
  let direction = player.getCurrentDirection();
  let isJump = false;
  if (direction === Direction.JUMP) {
    isJump = true;
    direction = player.getNonJumpDirection();
  }
  switch (direction) {
    case Direction.UP:
      nextPos.y--;
      nextPos.y -= Number(isJump);
      break;
    case Direction.LEFT:
      nextPos.x--;
      nextPos.x -= Number(isJump);
      break;
    case Direction.DOWN:
      nextPos.y++;
      nextPos.y += Number(isJump);
      break;
    case Direction.RIGHT:
      nextPos.x++;
      nextPos.x += Number(isJump);
      break;
  }
  if (!player.dead) {
    player.setNewPosition(nextPos);
    posList.push(currentPos);
  }
}

function drawPlayerArc(player) {
  ctx.fillStyle = `rgb(${player.color.r}, ${player.color.g}, ${player.color.b})`;
  ctx.beginPath();
  let x = player.getCurrentPosition().x * 10;
  let y = player.getCurrentPosition().y * 10;
  let dir = player.getCurrentDirection();
  switch (dir) {
    case Direction.RIGHT:
      ctx.arc(x, y + 5, 5, 0, 2 * Math.PI);
      ctx.fill();
      break;
    case Direction.UP:
      ctx.arc(x + 5, y + 10, 5, 0, 2 * Math.PI);
      ctx.fill();
      break;
    case Direction.DOWN:
      ctx.arc(x + 5, y, 5, 0, 2 * Math.PI);
      ctx.fill();
      break;

    case Direction.LEFT:
      ctx.arc(x + 10, y + 5, 5, 0, 2 * Math.PI);
      ctx.fill();
      break;
  }
}

function drawPlayerRect(player) {
  ctx.fillStyle = `rgb(${player.color.r}, ${player.color.g}, ${player.color.b})`;
  ctx.fillRect(
    player.getCurrentPosition().x * 10,
    player.getCurrentPosition().y * 10,
    10,
    10
  );
}

let player1 = new Player(
  "z",
  "q",
  "w",
  "d",
  "e",
  "Player 1",
  new Color(0, 0, 255),
  [1, 28]
);

let player2 = new Player(
  "o",
  "k",
  ";",
  "m",
  "p",
  "Player 2",
  new Color(255, 0, 0),
  [1, 30]
);

var playerList = [player1, player2];

document.addEventListener(
  "DOMContentLoaded",
    () => {

    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-4.0.0.min.js'; // Check https://jquery.com/ for the current version
    document.getElementsByTagName('head')[0].appendChild(script);

    //$(function () {
    //  $("#settings").dialog({
    //    autoOpen: false,
    //    resizable: false,
    //    modal: true,
    //    width: "600px",
    //  });
    //});

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    document.addEventListener(
      "keypress",
      (event) => {
        var key = event.key;
        if (player1.moveKeys().includes(key)) {
          var newDir = player1.getDirectionFromKeyPress(key);
          player1.addDirection(newDir);
        } else if (player2.moveKeys().includes(key)) {
          newDir = player2.getDirectionFromKeyPress(key);
          player2.addDirection(newDir);
        }
      },
      false
    );

    let startButton = document.getElementById("start");

    startButton.addEventListener(
      "click",
      () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        posList = [];
        for (player of playerList) {
          player.resetPlayer();
        }
        startButton.disabled = true;
        setTimeout(() => {
          window.requestAnimationFrame(drawCanvas);
        }, 100);
      },
      false
    );

    let updatePLayerSettingsButton = document.getElementById(
      "updateSettingsButton"
    );

    updatePLayerSettingsButton.addEventListener(
      "click",
      () => {
        let playerSettings = document.getElementById("PlayerSettings");
        for (playerSetting of playerSettings.children) {
          let player = playerList[parseInt(playerSetting.id[1]) - 1];

          player.newKey(
            Direction.UP,
            playerSetting.children["Forward"].children[1].value
          );

          player.newKey(
            Direction.DOWN,
            playerSetting.children["Down"].children[1].value
          );

          player.newKey(
            Direction.LEFT,
            playerSetting.children["Left"].children[1].value
          );

          player.newKey(
            Direction.RIGHT,
            playerSetting.children["Right"].children[1].value
          );

          player.newKey(
            Direction.JUMP,
            playerSetting.children["Jump"].children[1].value
          );

          player.name = playerSetting.children["Name"].children[1].value;
          for (playerName of document.getElementsByClassName(
            "p" + playerSetting.id[1] + "_name"
          )) {
            playerName.textContent = player.name;
          }
        }
      },
      false
    );

    let p1_coulour = document.getElementById("p1_colour");

    for (let i = 0; i < p1_coulour.children.length; i++) {
      let button = p1_coulour.children[i];
      button.addEventListener("click", () => {
        let style = window.getComputedStyle(button);
        let colour = style.getPropertyValue("background-color");
        player1.setColour(colour.slice(4, colour.length - 1).split(","));

        let idopposite =
          button.id.slice(0, 1) + "2" + button.id.slice(2, button.id.length);
        let opposite = document.getElementById(idopposite);
        opposite.disabled = true;
      });
    }

    let p2_coulour = document.getElementById("p2_colour");

    for (let i = 0; i < p2_coulour.children.length; i++) {
      let button = p2_coulour.children[i];
      button.addEventListener("click", () => {
        let style = window.getComputedStyle(button);
        let colour = style.getPropertyValue("background-color");
        player2.setColour(colour.slice(4, colour.length - 1).split(","));

        let idopposite =
          button.id.slice(0, 1) + "1" + button.id.slice(2, button.id.length);
        let opposite = document.getElementById(idopposite);
        opposite.disabled = true;
      });
    }

    //let settingsButton = $("#settings_button")[0];
    //settingsButton.addEventListener(
    //  "click",
    //  () => {
    //    $("#settings")
    //      .dialog({
    //        autoOpen: false,
    //        resizable: false,
    //        modal: true,
    //        width: "600px",
    //      })
    //      .dialog("open");
    //  },
    //  false
    //);
  },
  false
);
