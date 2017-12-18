import { Board } from "./Board";
import { Piece } from "./Piece";
import { Color } from "./color";




export class Pawn extends Piece{
    htmlCode: String;

    constructor(board: Board, color: Color){
        super(board, color);
        if(this.color == Color.White) this.htmlCode = '♙';
        else this.htmlCode = '♟';
    }

    getMovement(): Array<number>{
        let possitions = Array<number>();
        let pos = this.board.getPos(this);

        if(this.color == Color.White){
            if(pos > 7){
                possitions.push(pos-8);
            }
            if(this.board.hasPieceAt(pos-9)){
                possitions.push(pos-9);
            }
            if(this.board.hasPieceAt(pos-7)){
                possitions.push(pos-7);
            }
        }else{
            if(pos < 57){
                possitions.push(pos+8);
            }
            if(this.board.hasPieceAt(pos+9)){
                possitions.push(pos+9);
            }
            if(this.board.hasPieceAt(pos+7)){
                possitions.push(pos+7);
            }
        }

        return possitions;
    }

    getHtmlCode(): String{
        return this.htmlCode;
    }
}