import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AlertModule } from './alert.module';

import { JwtInterceptor } from './_interceptors/jwt.interceptor';

import { GameService } from './_services/game.service';
import { ChessService } from './chess.service';
import { AuthenticationService } from './_services/authentication.service';

import { ChessComponent } from './chess.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PlaygroundComponent } from './playground/playground.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';


@NgModule({
  declarations: [
    AppComponent,
    ChessComponent,
    HomeComponent,
    LoginComponent,
    PlaygroundComponent,
    ChatBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    AlertModule
  ],
  providers: [
    GameService,
    ChessService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
