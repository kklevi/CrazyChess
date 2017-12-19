import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ChessComponent } from './chess.component';
import { ChessService } from './chess.service';


@NgModule({
  declarations: [
    AppComponent,
    ChessComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ChessService],
  bootstrap: [AppComponent]
})
export class AppModule { }
