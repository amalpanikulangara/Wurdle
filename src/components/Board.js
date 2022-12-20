import React from 'react';
import Square from './Square';

export default function Board (data) {

  const letter = data.letter;

  const renderSquare = function (x, y) {
    let val = x*5+y+1;
    return <Square key={val} x={x} y={y} l={data.squares[x][y]} c={data.colors[x][y]}/>
  }

  let board = [];
  for (let i = 0; i < 5; i++) {
    let squareRows = [];
    for (let j = 0; j < 5; j++) {
      squareRows.push(renderSquare(i, j));
    }
    board.push(<div className="board-row" key={i}>{squareRows}</div>)
  }

  return (
    <div className='container'>
      <div className='board'>
        {board}
      </div>
    </div>

  );

}