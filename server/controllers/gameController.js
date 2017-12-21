const uuidv4 = require('uuid/v4');

const playersQueue = [];
const pendingGameSessions = new Map(); // Board is not yet initialized

function configureGameController ( io ) {

  let currentColor = 'white';

  io.on('connection', socket => {
    console.log('A user is connected');

    socket.on('join-game', username => {
      socket.username = username;

      if (playersQueue.length == 0) {
        playersQueue.push(socket);
        return;
      } 
      
      let player1 = playersQueue.shift(),
          player2 = socket,
		      gameSessionId = uuidv4();
		
      if (!player1.connected) {
        playersQueue.push(player2);
        return;
      }

      player1.join(gameSessionId);
      player2.join(gameSessionId);

      pendingGameSessions.set(gameSessionId, false);

      io.to(player1.id).emit('game-ready', {
        gameSessionId: gameSessionId,
        color: 0
      });

      io.to(player2.id).emit('game-ready', {
        gameSessionId: gameSessionId,
        color: 1
      });
      
    });

    socket.on('init-board', data => {
      let initBoard = pendingGameSessions.get(data.gameSessionId);
      if (initBoard) {
        
        io.to(data.gameSessionId).emit('board', {
          board: initBoard,
          turn: 0
        });

        io.to(data.gameSessionId).emit('message', {
          from: 'system',
          text: 'Game start. White\'s turn.',
          type: 'notification',
          gameSessionId: data.gameSessionId
        });

        pendingGameSessions.delete(data.gameSessionId);
      } else {
        pendingGameSessions.set(data.gameSessionId, data.board);
      }
    });
    
    io.to(socket.id).emit('set-color', currentColor);
    currentColor = currentColor === 'white' ? 'black' : 'white';

    socket.on('send-board', data => {
      console.log(`New board: ${ JSON.stringify(data) }`);
      io.to(data.gameSessionId).emit('board', data);

        io.to(data.gameSessionId).emit('message', {
          from: 'system',
          text: `${ data.turn ? 'Black' : 'White' }'s turn.`,
          type: 'notification',
          gameSessionId: data.gameSessionId
        });

    });

    socket.on('make-move', move => {
      console.log(`Move made: ${ move }`);
      io.emit('move-piece', move);
    });

    socket.on('new-message', msg => {
      console.log(`New message: ${ msg }`);
      io.to(msg.gameSessionId).emit('message', {from: socket.username, ...msg});
    });

    socket.on('disconnect', () => {
      console.log('User disconnected.');
    });
  });

}

module.exports = function ( io ) {
  configureGameController(io);
};
