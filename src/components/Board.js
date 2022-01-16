import React from "react";

export const Board = ({ activeRow, board, status, word }) => {
  return (
    <div className="border-2 border-slate-700 inline-block">
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
    <div className="flex">
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
    bgColor = "bg-transparent";
  } else if (word.charAt(index) === value) {
    bgColor = "bg-green-900";
  } else if (word.indexOf(value) > -1) {
    bgColor = "bg-yellow-800";
  } else {
    bgColor = "bg-gray-800";
  }

  return (
    <div
      className={`${bgColor} border-2 border-slate-700 h-[5rem] leading-[3rem] p-4 text-3xl text-slate-300 uppercase w-[5rem]`}
    >
      {value}
    </div>
  );
};
