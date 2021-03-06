import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import Game from './Game';
import { Player } from './styledComponents'
import GameMap from '../GameMap'

const simulateKeyDown = key => {
  const event = new KeyboardEvent('keydown', { key });
  window.dispatchEvent(event);
}

describe('Game integration', () => {
  let wrapper;

  describe('movement', () => {
    it('works', () => {
      const level = {
        maxMoves: 10,
        map: GameMap.parse(`
          S_
          __
        `)
      };

      wrapper = mount(<Game levels={[level]} />);

      simulateKeyDown('ArrowRight');
      simulateKeyDown('ArrowRight'); // Doing it twice to test player can't move out of the map.
      wrapper.update();
      expect(wrapper.find(Player).props().style).to.include({ top: 0, left: 64});
      simulateKeyDown('ArrowDown');
      simulateKeyDown('ArrowDown');
      wrapper.update();
      expect(wrapper.find(Player).props().style).to.include({ top: 64, left: 64});
      simulateKeyDown('ArrowLeft');
      simulateKeyDown('ArrowLeft');
      wrapper.update();
      expect(wrapper.find(Player).props().style).to.include({ top: 64, left: 0});
      simulateKeyDown('ArrowUp');
      simulateKeyDown('ArrowUp');
      wrapper.update();
      expect(wrapper.find(Player).props().style).to.include({ top: 0, left: 0});
    });
  });

  describe('when player tries to move into a wall', () => {
    it('does not move the player nor burn a move', () => {
      const level = {
        maxMoves: 5,
        map: GameMap.parse(`
          SX
          _X
        `)
      }

      wrapper = mount(<Game levels={[level]} />);

      simulateKeyDown('ArrowDown');
      wrapper.update();

      expect(wrapper.text()).to.match(/Moves left: 4/);
      expect(wrapper.find(Player).props().style).to.include({ top: 64, left: 0});
    })

  })

  describe('when player exhausts remaining moves', () => {
    before(() => {
      const level = {
        maxMoves: 2,
        map: GameMap.parse(`S_____`)
      }

      wrapper = mount(<Game levels={[level]} />);

      simulateKeyDown('ArrowRight');
      simulateKeyDown('ArrowRight');
      simulateKeyDown('ArrowRight');

      wrapper.update();
    })

    it('shows a game over screen', () => {
      expect(wrapper.find(Player).props().style).to.include({ top: 0, left: 128});
      expect(wrapper.text()).to.match(/You lost :\(.*RetryMoves left: 0/)
    });

    describe('and player retries', () => {
      it('resets the level', () => {
        const button = wrapper.find('button')
        expect(button.text()).to.eq('Retry')
        button.simulate('click');
        wrapper.update();
        expect(wrapper.find(Player).props().style).to.include({ top: 0, left: 0});
        expect(wrapper.text()).to.match(/Moves left: 2/);
      });
    })
  });

  describe('when player wins and hits "Next Level"', () => {
    it('shows a win screen', () => {
      const level_1 = {
        maxMoves: 5,
        map: GameMap.parse(`SG`)
      }

      const level_2 = {
        maxMoves: 8,
        map: GameMap.parse(`S____G`)
      }

      wrapper = mount(<Game levels={[level_1, level_2]} />);
      simulateKeyDown('ArrowRight');

      wrapper.update()

      expect(wrapper.text()).to.match(/You won :\)/)

      const button = wrapper.find('button')

      expect(button.text()).to.eq('Next level')

      button.simulate('click');

      wrapper.update();

      expect(wrapper.find(Player).props().style).to.include({ top: 0, left: 0});
      expect(wrapper.text()).to.match(/Moves left: 8/);
    });
  });
});
