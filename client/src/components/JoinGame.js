import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const JoinGame = ({ onGameIDChange, onJoinClick, joinGameDisabled }) => (
  <Card className="join-game container">
    <CardHeader title="Join a Game" subheader="Insert an ID to join a game" />
    <TextField
      name="game-id"
      label="Game ID"
      required
      onChange={onGameIDChange}
    />
    <div className="button-line">
      <Button
        disabled={joinGameDisabled}
        type="submit"
        variant="raised"
        color="primary"
        onClick={onJoinClick}
      >
        Join
      </Button>
    </div>
  </Card>
);

JoinGame.propTypes = {
  onGameIDChange: PropTypes.func.isRequired,
  onJoinClick: PropTypes.func.isRequired,
  joinGameDisabled: PropTypes.bool.isRequired
};

export default JoinGame;
