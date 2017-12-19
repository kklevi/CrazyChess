import { Piece } from "./Piece";
import { Board } from "./Board";
import { Color } from "./color";

export class Bishop extends Piece{
    constructor(board: Board, color: Color){
        super(board, color);

        this.points = 3;
        if(this.color == Color.White) this.htmlCode = '♗';
        else this.htmlCode = '♝';
    }

    getMovement(): Array<number>{
        let possitions = new Array<number>();
        const pos = this.board.getPos(this);

        this.getDirection(pos, 'R', 'U', possitions);
        this.getDirection(pos, 'R', 'D', possitions);
        this.getDirection(pos, 'L', 'U', possitions);
        this.getDirection(pos, 'L', 'D', possitions);

        return possitions;

    }

    private getDirection(pos: number, directionH: String, directionV: String, possitions: Array<number>){
        let horizontal = (directionH == 'L') ? -1 : 1;
        let vertical = (directionV == 'U') ? -1 : 1;
        let distance = 1;

        if(this.board.hasPieceAt(pos + horizontal*distance + (vertical*distance*8)) &&
        this.board.getPiece(pos + horizontal*distance + (vertical*distance*8)).color != this.color &&
        (pos + horizontal*distance + (vertical*distance*8)) < 64 &&
        (pos + horizontal*distance + (vertical*distance*8)) > -1 &&
        (pos%8 + horizontal*distance) > -1 &&
        (pos%8 + horizontal*distance) < 8){
            possitions.push(pos + horizontal*distance + (vertical*distance*8));
        }

        while(!this.board.hasPieceAt(pos + horizontal*distance + (vertical*distance*8)) &&
        (pos + horizontal*distance + (vertical*distance*8)) < 64 &&
        (pos + horizontal*distance + (vertical*distance*8)) > -1 &&
        (pos%8 + horizontal*distance) > -1 &&
        (pos%8 + horizontal*distance) < 8){
            possitions.push(pos + horizontal*distance +(vertical*distance*8));

            distance++;
            if(this.board.hasPieceAt(pos + horizontal*distance + (vertical*distance*8)) &&
                this.board.getPiece(pos + horizontal*distance + (vertical*distance*8)).color != this.color &&
                (pos + horizontal*distance + (vertical*distance*8)) < 64 &&
                (pos + horizontal*distance + (vertical*distance*8)) > -1 &&
                (pos%8 + horizontal*distance) > -1 &&
                (pos%8 + horizontal*distance) < 8){
                possitions.push(pos + horizontal*distance + (vertical*distance*8));
            }
        }
    }
}