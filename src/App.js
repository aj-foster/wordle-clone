import React, { useCallback, useMemo } from "react";
import { useKey } from "react-use";
import { Board } from "./components/Board";
import { Button } from "./components/Button";
import {
  chooseWord,
  emptyBoard,
  isLetterKey,
  STATE,
  useStateAndRef
} from "./util";

export default function App() {
  const [status, statusRef, setStatus] = useStateAndRef(STATE.PLAY);
  const startingWord = useMemo(chooseWord, []);
  const [word, wordRef, setWord] = useStateAndRef(startingWord);
  const [board, boardRef, setBoard] = useStateAndRef(emptyBoard());

  const [activeRow, activeRowRef, setActiveRow] = useStateAndRef(0);
  const [, activeTileRef, setActiveTile] = useStateAndRef(0);

  const startGame = useCallback(() => {
    setBoard(emptyBoard());
    setWord(chooseWord());
    setActiveRow(0);
    setActiveTile(0);
    setStatus(STATE.PLAY);
  }, [setActiveRow, setActiveTile, setBoard, setStatus, setWord]);

  const typeForward = useCallback(
    (event) => {
      if (
        statusRef.current === STATE.PLAY &&
        activeRowRef.current < 6 &&
        activeTileRef.current < 5
      ) {
        setBoard((board) => {
          const newBoard = board.map((row) => [...row]);
          newBoard[activeRowRef.current][activeTileRef.current] = event.key;
          return newBoard;
        });

        setActiveTile((i) => i + 1);
      }
    },
    [activeRowRef, activeTileRef, setActiveTile, setBoard, statusRef]
  );

  const typeBackward = useCallback(
    (event) => {
      if (
        statusRef.current === STATE.PLAY &&
        activeRowRef.current < 6 &&
        activeTileRef.current > 0
      ) {
        setBoard((board) => {
          const newBoard = board.map((row) => [...row]);
          newBoard[activeRowRef.current][activeTileRef.current - 1] = "";
          return newBoard;
        });

        setActiveTile((i) => i - 1);
      }
    },
    [activeRowRef, activeTileRef, setActiveTile, setBoard, statusRef]
  );

  const submitGuess = useCallback(() => {
    if (statusRef.current === STATE.PLAY && activeTileRef.current === 5) {
      const guess = boardRef.current[activeRowRef.current].join("");

      if (guess === wordRef.current) {
        setStatus(STATE.WON);
      } else if (activeRowRef.current === 5) {
        setStatus(STATE.LOST);
      } else {
        setActiveRow((i) => i + 1);
        setActiveTile(0);
      }
    }
  }, [
    activeRowRef,
    activeTileRef,
    boardRef,
    setActiveRow,
    setActiveTile,
    setStatus,
    statusRef,
    wordRef
  ]);

  // Warning: this hook closes current state into the callback function.
  useKey(isLetterKey, typeForward);
  useKey("Backspace", typeBackward);
  useKey("Enter", submitGuess);

  return (
    <div className="App text-center">
      <h1 className="my-8 text-3xl text-gray-300">Wordle Clone for Fun</h1>
      <Board activeRow={activeRow} board={board} status={status} word={word} />
      <p className="my-4">
        <Button status={status} startGame={startGame} word={word} />
      </p>
    </div>
  );
}
