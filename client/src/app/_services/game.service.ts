import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class GameService {

  private socket: io.Socket;
  color: string;

  constructor() {
    console.log('Connect to socket');
    this.socket = io('http://localhost:3000');

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
}

