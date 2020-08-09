import React, { useState, useMemo, useReducer, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import GameMap from '../GameMap';
import stateReducer, {
  MOVE_DOWN,
  MOVE_UP,
  MOVE_LEFT,
  MOVE_RIGHT,
  RESTART
} from './stateReducer'

import {
  CELL_WIDTH,
  Root,
  Map,
  Row,
  UnpassableCell,
  PassableCell,
  StartCell,
  GoalCell,
  Player,
  Info,
  Overlay,
  Button,
  FogOfWar,
  Lantern
} from './styledComponents';

const LEVEL_CELL_MAP = {
  [GameMap.UNPASSABLE]: UnpassableCell,
  [GameMap.PASSABLE]: PassableCell,
  [GameMap.START]: StartCell,
  [GameMap.GOAL]: GoalCell
};

const levelPropType = PropTypes.shape({
  map: PropTypes.shape({
    rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.symbol)).isRequired,
    start: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }),
  maxMoves: PropTypes.number.isRequired
});

const Level = ({ level, onWon, nextLevel }) => {
  const [currentMoves, setCurrentMoves] = useState(0);

  const [state, dispatch] = useReducer(stateReducer, {
    level,
    playerPos: level.map.start,
    remainingMoves: level.maxMoves,
    won: undefined,
    lost: undefined
  });

  useEffect(_ => {
    const onKeyDown = ev => {
      if (ev.key === 'ArrowUp' || ev.key === 'w') { dispatch({ type: MOVE_UP}); }
      if (ev.key === 'ArrowDown' || ev.key === 's') { dispatch({ type: MOVE_DOWN}); }
      if (ev.key === 'ArrowLeft' || ev.key === 'a') { dispatch({ type: MOVE_LEFT }); }
      if (ev.key === 'ArrowRight' || ev.key === 'd') { dispatch({ type: MOVE_RIGHT}); }
    };

    window.addEventListener('keydown', onKeyDown);
    return _ => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <Root>
      {state.lost && (
        <Overlay style={{ zIndex: 3 }}>
          You lost :(

          <Button onClick={_ => dispatch({ type: RESTART })}>Retry</Button>
        </Overlay>
      )}

      {state.won && (
        <Overlay style={{ zIndex: 3 }}>
          You won :)
          {nextLevel && (<Button onClick={onWon}>Next level</Button>)}
        </Overlay>
      )}

      <Map tabindex='0'>
        <Player style={{ zIndex: 1 }}
          style={{
            left: state.playerPos.x * CELL_WIDTH,
            top: state.playerPos.y * CELL_WIDTH
          }}
        />

        <FogOfWar style={{ zIndex: 2 }}>
          <Lantern
            style={{
              left: state.playerPos.x * CELL_WIDTH,
              top: state.playerPos.y * CELL_WIDTH
            }}
          />
        </FogOfWar>

        {level.map.rows.map((row, rowIndex) => (
          <Row key={rowIndex}>
            {row.map((cell, colIndex) => {
              const Component = LEVEL_CELL_MAP[cell]
              return <Component key={colIndex} />
            })}
          </Row>
        ))}
      </Map>

      <Info>
        Moves left: {state.remainingMoves}
      </Info>
    </Root>
  );
};

Level.propTypes = {
  level: levelPropType.isRequired,
  onWon: PropTypes.func.isRequired,
  nextLevel: PropTypes.bool.isRequired
}

const Game = ({ levels }) => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);

  const currentLevel = useMemo(
    _ => levels[currentLevelIndex],
    [levels, currentLevelIndex]
  );

  const nextLevel = useCallback(
    _ => setCurrentLevelIndex(i => i + 1),
    [setCurrentLevelIndex]
  );

  return (
    <Level
      key={currentLevelIndex}
      level={currentLevel}
      onWon={nextLevel}
      nextLevel={currentLevelIndex < levels.length - 1}
    />
  );
};

Game.propTypes = {
  levels: PropTypes.arrayOf(levelPropType).isRequired
}

export default Game;
