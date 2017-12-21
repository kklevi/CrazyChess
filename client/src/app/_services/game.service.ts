import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

import { API } from '../_config/api';

@Injectable()
export class GameService {

  private socket: io.Socket;
  token: any;

  constructor() {
    console.log('Connect to socket');
    this.socket = io(API.base());
  }

  joinGame(username : string) : Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('game-ready', token => {
        observer.next(token);
      });
      this.socket.emit('join-game', username);
    });
  }

  initBoard(board : any, gameSessionId? : string) : void {
    this.socket.emit('init-board', { 
      gameSessionId: gameSessionId || this.token.gameSessionId,
      board: board
    });
  }

  sendMessage(msg : string, from? : string, gameSessionId? : string) : void {
    this.socket.emit('new-message', {
      type: 'chat',
      text: msg,
      gameSessionId: gameSessionId || this.token.gameSessionId
    });
  }

  makeMove(move : number[]) : void {
    this.socket.emit('make-move', move);
  }

  sendBoard(board : any, turn: any, gameSessionId? : string) : void {
    this.socket.emit('send-board', {
      board: board,
      turn: turn,
      gameSessionId: gameSessionId || this.token.gameSessionId
    });
  }

  getMessages () : Observable<string> {
    let observable = new Observable<string>(observer => {
      this.socket.on('message', data => {
        observer.next(data);
      });
    });

    return observable;
  }

  getMoves () : Observable<any> {
    let observable = new Observable<any>(observer => {
      this.socket.on('move-piece', data => {
        observer.next(data);
      });
    });

    return observable;
  }

  getBoard () : Observable<any> {
    return new Observable<any> (observer => {
      this.socket.on('board', board => {
        observer.next(board);
      });
    });
  }

}

