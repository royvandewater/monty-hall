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

const gameMessage = (phase, gameover) =>
  {
    if (gameover) return `You ${gameover.winner ? 'Win' : 'Lose'}!`;
    if (phase === 'finalChoice') return 'Keep your door or switch?';
    return 'Pick a door';
  }

const Board = (props) => {
  const doors = props.G.doors;
  const chooseDoor = props.moves.chooseDoor
  const { gameover, phase } = props.ctx

  return (
    <main className="board">
      <h1 className="game-message">{gameMessage(phase, gameover)}&nbsp;</h1>
      <div className="doors">
        {doors.map((door, i) => <Door key={i} {...door} onClick={() => chooseDoor(i)} />)}
      </div>
    </main>
  );
}

export default Board;