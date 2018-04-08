import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import GameInfo from '../components/GameInfo';
import GameScoreBoard from '../components/GameScoreBoard';
import GameTable from '../components/GameTable';
import GamePaddle from '../components/GamePaddle';

import AIPlayer from '../utils/AIPlayer';

class GamePage extends Component {
  state = {
    playerID: '',
    opponentID: '',
    gameID: '',
    gameMode: '',
    versusMode: '',
    lastWinner: '',
    playerWeapon: 'Please select a weapon...',
    opponentWeapon: 'Waiting...',
    isGameCreator: false,
    isGameStarted: false,
    isOpponentDisconnected: false,
    isRoomFull: false,
    isRoomUnavailable: false,
    isSetFinished: true
  };

  componentDidMount() {
    const {
      playerID,
      gameID,
      gameMode,
      versusMode,
      isGameCreator
    } = this.props.location.state;
    this.setState({
      playerID,
      gameID,
      gameMode,
      versusMode,
      isGameCreator
    });

    this.socket = socketIOClient('/');
    this.socket.on(
      'game::ready',
      ({ gameMode, versusMode, opponentID } = {}) => {
        if (gameMode) {
          this.setState({
            gameMode,
            versusMode,
            opponentID
          });
        }
        this.socket.emit('game::ready_ack', playerID, gameID);
      }
    );

    this.socket.on('game::start', () => {
      this.setState({
        isGameStarted: true
      });
    });

    this.socket.on('game::point', lastWinner => {
      window.setTimeout(() => {
        this.setState({
          lastWinner,
          isSetFinished: true,
          playerWeapon: 'Please select a weapon...',
          opponentWeapon: 'Waiting...'
        });
      }, 2000);
    });

    this.socket.on('opponent::disconnected', () => {
      this.setState({
        isOpponentDisconnected: true
      });
    });

    this.socket.on('opponent::connected', opponentID => {
      this.setState({
        opponentID
      });
    });

    this.socket.on('opponent::fight', weapon => {
      this.setState({
        opponentWeapon: weapon
      });
    });

    this.socket.on('error::full', () => {
      this.setState({
        isRoomFull: true
      });
    });

    this.socket.on('error::unavailable', () => {
      this.setState({
        isRoomUnavailable: true
      });
    });

    if (isGameCreator) {
      this.socket.emit('game::create', playerID, gameID, gameMode, versusMode);
    } else {
      this.socket.emit('game::join', playerID, gameID);
    }

    if (versusMode === 'Computer') {
      this.aiPlayer = new AIPlayer(gameID, gameMode, aiSocket => {
        this.setState({
          versusMode: 'Computer',
          isGameStarted: true
        });
      });
    }
  }

  componentWillUnmount() {
    this.socket.close();
  }

  fight = weapon => {
    this.setState({
      playerWeapon: weapon,
      isSetFinished: false
    });
    this.socket.emit(
      'game::fight',
      this.state.playerID,
      this.state.gameID,
      weapon
    );

    if (this.state.versusMode === 'Computer') {
      this.setState({
        opponentWeapon: 'Waiting...'
      });
      this.aiPlayer.fight(weapon => {
        this.setState({
          opponentWeapon: weapon
        });
      });
    }
  };

  render() {
    const {
      playerID,
      opponentID,
      gameID,
      gameMode,
      versusMode,
      isGameStarted,
      isGameCreator,
      isOpponentDisconnected,
      isRoomFull,
      isRoomUnavailable,
      isSetFinished,
      playerWeapon,
      opponentWeapon,
      lastWinner
    } = this.state;
    return (
      <div className="gamepage">
        <GameInfo
          playerID={playerID}
          opponentID={opponentID}
          gameID={gameID}
          isVersusComputer={versusMode === 'Computer'}
          isGameStarted={isGameStarted}
          isGameCreator={isGameCreator}
          isOpponentDisconnected={isOpponentDisconnected}
          isRoomFull={isRoomFull}
          isRoomUnavailable={isRoomUnavailable}
        />

        {isGameStarted &&
          !isOpponentDisconnected &&
          !isRoomFull &&
          !isRoomUnavailable && (
            <div>
              <GameScoreBoard
                playerID={playerID}
                opponentID={opponentID}
                gameMode={gameMode}
                lastWinner={lastWinner}
              />
              <GameTable
                playerWeapon={playerWeapon}
                opponentWeapon={opponentWeapon}
              />
              <GamePaddle
                gameMode={gameMode}
                isSetFinished={isSetFinished}
                onFight={this.fight}
              />
            </div>
          )}
      </div>
    );
  }
}
export default GamePage;
