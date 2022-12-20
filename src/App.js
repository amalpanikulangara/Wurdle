// import './App.css';
import React from 'react';
import Board from './components/Board';
import { useEffect, useState } from 'react';
import { Alert } from 'antd';

var randomWord = require('random-word-by-length');
var checkWord = require('check-if-word');
var words     = checkWord('en');
let answer = "";
let word = '';
while (answer.length !== 5) {
  word = randomWord(5);
  answer =  Array.from(word.toUpperCase());
}

export default function App() {

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [gameState, setGameState] =useState('progress');

  const [message, setMessage] = useState(null);
  const [alertType,setAlertType] = useState(null);

  const squares = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];

  const colors = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]

  const [squareArray, setSquareArray] = useState(squares);
  const [colorArray, setColorArray] = useState(colors);

  const validateWord = function () {
    setGameState('validate');
    let greenCount=0;
    let greyCount=0;
    let currentWord = '';

    for(let i=0;i<5;i++) {
      currentWord =currentWord.concat(squareArray[x][i]);
    }

    if(words.check(currentWord)) {
      for(let i=0;i<5;i++) {
        currentWord =currentWord.concat(squareArray[x][i]);
        if(squareArray[x][i]===answer[i]) {
          colorArray[x][i]='green';
          greenCount++;
        } else if (answer.includes(squareArray[x][i])) {
          colorArray[x][i]='yellow';
        } else  {
          colorArray[x][i]='grey';
        }
      }

      if(greenCount===5) {
        setGameState('won');
      } else if (x===4) {
        setGameState('lost')
      } else {
        setGameState('progress');
        setX(x+1)
        setY(0);
      }
    } else {
      setGameState('invalid');
    }
  }

  useEffect(()=>{
    if(gameState==='won') {
      setMessage('You won!');
      setAlertType('success');
    } else if (gameState==='lost') {
      setMessage(`You lost :) the right word was ${word}`);
      setAlertType('alert');
    } else if (gameState==='invalid') {
      setMessage('Invalid Word');
      setAlertType('alert');
    } else {
      setMessage('You can guess it');
      setAlertType('alert');
    }
  }, [gameState])

  useEffect(()=> {
    if(gameState==='invalid' && y!==5) {
      setGameState('progress')
    }
  }, [x,y])

  const handleKeyDown = async (e) => {
    if(gameState==='won') {
      return
    }
    var key = e.key;
    var regex = /^[a-z]{1}$/i;
    if (!regex.test(key) ) {
      if(key==='Enter' && y===5) {  
        validateWord();
      } else if (key==='Backspace' && y!==0) {
          squareArray[x][y-1]=null;
          colorArray[x][y-1]=null;
          setY(y-1);
      }
    } else {
      key = key.toUpperCase();
      if(y<5) {
        squareArray[x][y]=key;
        setY(y+1);
      }
    }
  }
  return (
    <div className="App" onKeyDown={(e) => {handleKeyDown(e)}}>
      <h1>WURDLE</h1>
      <h2>Guess the 5 letter word</h2>
      <Board x={x} y={y} squares={squareArray} colors={colorArray} />
      <Alert style={{ fontSize: '60px', color: 'white'}} message={message} type={alertType} />
      <p>@amalgamate</p>
    </div>
  );
}