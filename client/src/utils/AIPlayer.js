import socketIOClient from 'socket.io-client';
import { GAMEMODE } from '../constants';

class AIPlayer {
  constructor(gameID, gameMode, onReady) {
    this.gameID = gameID;
    this.weapons = GAMEMODE[gameMode].weapons;
    this.socket = socketIOClient('/');
    this.socket.emit('game::join', 'Computer', gameID);
    this.socket.emit('game::ready_ack', 'Computer', gameID);
    onReady(this.socket);
  }

  fight(onFight) {
    window.setTimeout(() => {
      console.log('Thinking...A lot of AI stuffs are happening here :)');
      const weapon = this.weapons[
        Math.floor(Math.random() * this.weapons.length)
      ];
      this.socket.emit('game::fight', 'Computer', this.gameID, weapon);
      onFight(weapon);
    }, Math.floor(Math.random() * 3000) + 1000);
  }
}

export default AIPlayer;
