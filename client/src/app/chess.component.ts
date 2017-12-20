import { Component, style } from "@angular/core";
import { ChessService } from "./chess.service";
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
    constructor(private chessService: ChessService) {}

    board: Array<any>;
    possibleMovement: Array<number>;
    selectedPos: number;
    turn: Color;
    playerColor: Color;

    ngOnInit(){
        console.log('hi');
        this.chessService.generatePieces();
        this.board = this.chessService.getBoard();
        this.possibleMovement = new Array();
        this.turn = Color.White;
        this.playerColor = this.chessService.getPlayerColor();
        console.log(this.playerColor);
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
    
    }

}
