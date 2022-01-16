import React, { useCallback, useRef, useState } from "react";
import { Board } from "./components/Board";
import { FIVE_LETTER_WORDS } from "./corpus";
import "./styles.css";

export default function App() {
  const [status, setStatus] = useState("WAIT");
  const [word, setWord] = useState("");
  const [activeRow, setActiveRow] = useState(-1);

  const formRef = useRef();

  const startGame = useCallback(() => {
    const newWord = FIVE_LETTER_WORDS.sort(() => Math.random() - 0.5)
      .pop()
      .toLowerCase();
    setWord(newWord);
    setActiveRow(0);
    setStatus("PLAY");
  }, []);

  const makeGuess = useCallback(
    (guess) => {
      if (guess.length !== 5) {
        return;
      }

      if (guess === word) {
        console.log("Winner!");
        setStatus("WON");
        setActiveRow(6);
        return;
      }

      if (activeRow === 5) {
        setStatus("LOST");
        console.log("Sorry");
      }

      setActiveRow((row) => row + 1);
    },
    [activeRow, word]
  );

  return (
    <div className="App">
      <h1>Wordle Clone for Fun</h1>
      <form ref={formRef}>
        <Board activeRow={activeRow} makeGuess={makeGuess} word={word} />
      </form>
      <p>
        <button disabled={status === "PLAY"} onClick={startGame}>
          Start Game
        </button>
      </p>
    </div>
  );
}
