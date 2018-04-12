const Game = require('../game');
const assert = require('chai').assert;

describe('Game Logic module', () => {
  it('Game class should have a checkWinner static method', () => {
    assert.isFunction(
      Game.checkWinner,
      'Game class should have a checkWinner static method'
    );
  });

  describe('Player 1 wins', () => {
    it('Scissors cuts Paper', () => {
      assert(
        Game.checkWinner('Scissors', 'Paper') === 1,
        'Scissors cuts Paper'
      );
    });

    it('Paper covers Rock', () => {
      assert(Game.checkWinner('Paper', 'Rock') === 1, 'Paper covers Rock');
    });

    it('Rock crushes Lizard', () => {
      assert(Game.checkWinner('Rock', 'Lizard') === 1, 'Rock crushes Lizard');
    });

    it('Lizard poisons Spock', () => {
      assert(Game.checkWinner('Lizard', 'Spock') === 1, 'Lizard poisons Spock');
    });

    it('Spock smashes Scissors', () => {
      assert(
        Game.checkWinner('Spock', 'Scissors') === 1,
        'Spock smashes Scissors'
      );
    });

    it('Scissors decapitates Lizard', () => {
      assert(
        Game.checkWinner('Scissors', 'Lizard') === 1,
        'Scissors decapitates Lizard'
      );
    });

    it('Lizard eats Paper', () => {
      assert(Game.checkWinner('Lizard', 'Paper') === 1, 'Lizard eats Paper');
    });

    it('Spock vaporizes Rock', () => {
      assert(Game.checkWinner('Spock', 'Rock') === 1, 'Spock vaporizes Rock');
    });

    it('Rock crushes Scissors', () => {
      assert(Game.checkWinner('Rock', 'Scissors') === 1, 'Rock crushes Rock');
    });
  });

  describe('Player 2 wins', () => {
    it('Scissors cuts Paper', () => {
      assert(
        Game.checkWinner('Paper', 'Scissors') === 2,
        'Scissors cuts Paper'
      );
    });

    it('Paper covers Rock', () => {
      assert(Game.checkWinner('Rock', 'Paper') === 2, 'Paper covers Rock');
    });

    it('Rock crushes Lizard', () => {
      assert(Game.checkWinner('Lizard', 'Rock') === 2, 'Rock crushes Lizard');
    });

    it('Lizard poisons Spock', () => {
      assert(Game.checkWinner('Spock', 'Lizard') === 2, 'Lizard poisons Spock');
    });

    it('Spock smashes Scissors', () => {
      assert(
        Game.checkWinner('Scissors', 'Spock') === 2,
        'Spock smashes Scissors'
      );
    });

    it('Scissors decapitates Lizard', () => {
      assert(
        Game.checkWinner('Lizard', 'Scissors') === 2,
        'Scissors decapitates Lizard'
      );
    });

    it('Lizard eats Paper', () => {
      assert(Game.checkWinner('Paper', 'Lizard') === 2, 'Lizard eats Paper');
    });

    it('Spock vaporizes Rock', () => {
      assert(Game.checkWinner('Rock', 'Spock') === 2, 'Spock vaporizes Rock');
    });

    it('Rock crushes Scissors', () => {
      assert(Game.checkWinner('Scissors', 'Rock') === 2, 'Rock crushes Rock');
    });
  });

  describe('Tie', () => {
    it('Rock tie Rock', () => {
      assert(Game.checkWinner('Rock', 'Rock') === 0, 'Rock tie Rock');
    });

    it('Paper tie Paper', () => {
      assert(Game.checkWinner('Paper', 'Paper') === 0, 'Paper tie Paper');
    });

    it('Scissors tie Scissors', () => {
      assert(
        Game.checkWinner('Scissors', 'Scissors') === 0,
        'Scissors tie Scissors'
      );
    });

    it('Spock tie Spock', () => {
      assert(Game.checkWinner('Spock', 'Spock') === 0, 'Spock tie Spock');
    });

    it('Lizard tie Lizard', () => {
      assert(Game.checkWinner('Lizard', 'Lizard') === 0, 'Lizard tie Lizard');
    });
  });
});
