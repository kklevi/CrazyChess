import { Piece } from "./Piece";
import { Board } from "./Board";
import { Color } from "./color";

export class Knight extends Piece{
    constructor(board: Board, color: Color){
        super(board, color);

        this.points = 3;
        if(this.color == Color.White) this.htmlCode = '♘';
        else this.htmlCode = '♞';
    }

    getMovement(): Array<number>{
        let possitions = new Array<number>();
        let pos = this.board.getPos(this);
        let twoDPos = [pos%8, Math.round((pos - pos%8)/8)];


        if(this.inBoard(twoDPos[0]+2, twoDPos[1]-1) &&
            this.board.getColorAt(pos + 2 - 8) != this.color){
            possitions.push(pos + 2 - 8);
        }
        if(this.inBoard(twoDPos[0]+2, twoDPos[1]+1) &&
            this.board.getColorAt(pos + 2 + 8) != this.color){
            possitions.push(pos + 2 + 8);
        }
        if(this.inBoard(twoDPos[0]+1, twoDPos[1]+2) &&
            this.board.getColorAt(pos + 1 + 16) != this.color){
            possitions.push(pos + 1 + 16);
        }
        if(this.inBoard(twoDPos[0]-1, twoDPos[1]+2) &&
            this.board.getColorAt(pos - 1 + 16) != this.color){
            possitions.push(pos - 1 + 16);
        }
        if(this.inBoard(twoDPos[0]-2, twoDPos[1]+1) &&
            this.board.getColorAt(pos - 2 + 8) != this.color){
            possitions.push(pos - 2 + 8);
        }
        if(this.inBoard(twoDPos[0]-2, twoDPos[1]-1) &&
            this.board.getColorAt(pos - 2 - 8) != this.color){
            possitions.push(pos - 2 - 8);
        }
        if(this.inBoard(twoDPos[0]-1, twoDPos[1]-2) &&
            this.board.getColorAt(pos - 1 - 16) != this.color){
            possitions.push(pos - 1 - 16);
        }
        if(this.inBoard(twoDPos[0]+1, twoDPos[1]-2) &&
            this.board.getColorAt(pos + 1 - 16) != this.color){
            possitions.push(pos + 1 - 16);
        }

        return possitions;
    }

    inBoard(x: number, y: number){
        if(x < 8 && x > -1 && y < 8 && y > -1){
            return true;
        }
        return false;
    }

}