import { STATE } from "../util";

export const Button = ({ status, startGame, word }) => {
  let buttonMessage;

  switch (status) {
    case STATE.PLAY:
      buttonMessage = "Game in Progress...";
      break;

    case STATE.WON:
      buttonMessage = "You Won! Play Again?";
      break;

    case STATE.LOST:
      buttonMessage = `The Word Was ${word}. Play Again?`;
      break;

    default:
      buttonMessage = "Unknown State";
  }

  return (
    <button
      className="bg-slate-700 p-4 rounded text-gray-300 hover:bg-slate-600 disabled:bg-slate-900"
      disabled={status === STATE.PLAY}
      onClick={startGame}
    >
      {buttonMessage}
    </button>
  );
};
