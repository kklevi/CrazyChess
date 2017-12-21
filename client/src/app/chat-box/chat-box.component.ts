import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { GameService } from '../_services/game.service';

@Component({
  selector: 'chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit, OnDestroy {

  messages: string[] = []
  message: string = '';
  connection: Subscription;

  constructor(private gameService : GameService) { }

  ngOnInit() {
    this.connection = this.gameService.getMessages().subscribe(message => {
      console.log('Message recieved:', message);
      this.messages.push(message);
    });
  }

  sendMessage () {
    this.gameService.sendMessage(this.message);
    this.message = '';
  }

  ngOnDestroy () {
    this.connection.unsubscribe();
  }
}
