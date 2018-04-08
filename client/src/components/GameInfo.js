import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import InfoBox from './InfoBox';

const GameInfo = ({
  playerID,
  opponentID,
  gameID,
  isVersusComputer,
  isGameStarted,
  isGameCreator,
  isOpponentDisconnected,
  isRoomFull,
  isRoomUnavailable
}) => (
  <div className="game-info">
    {isOpponentDisconnected && (
      <InfoBox>
        <h3>
          <span style={{ color: 'tomato' }}>{opponentID}</span> has disconnect
          :(
        </h3>{' '}
        <Link to="/">Click to return in the Home Page</Link>
      </InfoBox>
    )}

    {isRoomFull && (
      <InfoBox>
        <h3>This room is full!</h3>{' '}
        <Link to="/">Click to return in the Home Page</Link>
      </InfoBox>
    )}

    {isRoomUnavailable && (
      <InfoBox>
        <h3>This room is unavailable!</h3>{' '}
        <Link to="/">Click to return in the Home Page</Link>
      </InfoBox>
    )}

    {!isOpponentDisconnected &&
      !isGameStarted &&
      isGameCreator &&
      !isVersusComputer && (
        <InfoBox>
          <h3>
            Hey <span style={{ color: 'tomato' }}>{playerID}</span>! Share this
            code <span style={{ color: 'tomato' }}>{gameID}</span> with a
            friend.
          </h3>
          <p> The code must be entered in the Join Game section.</p>
        </InfoBox>
      )}
  </div>
);

GameInfo.propTypes = {
  playerID: PropTypes.string.isRequired,
  opponentID: PropTypes.string.isRequired,
  gameID: PropTypes.string.isRequired,
  isVersusComputer: PropTypes.bool.isRequired,
  isGameStarted: PropTypes.bool.isRequired,
  isGameCreator: PropTypes.bool.isRequired,
  isOpponentDisconnected: PropTypes.bool.isRequired,
  isRoomFull: PropTypes.bool.isRequired,
  isRoomUnavailable: PropTypes.bool.isRequired
};

export default GameInfo;
