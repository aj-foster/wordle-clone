import { STATE } from "../util";

export const Button = ({ status, startGame }) => {
  let buttonMessage;

  switch (status) {
    case STATE.PLAY:
      buttonMessage = "Game in Progress...";
      break;

    case STATE.WON:
      buttonMessage = "You Won! Play Again?";
      break;

    case STATE.LOST:
      buttonMessage = "Nice Try. Play Again?";
      break;

    default:
      buttonMessage = "Unknown State";
  }

  return (
    <button disabled={status === STATE.PLAY} onClick={startGame}>
      {buttonMessage}
    </button>
  );
};
