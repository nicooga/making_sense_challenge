import React from 'react';
import styled from 'styled-components';
import Game from './Game';
import GameMap from './GameMap';

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const LEVEL_1 = {
  maxMoves: 8,
  map: GameMap.parse(`
    S____
    XX_XX
    XX_XX
    ___XX
    XX__G
  `)
}

const LEVEL_2 = {
  maxMoves: 10,
  map: GameMap.parse(`
    S_____
    XX_XX_
    X__XX_
    __XGX_
    X___X_
    XXX___
  `)
}

const LEVEL_3 = {
  maxMoves: 13,
  map: GameMap.parse(`
    S_____
    XX__X_
    X__XX_
    __XXX_
    XXX_X_
    XXG___
  `)
}

const App = _props => (
  <Root>
    <Game levels={[LEVEL_1, LEVEL_2, LEVEL_3]} />
  </Root>
)

export default App;
