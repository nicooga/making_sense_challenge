import React, { useState, useMemo } from 'react';
import styled from 'styled-components'
import GameMap from './GameMap';

const CELL_WIDTH = 64;

const Root = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  border: 1px solid black;
`;

const Row = styled.div`
  display: flex;
`;

const Cell = styled.div`
  width: ${CELL_WIDTH}px;
  height: ${CELL_WIDTH}px;
`;

const UnpassableCell = styled(Cell)`background-color: black;`
const PassableCell = styled(Cell)`background-color: wheat;`
const StartCell = styled(Cell)`background-color: cadetblue;`
const GoalCell = styled(Cell)`background-color: brown;`

const Player = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin: 8px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: tomato;
  border: 1px solid black;
  box-sizing: border-box;
`;

const LEVEL_CELL_MAP = {
  [GameMap.UNPASSABLE]: UnpassableCell,
  [GameMap.PASSABLE]: PassableCell,
  [GameMap.START]: StartCell,
  [GameMap.GOAL]: GoalCell
};

const Level = ({ level }) => {
  const [currentMoves, setCurrentMoves] = useState(0);
  const [playerPosition, setPlayerPosition] = useState(level.map.start);

  return (
    <Root>
      <Player
        style={{
          left: playerPosition.x * CELL_WIDTH,
          top: playerPosition.y * CELL_WIDTH
        }}
      />

      {level.map.rows.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((cell, colIndex) => {
            const Component = LEVEL_CELL_MAP[cell]
            return <Component key={colIndex} />
          })}
        </Row>
      ))}
    </Root>
  );
};

const Game = ({ levels }) => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);

  const currentLevel = useMemo(
    _ => levels[currentLevelIndex],
    [levels, currentLevelIndex]
  )

  return (<Level level={currentLevel} />);
};

export default Game;
