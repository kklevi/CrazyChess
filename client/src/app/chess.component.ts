import { Component, style, Input } from "@angular/core";
import { GameService } from './_services/game.service';
import { ChessService } from "./chess.service";
import { AlertService } from './_services/alert.service';
import { Board } from "./Game/Board";
import { Piece } from "./Game/Piece";
import { OnInit } from "@angular/core";
import { Color } from "./Game/color";

@Component({
    selector: 'chess',
    templateUrl: 'chess.component.html',
    styleUrls: ['chess.css']
})
export class ChessComponent implements OnInit{
    constructor(
      private chessService: ChessService,
      private gameService: GameService,
      private alertService: AlertService) {}

    board: Array<any>;
    possibleMovement: Array<number>;
    selectedPos: number;
    turn: Color;
    @Input() playerColor: Color;

    ngOnInit(){
        console.log('hi');
        this.chessService.generatePieces();
        this.board = this.chessService.getBoard();
        this.possibleMovement = new Array();
        this.turn = Color.White;
        console.log('MY COLOR: ', this.playerColor);

      this.gameService.getBoard().subscribe(data => {
        let crazyBoard = this.chessService.toCrazyArray(data.board);
        this.chessService.setBoard(crazyBoard);
        this.turn = data.turn;
      });

      let b = this.chessService.toArray(this.board);
      this.gameService.initBoard(b);

      this.alertService.alert(`Your are playing ${ this.playerColor == 0 ? 'White' : 'Black'  }`, 'info')
    }
    
    isWhiteSquare(i: number){
        if((Math.floor(i/8) + i+1)%2 == 0) return true;
        return false;
    }

    hasPiece(i: number): boolean{
        return this.chessService.hasPieceAt(i);
    }

    getPieceCode(i: number): String{
        return this.chessService.getPieceHtmlCode(i);
    }

    selectPiece(i: number): void{
        if(this.playerColor != this.chessService.getPieceColor(i)) return;
        if((!this.chessService.hasPieceAt(i) || this.chessService.getPieceColor(i) != this.turn)){
            return;
        }
        this.selectedPos = i;
        this.possibleMovement = this.chessService.getPossibleMovements(i);
    }

    isPossibleMovement(i: number): boolean{
        if(this.possibleMovement.indexOf(i) < 0){
            return false;
        }
        return true;
    }

    moveSelectedPieceTo(i: number): void{
      
        this.chessService.movePiece(this.selectedPos, i);
        this.possibleMovement = new Array();
        (this.turn == Color.White) ? this.turn = Color.Black : this.turn = Color.White;
      
        let b = this.chessService.toArray(this.chessService.getBoard());
        this.gameService.sendBoard(b, this.turn);
    }

}
