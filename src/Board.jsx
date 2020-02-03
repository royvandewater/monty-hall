import React from 'react';
import './Board.css';

const OpenDoor = ({chosen, contents}) => {
  if (chosen) return <div className="door chosen" >{contents}</div>
  return <div className="door">{contents}</div>
}

const Door = ({chosen, contents, isOpen, onClick}) => {
  if (isOpen) return <OpenDoor chosen={chosen} contents={contents} />
  if (chosen) return <div className="door closed-door chosen" onClick={onClick} />
  return <div className="door closed-door" onClick={onClick} />
}

const Board = (props) => {
  const doors = props.G.doors;
  const clickDoor = props.moves.clickDoor
  const gameover = props.ctx.gameover

  return (
    <main className="board">
      <h1 className="game-over-message">{gameover && `You ${gameover.winner ? 'Win' : 'Lose'}!`}&nbsp;</h1>
      <div className="doors">
        {doors.map((door, i) => <Door key={i} {...door} onClick={() => clickDoor(i)} />)}
      </div>
    </main>
  );
}

export default Board;