import { BACKWARD, FORWARD, LEFT, RIGHT } from '@warriorjs/geography';
// import { attack, feel } from '@warriorjs/abilities';

import Sludge from './Sludge';

jest.mock('@warriorjs/abilities');
// jest.mock('@warriorjs/abilities', () => ({
//   attack: jest.fn(),
//   feel: jest.fn(),
// }));

describe('Sludge', () => {
  test("appears as 's' on map", () => {
    expect(Sludge.character).toBe('s');
  });

  test('has 12 max health', () => {
    expect(Sludge.maxHealth).toBe(12);
  });

  test('has attack ability with power 3', () => {
    expect(Sludge.abilities).toHaveProperty('attack');
    // expect(attack).toHaveBeenCalledWith({ power: 3 });
  });

  test('has feel ability', () => {
    expect(Sludge.abilities).toHaveProperty('feel');
    // expect(feel).toHaveBeenCalled();
  });

  describe('playing turn', () => {
    let turn;
    let space;

    beforeEach(() => {
      space = { isPlayer: () => false };
      turn = {
        attack: jest.fn(),
        feel: jest.fn(() => space),
      };
    });

    test('looks for player in all directions', () => {
      Sludge.playTurn(turn);
      expect(turn.feel).toHaveBeenCalledWith(FORWARD);
      expect(turn.feel).toHaveBeenCalledWith(RIGHT);
      expect(turn.feel).toHaveBeenCalledWith(BACKWARD);
      expect(turn.feel).toHaveBeenCalledWith(LEFT);
    });

    test('stops looking if it finds player', () => {
      turn.feel
        .mockReturnValueOnce({ isPlayer: () => false })
        .mockReturnValueOnce({ isPlayer: () => true });
      Sludge.playTurn(turn);
      expect(turn.feel).toHaveBeenCalledWith(FORWARD);
      expect(turn.feel).toHaveBeenCalledWith(RIGHT);
      expect(turn.feel).not.toHaveBeenCalledWith(BACKWARD);
      expect(turn.feel).not.toHaveBeenCalledWith(LEFT);
      expect(turn.attack).toHaveBeenCalledWith(RIGHT);
    });

    test("does nothing if it doesn't find player", () => {
      Sludge.playTurn(turn);
      expect(turn.attack).not.toHaveBeenCalled();
    });
  });
});
