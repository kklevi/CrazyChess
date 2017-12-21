import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  sendMessage () {
    console.log('Send message here');
  }
}
