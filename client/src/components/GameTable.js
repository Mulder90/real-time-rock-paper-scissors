import React from 'react';
import PropTypes from 'prop-types';
import Card from 'material-ui/Card';

const GameTable = ({ playerWeapon, opponentWeapon }) => (
  <div className="game-table">
    <Card className="container">
      <div>
        <strong>Player use:</strong> {playerWeapon}
      </div>
      <div>
        <strong>Opponent use:</strong> {opponentWeapon}
      </div>
    </Card>
  </div>
);

GameTable.propTypes = {
  playerWeapon: PropTypes.string.isRequired,
  opponentWeapon: PropTypes.string.isRequired
};

export default GameTable;
