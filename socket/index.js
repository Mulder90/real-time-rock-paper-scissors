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

  Notice that every move beats two moves:

  The move previous to it in the cycle (or four cases ahead)
  The move two cases ahead in the cycle

  So let d = (5 + a - b) % 5. Then:

  d = 1 or d = 3 => a wins
  d = 2 or d = 4 => b wins
  d = 0 => tie
*/
const checkHand = (moveOne, moveTwo) => {
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

  // Player 1 wins
  if (res === 1 || res === 3) {
    return 1;
    // Player 2 wins
  } else if (res === 2 || res === 4) {
    return 2;
  }

  // Tie
  return 0;
};

const startSocket = io => {
  const rooms = {};

  io.on('connection', socket => {
    console.log('New client connected');

    let roomID = '';
    let creator = false;

    socket.on('game::create', (playerID, gameID, gameMode, versusMode) => {
      roomID = gameID;
      creator = true;
      rooms[gameID] = {
        player1: {
          id: playerID,
          ready: false,
          lastMove: ''
        },
        options: {
          gameMode,
          versusMode
        }
      };

      socket.join(gameID);
      console.log(
        `Game ${gameID} - Player ${playerID} - Create: ${gameMode} game`
      );
    });

    socket.on('game::join', (playerID, gameID) => {
      const room = rooms[gameID];

      if (!room) {
        return socket.emit('error::unavailable');
      }

      if (!room.player_2_id) {
        roomID = gameID;
        socket.join(gameID);
        room['player2'] = {
          id: playerID,
          ready: false,
          lastMove: ''
        };
        console.log(`Game ${gameID} - Player ${playerID} - Join`);
        socket.broadcast.to(gameID).emit('opponent::connected', playerID);
        socket.broadcast.to(gameID).emit('game::ready');
        socket.emit('game::ready', {
          opponentID: room['player1']['id'],
          gameMode: room.options.gameMode,
          versusMode: room.options.versusMode
        });
      } else {
        socket.emit('error::full');
      }
    });

    socket.on('game::ready_ack', (playerID, gameID) => {
      const room = rooms[gameID];
      if (creator) {
        room['player1']['ready'] = true;
      } else {
        room['player2']['ready'] = true;
      }

      if (room['player1']['ready'] && room['player2']['ready']) {
        socket.emit('game::start');
        socket.broadcast.to(gameID).emit('game::start');
      }

      console.log(`Game ${gameID} - Player ${playerID} - Ready Ack`);
    });

    socket.on('game::fight', (playerID, gameID, weapon) => {
      const room = rooms[gameID];
      const resToWinnerPlayerID = {
        0: 'Tie',
        1: room['player1']['id'],
        2: room['player2']['id']
      };
      let winner = '';

      if (room && room['player1']['ready'] && room['player2']['ready']) {
        console.log(`Game ${gameID} - Player ${playerID} - Use: `, weapon);
        if (creator) {
          room['player1']['lastMove'] = weapon;
        } else {
          room['player2']['lastMove'] = weapon;
        }
        if (room['player1']['lastMove'] && room['player2']['lastMove']) {
          winner =
            resToWinnerPlayerID[
              checkHand(
                room['player1']['lastMove'],
                room['player2']['lastMove']
              )
            ];

          if (creator) {
            socket.emit('opponent::fight', room['player2']['lastMove']);
            socket.broadcast
              .to(gameID)
              .emit('opponent::fight', room['player1']['lastMove']);
          } else {
            socket.emit('opponent::fight', room['player1']['lastMove']);
            socket.broadcast
              .to(gameID)
              .emit('opponent::fight', room['player2']['lastMove']);
          }

          socket.emit('game::point', winner);
          socket.broadcast.to(gameID).emit('game::point', winner);
          room['player1']['lastMove'] = '';
          room['player2']['lastMove'] = '';
        }
      }
    });

    socket.on('disconnect', () => {
      rooms[roomID] && delete rooms[roomID];
      socket.broadcast.to(roomID).emit('opponent::disconnected');
    });
  });
};

module.exports = startSocket;
