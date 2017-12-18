import { Component, style } from "@angular/core";
import { ChessService } from "./chess.service";
import { Board } from "./Board";
import { Piece } from "./Piece";
import { OnInit } from "@angular/core";

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

    ngOnInit(){
        console.log('hi');
        this.chessService.generatePieces();
        this.board = this.chessService.getBoard();
        this.possibleMovement = new Array();
    }
    
    isWhite(i: number){
        if((Math.floor(i/8) + i+1)%2 == 0) return true;
        return false;
    }

    hasPiece(i: number): boolean{
        return this.chessService.hasPieceAt(i);
    }

    getPieceCode(i: number): String{
        return this.chessService.getPieceHtmlCode(i);
    }

    setPossibleMovement(i: number): void{
        if(!this.chessService.hasPieceAt(i)){
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
        
    }

}