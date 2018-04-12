class Room {
  constructor() {
    this.players = {
      player1: {
        id: '',
        ready: false,
        lastMove: ''
      },
      player2: {
        id: '',
        ready: false,
        lastMove: ''
      }
    };
    this.options = {
      gameMode: '',
      versusMode: ''
    };
  }

  setPlayer(player, attrs) {
    Object.keys(attrs).forEach(key => {
      if (attrs[key] != null) {
        this.players[player][key] = attrs[key];
      }
    });
  }

  getPlayer(player) {
    return this.players[player];
  }

  setOptions({ gameMode, versusMode }) {
    this.options = {
      gameMode,
      versusMode
    };
  }

  getOptions() {
    return this.options;
  }

  isFull() {
    return (
      this.players['player1'].id !== '' && this.players['player2'].id !== ''
    );
  }
}

module.exports = Room;
