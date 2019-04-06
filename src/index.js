import Fighter from "./Fighter";
import GameScreen from "./GameScreen";

import "./styles.css";

const GAME_HEIGHT = 600;
const GAME_WIDTH = 800;

const gameData = {
  height: GAME_HEIGHT,
  width: GAME_WIDTH
};

const river = new GameScreen(gameData);
const fighter = new Fighter(gameData);

// new InputHandler(fighter);

let lastTime = 0;

function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  // river.ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  river.update();
  fighter.update(deltaTime);
  fighter.draw(river.ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
