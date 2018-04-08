import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import ModeSelector from './ModeSelector';

const CreateGame = ({
  onGameModeChange,
  onVersusModeChange,
  onPlayClick,
  gameMode,
  versusMode,
  playerID
}) => (
  <Card className="container">
    <CardHeader
      title="Create a game"
      subheader="Select the Game Mode and the Opponent Type"
    />
    <ModeSelector
      title="Game Mode"
      onClick={onGameModeChange}
      options={['Classic', 'Lizard-Spock']}
      active={gameMode}
    />
    <ModeSelector
      title="Versus Mode"
      onClick={onVersusModeChange}
      options={['Computer', 'Player']}
      active={versusMode}
    />
    <div className="button-line">
      <Button
        disabled={gameMode === '' || versusMode === '' || playerID === ''}
        type="submit"
        variant="raised"
        color="primary"
        onClick={onPlayClick}
      >
        Play
      </Button>
    </div>
  </Card>
);

CreateGame.propTypes = {
  onGameModeChange: PropTypes.func.isRequired,
  onVersusModeChange: PropTypes.func.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  gameMode: PropTypes.string.isRequired,
  versusMode: PropTypes.string.isRequired,
  playerID: PropTypes.string.isRequired
};

export default CreateGame;
