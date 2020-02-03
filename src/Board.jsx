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

  return (<main className="board">
    {doors.map((door, i) => <Door key={i} {...door} onClick={() => clickDoor(i)} />)}
  </main>);
}

export default Board;