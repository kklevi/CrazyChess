import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

import { API } from '../_config/api';

@Injectable()
export class GameService {

  private socket: io.Socket;
  color: string;

  constructor() {
    console.log('Connect to socket');
    this.socket = io(API.base());

    this.socket.on('set-color', data => {
      this.color = data;
      console.log('Setting color', data);
    });
  }

  sendMessage(msg: string) : void {
    this.socket.emit('add-message', msg);
  }

  makeMove(move: number[]) : void {
    this.socket.emit('make-move', move);
  }

  sendBoard(board: any) : void {
    this.socket.emit('send-board', board);
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
        console.log('New board recieved:', board);
        observer.next(board);
      });
    });
  }

}

