import GameMap from '../GameMap';

const MOVE_UP = Symbol();
const MOVE_DOWN = Symbol();
const MOVE_LEFT = Symbol();
const MOVE_RIGHT = Symbol();
const RESTART = Symbol();

const trySetNewPos = (state, newPos) => {
  const newCell = state.level.map.rows[newPos.y][newPos.x]
  let { won, lost } = state;

  if (won || lost || newCell === GameMap.UNPASSABLE) {
    return state;
  }

  const newRemainingMoves = state.remainingMoves - 1;

  if (newCell === GameMap.GOAL) {
    won = true;
  } else if (newRemainingMoves == 0) {
    lost = true;
    won = false;
  }

  return {
    ...state,
    playerPos: newPos,
    remainingMoves: newRemainingMoves,
    won,
    lost
  };
}

const stateReducer = (state, action) => {
  const playerPos = state.playerPos

  switch (action.type) {
    case RESTART: {
      return {
        ...state,
        playerPos: state.level.map.start,
        remainingMoves: state.level.maxMoves,
        won: undefined,
        lost: undefined
      }
    }

    case MOVE_UP: {
      if (state.playerPos.y == 0) { return state; }
      return trySetNewPos(state, { ...playerPos, y: playerPos.y - 1 });
    }

    case MOVE_DOWN: {
      if (state.playerPos.y == state.level.map.height - 1) { return state; }
      return trySetNewPos(state, { ...playerPos, y: playerPos.y + 1 })
    }

    case MOVE_LEFT: {
      if (state.playerPos.x == 0) { return state; }
      return trySetNewPos(state, { ...playerPos, x: playerPos.x - 1 });
    }

    case MOVE_RIGHT: {
      if (state.playerPos.x == state.level.map.width - 1) { return state; }
      return trySetNewPos(state, { ...playerPos, x: playerPos.x + 1 });
    }

    default: {
      throw `Unkown action type ${action.type}`;
    }
  }
};

export {
  MOVE_UP,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  RESTART
}

export default stateReducer
