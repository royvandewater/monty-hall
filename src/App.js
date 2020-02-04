import { INVALID_MOVE } from 'boardgame.io/core';
import { Client } from 'boardgame.io/react';
import { Debug } from 'boardgame.io/debug';

import Board from './Board';

const randomDoorIndex = doors => Math.floor(Math.random() * doors.length)

const initializeDoors = () => {
  const doors = Array(3).fill({}).map(() => ({contents: 'goat', isOpen: false, chosen: false}))
  doors[randomDoorIndex(doors)].contents = "car"
  return doors;
}

const nonChosenGoatDoors = doors => doors.filter(door => !door.chosen && door.contents === 'goat')
const hideContentsIfClosed = ({chosen, contents, isOpen}) => 
  isOpen 
  ? {chosen, contents, isOpen} 
  : {chosen, isOpen}

const MontyHall = {
  setup: () => ({ 
    doors: initializeDoors(),
  }),

  playerView: (G) => ({
    doors: G.doors.map(hideContentsIfClosed)
  }),

  phases: {
    initialChoice: {
      start: true,
      moves: {
        chooseDoor: (G, ctx, id) => {
          G.doors[id].chosen = true
          ctx.events.endPhase();
        },
      },
      next: 'finalChoice',
    },
    finalChoice: {
      onBegin: G => {
        const doors = nonChosenGoatDoors(G.doors)
        doors[randomDoorIndex(doors)].isOpen = true
      },
      moves: {
        chooseDoor: (G, ctx, id) => {
          if (G.doors[id].isOpen) return INVALID_MOVE;

          G.doors.forEach(door => door.chosen = false)
          G.doors[id].chosen = true
          G.doors[id].isOpen = true
          ctx.events.endGame({winner: G.doors[id].contents === 'car'});
        }
      }
    }
  },
};

const ai = {
  enumerate: G => {
    let moves = [];

    G.doors.forEach((door, i) => {
      if (door.isOpen) return;

      moves.push({move: 'chooseDoor', args: [i]})
    })

    return moves;
  }
}

const App = Client({ game: MontyHall, board: Board, numPlayers: 1, ai, debug: { impl: Debug } });

export default App;