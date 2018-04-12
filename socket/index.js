const Game = require('../game');
const Room = require('../game/room');

const rooms = {};

const startSocket = io => {
  io.on('connection', socket => {
    console.log('New client connected');

    let creator = false;
    let room = null;
    let roomID = '';

    socket.on('game::create', (playerID, gameID, gameMode, versusMode) => {
      roomID = gameID;
      room = new Room();
      room.setOptions({
        gameMode,
        versusMode
      });
      room.setPlayer('player1', {
        id: playerID
      });
      rooms[roomID] = room;
      creator = true;
      socket.join(gameID);
      console.log(
        `Game ${gameID} - Player ${playerID} - Create: ${gameMode} game`
      );
    });

    socket.on('game::join', (playerID, gameID) => {
      roomID = gameID;
      room = rooms[gameID];
      if (!room) {
        return socket.emit('error::unavailable');
      }

      if (!room.isFull()) {
        room.setPlayer('player2', {
          id: playerID
        });
        socket.join(gameID);

        socket.broadcast.to(gameID).emit('opponent::connected', playerID);
        socket.broadcast.to(gameID).emit('game::ready');
        socket.emit('game::ready', {
          opponentID: room.getPlayer('player1').id,
          gameMode: room.getOptions().gameMode,
          versusMode: room.getOptions().versusMode
        });
        console.log(`Game ${gameID} - Player ${playerID} - Join`);
      } else {
        socket.emit('error::full');
      }
    });

    socket.on('game::ready_ack', (playerID, gameID) => {
      if (creator) {
        room.setPlayer('player1', {
          ready: true
        });
      } else {
        room.setPlayer('player2', {
          ready: true
        });
      }

      if (room.getPlayer('player1').ready && room.getPlayer('player2').ready) {
        socket.emit('game::start');
        socket.broadcast.to(gameID).emit('game::start');
      }

      console.log(`Game ${gameID} - Player ${playerID} - Ready Ack`);
    });

    socket.on('game::fight', (playerID, gameID, weapon) => {
      const player1 = room.getPlayer('player1');
      const player2 = room.getPlayer('player2');
      const resToWinnerPlayerID = {
        0: 'Tie',
        1: player1.id,
        2: player2.id
      };
      let winner = '';

      if (!player1.ready || !player2.ready) {
        return;
      }

      if (creator) {
        room.setPlayer('player1', {
          lastMove: weapon
        });
      } else {
        room.setPlayer('player2', {
          lastMove: weapon
        });
      }

      console.log(`Game ${gameID} - Player ${playerID} - Use: `, weapon);

      if (player1.lastMove && player2.lastMove) {
        winner =
          resToWinnerPlayerID[
            Game.checkWinner(player1.lastMove, player2.lastMove)
          ];

        if (creator) {
          socket.emit('opponent::fight', player2.lastMove);
          socket.broadcast.to(gameID).emit('opponent::fight', player1.lastMove);
        } else {
          socket.emit('opponent::fight', player1.lastMove);
          socket.broadcast.to(gameID).emit('opponent::fight', player2.lastMove);
        }

        socket.emit('game::point', winner);
        socket.broadcast.to(gameID).emit('game::point', winner);
        room.setPlayer('player1', {
          lastMove: ''
        });
        room.setPlayer('player2', {
          lastMove: ''
        });
      }
    });

    socket.on('disconnect', () => {
      rooms[roomID] && delete rooms[roomID];
      socket.broadcast.to(roomID).emit('opponent::disconnected');
    });
  });
};

module.exports = startSocket;
