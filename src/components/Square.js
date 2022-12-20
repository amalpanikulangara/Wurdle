import React from "react";
import '../App.css'

export default function Square (data) {

  let styles = {};
  let textColor;

  const greenStyles = {
    background: '#6aaa64'
  }

  const yellowStyles = {
    background: '#c9b458'
  }

  const greyStyles = {
    background: '#787c7e',
  }

  switch (data.c) {
    case 'green' : {
      styles = {
        background: greenStyles.background
      };
      textColor = 'white';
    }
    break;
    case 'yellow' : {
      styles = {
        background: yellowStyles.background,
      };
      textColor = 'white';
    }
    break;
    case 'grey' : {
      styles = {
        background: greyStyles.background,
      };
      textColor = 'white';
    }
    break;
    default: {
      styles = {
        background: '#EAEAEA',
        background: '-moz-radial-gradient(center, #EAEAEA 0%, #CBCBCB 39%, #B5B9BC 100%)',
        background: '-webkit-radial-gradient(center, #EAEAEA 0%, #CBCBCB 39%, #B5B9BC 100%)',
        background: 'radial-gradient(ellipse at center, #EAEAEA 0%, #CBCBCB 39%, #B5B9BC 100%)',
      };
      textColor = 'black';
    }
  }
  return (
    <div>
      <button className="square" style={styles}>
       <h2 style={{color: textColor}}>{data.l}</h2> 
      </button>
    </div>
  );
}