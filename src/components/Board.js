import React from "react";

export const Board = ({ activeRow, board, status, word }) => {
  return (
    <div className="board">
      {board.map((_, index) => (
        <Row
          key={`row-${index}`}
          active={activeRow === index && status === "PLAY"}
          row={board[index]}
          rowIndex={index}
          word={word}
        />
      ))}
    </div>
  );
};

export const Row = ({ active, row, rowIndex, word }) => {
  return (
    <div className="row">
      {row.map((tile, index) => (
        <Tile
          key={`${rowIndex}-${index}`}
          active={active}
          index={index}
          value={tile}
          word={word}
        />
      ))}
    </div>
  );
};

export const Tile = ({ active, index, word, value }) => {
  let bgColor;

  if (active || value === "") {
    bgColor = "transparent";
  } else if (word.charAt(index) === value) {
    bgColor = "#dfd";
  } else if (word.indexOf(value) > -1) {
    bgColor = "#ffd";
  } else {
    bgColor = "#ddd";
  }

  return (
    <div className="tile" style={{ backgroundColor: bgColor }}>
      {value}
    </div>
  );
};
