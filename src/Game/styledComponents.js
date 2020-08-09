import styled from 'styled-components';

const CELL_WIDTH = 64;
const LANTERN_WIDTH = 180;

const Root = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
`;

const Info = styled.div`
  text-align: right;
  padding: 8px 0;
  font-size: 24px;
`;

const Map = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  border: 1px solid black;
  box-sizing: border-box;
`;

const Row = styled.div`
  display: flex;
`;

const Cell = styled.div`
  width: ${CELL_WIDTH}px;
  height: ${CELL_WIDTH}px;
  box-sizing: border-box;
`;

const UnpassableCell = styled(Cell)`background-color: lightgrey;`
const PassableCell = styled(Cell)`background-color: white;`
const StartCell = styled(Cell)`background-color: yellow;`
const GoalCell = styled(Cell)`background-color: lightgreen;`

const Player = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin: 8px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: white;
  box-sizing: border-box;
  transition: all 300ms;
  background-color: tomato;
`;

const BaseOverlay = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const Overlay = styled(BaseOverlay)`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 32px;
`

const Button = styled.button`
  background-color: wheat;
  padding: 10px;
  margin: 10px;
  border-width: 0;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
`

const FogOfWar = styled(BaseOverlay)`
  background-color: black;
  mix-blend-mode: hard-light;
`

const offset = (LANTERN_WIDTH - CELL_WIDTH)/2

const Lantern = styled.div`
  position: absolute;
  width: ${LANTERN_WIDTH}px;
  height: ${LANTERN_WIDTH}px;
  border-radius: 50%;
  background-color: white;
  opacity: 0.5;
  transform: translate(-${offset}px, -${offset}px);
  transition: all 300ms;
`

export {
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
}
