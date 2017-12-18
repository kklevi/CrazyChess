import { Piece } from "./Piece";
import { Pawn } from "./Pawn";
import { Color } from "./color";

export class Board {

    private board: Array<any>;

    constructor() {
        this.board = new Array(64);
        for(let i = 0; i < 64; i++){
            this.board[i] = 0;
        }
    }

    generatePieces(): void{
        this.board[43] = new Pawn(this, Color.White);
    }

    getBoard(){
        return this.board;
    }

    getPos(piece: Piece): number{
        return this.board.indexOf(piece);
    }

    hasPieceAt(pos: number): boolean{
        if(pos < 0){
            return false;
        }
        if(pos > 63){
            return false
        }
        return this.board[pos] != 0;
    }

    getPieceHtmlCode(pos: number): String{
        if(this.hasPieceAt(pos)){
            return this.board[pos].getHtmlCode();
        }
        return '0';
    }

    getMovementAt(pos: number): Array<number>{
        if(!this.hasPieceAt(pos)){
            return new Array();
        }
        return this.board[pos].getMovement();
    }

    getPiece(pos: number): Piece{
        if(!this.hasPieceAt(pos)){
            return null;
        }
        return this.board[pos];
    }
}