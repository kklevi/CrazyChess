import { Board } from "./Board";
import { Piece } from "./Piece";
import { Color } from "./color";




export class Pawn extends Piece{

    constructor(board: Board, color: Color){
        super(board, color);

        this.points = 1;
        if(this.color == Color.White) this.htmlCode = '♙';
        else this.htmlCode = '♟';
    }

    getMovement(): Array<number>{
        let possitions = Array<number>();
        let pos = this.board.getPos(this);

        if(this.color == Color.White){
            if(pos > 15 && !this.board.hasPieceAt(pos-16) && !this.board.hasPieceAt(pos-8) && !this.moved){
                possitions.push(pos-16);
            }
            if(pos > 7 && !this.board.hasPieceAt(pos-8) && this.board.getColorAt(pos-8) != Color.White){
                possitions.push(pos-8);
            }
            if(this.board.hasPieceAt(pos-9) && this.board.getColorAt(pos-9) != Color.White){
                possitions.push(pos-9);
            }
            if(this.board.hasPieceAt(pos-7) && this.board.getColorAt(pos-7) != Color.White){
                possitions.push(pos-7);
            }
        }else{
            if(pos < 49 && !this.board.hasPieceAt(pos+16)&& !this.board.hasPieceAt(pos+8) && !this.moved){
                possitions.push(pos+16);
            }
            if(pos < 57 && !this.board.hasPieceAt(pos+8) && this.board.getColorAt(pos+8) != Color.Black){
                possitions.push(pos+8);
            }
            if(this.board.hasPieceAt(pos+9) && this.board.getColorAt(pos+9) != Color.Black){
                possitions.push(pos+9);
            }
            if(this.board.hasPieceAt(pos+7) && this.board.getColorAt(pos+7) != Color.Black){
                possitions.push(pos+7);
            }
        }

        return possitions;
    }


}