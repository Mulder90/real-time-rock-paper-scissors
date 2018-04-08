import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Card, { CardHeader } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import JoinGame from '../components/JoinGame';
import CreateGame from '../components/CreateGame';
import { generateID } from '../utils';

class HomePage extends Component {
  state = {
    playerID: '',
    gameMode: '',
    versusMode: '',
    gameID: '',
    isGameStarted: false,
    isGameCreator: false
  };

  componentDidMount() {
    this.setState({
      playerID: localStorage.getItem('username') || ''
    });
  }

  onPlayClick = () => {
    this.setState({
      gameID: generateID(),
      isGameStarted: true,
      isGameCreator: true
    });
  };

  onJoinClick = () => {
    this.setState({
      isGameStarted: true
    });
  };

  onGameModeChange = gameMode => {
    this.setState({
      gameMode
    });
  };

  onVersusModeChange = versusMode => {
    this.setState({
      versusMode
    });
  };

  onGameIDChange = event => {
    this.setState({
      gameID: event.target.value
    });
  };

  onPlayerIDChange = event => {
    this.setState({
      playerID: event.target.value
    });
  };

  render() {
    const {
      playerID,
      gameID,
      gameMode,
      versusMode,
      isGameStarted,
      isGameCreator
    } = this.state;
    if (isGameStarted) {
      return (
        <Redirect
          to={{
            pathname: '/game',
            state: {
              playerID,
              gameID,
              gameMode,
              versusMode,
              isGameCreator
            }
          }}
        />
      );
    } else {
      return (
        <div className="homepage">
          <Card className="container">
            <CardHeader
              title="Set an username"
              subheader="This is required either to create a game or to join it! If logged in then is set automatically"
            />
            <TextField
              name="playerID"
              label="Username"
              value={playerID}
              required
              onChange={this.onPlayerIDChange}
            />
          </Card>
          <JoinGame
            onJoinClick={this.onJoinClick}
            onGameIDChange={this.onGameIDChange}
            joinGameDisabled={gameID === '' || playerID === ''}
          />
          <div className="container divider">OR</div>
          <CreateGame
            onGameModeChange={this.onGameModeChange}
            onVersusModeChange={this.onVersusModeChange}
            onPlayClick={this.onPlayClick}
            gameMode={gameMode}
            versusMode={versusMode}
            playerID={playerID}
          />
        </div>
      );
    }
  }
}
export default HomePage;
