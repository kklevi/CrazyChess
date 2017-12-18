import { Injectable } from "@angular/core";
import { Board } from "./Board";


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
        return this.board.getP
    }
    
}