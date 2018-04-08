import React from 'react';
import PropTypes from 'prop-types';
import Card from 'material-ui/Card';

const GameScoreBoard = ({ playerID, opponentID, gameMode, lastWinner }) => (
  <div className="game-scoreboard">
    <Card className="container">
      <div>
        <strong>You:</strong> {playerID}
      </div>
      <div>
        <strong>Opponent:</strong> {opponentID}
      </div>
      <div>
        <strong>Game Mode:</strong> {gameMode}
      </div>

      <div>
        <strong>Last Winner:</strong>{' '}
        <span style={{ color: 'tomato' }}>{lastWinner}</span>
      </div>
    </Card>
  </div>
);

GameScoreBoard.propTypes = {
  playerID: PropTypes.string.isRequired,
  opponentID: PropTypes.string.isRequired,
  gameMode: PropTypes.string.isRequired,
  lastWinner: PropTypes.string.isRequired
};

export default GameScoreBoard;
