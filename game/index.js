/*
  Scissors cuts Paper
  Paper covers Rock
  Rock crushes Lizard
  Lizard poisons Spock
  Spock smashes Scissors
  Scissors decapitates Lizard
  Lizard eats Paper
  Paper disproves Spock
  Spock vaporizes Rock
  (and as it always has) Rock crushes Scissors
*/

class Game {
  /*
    In, Rock-Paper-Scissor games, it is easy to decide
    if move a wins against move b using their index at a cycle.

    Let's assign a number to each move (0, 1, 2, 3, 4).
    Notice that every move beats two moves:

    The move previous to it in the cycle (or four cases ahead)
    The move two cases ahead in the cycle

    So let d = (5 + a - b) % 5. Then:

    d = 1 or d = 3 => a wins
    d = 2 or d = 4 => b wins
    d = 0 => tie
  */
  static checkWinner(moveOne, moveTwo) {
    const moveToIndex = {
      Rock: 0,
      Paper: 1,
      Scissors: 2,
      Spock: 3,
      Lizard: 4
    };

    const mOneIndex = moveToIndex[moveOne];
    const mTwoIndex = moveToIndex[moveTwo];
    const res = (5 + mOneIndex - mTwoIndex) % 5;

    // Move 1 wins
    if (res === 1 || res === 3) {
      return 1;
      // Move 2 wins
    } else if (res === 2 || res === 4) {
      return 2;
    }

    // Tie
    return 0;
  }
}

module.exports = Game;
