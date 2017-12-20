import { Injectable } from "@angular/core";
import { Board } from "./Game/Board";
import { Color } from "./Game/color";


@Injectable()
export class ChessService {
    private board: Board;

    constructor(){
        this.board = new Board();
    }

    getBoard(){
        return this.board.getBoard();
    }

    generatePieces() {
        this.board.generatePieces();
    }

    hasPieceAt(pos: number){
        return this.board.hasPieceAt(pos);
    }

    getPieceHtmlCode(pos: number): String{
        return this.board.getPieceHtmlCode(pos);
    }

    getPossibleMovements(pos: number): Array<number>{
        return this.board.getMovementAt(pos);
    }

    movePiece(from: number, to: number){
        this.board.movePiece(from, to);
    }

    getPieceColor(pos: number): Color{
        return this.board.getPiece(pos).color;
    }
    
}