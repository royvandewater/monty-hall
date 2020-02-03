import { INVALID_MOVE } from 'boardgame.io/core';
import { Client } from 'boardgame.io/react';

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
        clickDoor: (G, ctx, id) => {
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
        clickDoor: (G, ctx, id) => {
          if (G.doors[id].isOpen) return INVALID_MOVE;

          G.doors.forEach(door => door.chosen = false)
          G.doors[id].chosen = true
          G.doors[id].isOpen = true
          ctx.events.endGame();
        }
      }
    }
  },
};

const App = Client({ game: MontyHall, board: Board, numPlayers: 1 });

export default App;