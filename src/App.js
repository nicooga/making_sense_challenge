import React from 'react';
import Game from './Game';
import GameMap from './GameMap';

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

console.log(LEVEL_1.map)

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

const App = _props => (<Game levels={[LEVEL_1, LEVEL_2, LEVEL_3]} />)

export default App;
