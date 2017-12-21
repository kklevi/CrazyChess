import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { GameService } from '../_services/game.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {

  ready: boolean = false;
  token: any;

  constructor(
    private authenticationService: AuthenticationService,
    private gameService: GameService
  ) { }

  ngOnInit() {
    let username = this.authenticationService.getCurrentUser().username;
    this.gameService
      .joinGame(username)
      .subscribe(token => {
        console.log('Game Session Ready:', token);
        this.gameService.token = token;
        this.token = token;
        this.ready = true;
      });
  }

}
