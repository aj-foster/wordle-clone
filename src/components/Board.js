import React, { useCallback, useMemo, useRef, useState } from "react";

export const Board = ({ activeRow, makeGuess, word }) => {
  return (
    <div className="board">
      {Array(6)
        .fill(null)
        .map((_, index) => (
          <Row
            key={`row-${index}`}
            active={activeRow === index}
            letters="ABCDE"
            makeGuess={makeGuess}
            rowIndex={index}
            word={word}
          />
        ))}
    </div>
  );
};

export const Row = ({ active, letters, makeGuess, rowIndex, word }) => {
  const tile1 = useRef();
  const tile2 = useRef();
  const tile3 = useRef();
  const tile4 = useRef();
  const tile5 = useRef();

  const tiles = useMemo(() => [tile1, tile2, tile3, tile4, tile5], [
    tile1,
    tile2,
    tile3,
    tile4,
    tile5
  ]);

  const inputHandler = useCallback(
    (event, index) => {
      if (event.target.value.length > 0) {
        tiles[Math.min(index + 1, 4)].current.focus();
      }
    },
    [tiles]
  );

  const keydownHandler = useCallback(
    (event, index) => {
      if (event.ctrlKey || event.metaKey) {
        return;
      }

      switch (event.key) {
        case "Enter":
          event.preventDefault();
          let guess = tiles.map((tile) => tile.current.value).join("");
          makeGuess(guess);
          break;

        case "Backspace":
          if (event.target.value.length === 0) {
            tiles[Math.max(index - 1, 0)].current.focus();
          }
          break;

        case "ArrowLeft":
          event.preventDefault();
          tiles[Math.max(index - 1, 0)].current.focus();
          break;

        case "ArrowRight":
          event.preventDefault();
          tiles[Math.min(index + 1, 4)].current.focus();
          break;

        default:
          break;
      }
    },
    [makeGuess, tiles]
  );

  return (
    <div className="row">
      {tiles.map((ref, index) => (
        <Tile
          key={`${rowIndex}-${index}`}
          disabled={!active}
          forwardRef={ref}
          index={index}
          inputHandler={inputHandler}
          keydownHandler={keydownHandler}
          word={word}
        />
      ))}
    </div>
  );
};

export const Tile = ({
  disabled,
  forwardRef,
  index,
  inputHandler,
  keydownHandler,
  word
}) => {
  const [value, setValue] = useState("");
  const onInput = useCallback(
    (event) => {
      setValue(event.target.value.toLowerCase());
      inputHandler(event, index);
    },
    [index, inputHandler]
  );

  const onKeydown = useCallback(
    (event) => {
      keydownHandler(event, index);
    },
    [index, keydownHandler]
  );

  let bgColor;

  if (!disabled || value === "") {
    bgColor = "transparent";
  } else if (word.charAt(index) === value) {
    bgColor = "#dfd";
  } else if (word.indexOf(value) > -1) {
    bgColor = "#ffd";
  } else {
    bgColor = "#ddd";
  }

  return (
    <input
      ref={forwardRef}
      type="text"
      className="tile"
      disabled={disabled}
      maxLength="1"
      pattern="[a-zA-Z]"
      onFocus={moveCursorToEndOnFocus}
      onInput={onInput}
      onKeyDown={onKeydown}
      style={{ backgroundColor: bgColor }}
      value={value}
    />
  );
};

const moveCursorToEndOnFocus = (e) => {
  e.target.selectionStart = e.target.selectionEnd = e.target.value.length;
};
