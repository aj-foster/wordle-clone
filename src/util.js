import { useCallback, useRef, useState } from "react";
import { FIVE_LETTER_WORDS } from "./corpus";

export const STATE = {
  PLAY: "PLAY",
  WON: "WON",
  LOST: "LOST"
};

export const isLetterKey = (event) =>
  !event.ctrlKey && !event.metaKey && /^[a-zA-Z]$/.test(event.key);

export const chooseWord = () =>
  FIVE_LETTER_WORDS.sort(() => Math.random() - 0.5)
    .pop()
    .toLowerCase();

export const useStateAndRef = (value) => {
  const [valueState, setValueState] = useState(value);
  const valueRef = useRef(value);

  const setValue = useCallback((newValue) => {
    setValueState(newValue);

    if (typeof newValue === "function") {
      valueRef.current = newValue(valueRef.current);
    } else {
      valueRef.current = newValue;
    }
  }, []);

  return [valueState, valueRef, setValue];
};

export const emptyBoard = () => [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""]
];
