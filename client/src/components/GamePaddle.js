import React from 'react';
import PropTypes from 'prop-types';
import Card from 'material-ui/Card';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faHandRock,
  faHandPaper,
  faHandScissors,
  faHandLizard,
  faHandSpock
} from '@fortawesome/fontawesome-free-regular';
import { GAMEMODE } from '../constants';

const weaponIconMap = {
  Rock: faHandRock,
  Paper: faHandPaper,
  Scissors: faHandScissors,
  Lizard: faHandLizard,
  Spock: faHandSpock
};

const GamePaddle = ({ gameMode, isSetFinished, onFight }) => (
  <div className="game-paddle">
    <Card className="container">
      {GAMEMODE[gameMode].weapons.map((weapon, index) => (
        <Tooltip title={weapon} key={weapon}>
          <Button
            disabled={!isSetFinished}
            className="weapon"
            variant="fab"
            color="primary"
            aria-label={weapon}
            onClick={() => onFight(weapon)}
          >
            <FontAwesomeIcon icon={weaponIconMap[weapon]} />
          </Button>
        </Tooltip>
      ))}
    </Card>
  </div>
);

GamePaddle.propTypes = {
  gameMode: PropTypes.string.isRequired,
  isSetFinished: PropTypes.bool.isRequired,
  onFight: PropTypes.func.isRequired
};

export default GamePaddle;
