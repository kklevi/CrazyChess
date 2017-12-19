import { Board } from "./Board";
import { Color } from "./color";
import { Piece } from "./Piece";

export class Queen extends Piece{
    constructor(board: Board, color: Color){
        super(board, color);

        this.points = 9;
        if(this.color == Color.White) this.htmlCode = '♕';
        else this.htmlCode = '♛';
    }

    getMovement(): Array<number>{

        let possitions = new Array<number>();
        const pos = this.board.getPos(this);

        this.getDirection(pos, 'H', 1, possitions);
        this.getDirection(pos, 'H', -1, possitions);
        this.getDirection(pos, 'V', 8, possitions);
        this.getDirection(pos, 'V', -8, possitions);

        this.getDirectionD(pos, 'R', 'U', possitions);
        this.getDirectionD(pos, 'R', 'D', possitions);
        this.getDirectionD(pos, 'L', 'U', possitions);
        this.getDirectionD(pos, 'L', 'D', possitions);

        return possitions;
    }

    private getDirection(pos: number, direction: String, distanceModifier: number, possitions: Array<number>){

        let distance = 1;

        if(this.board.hasPieceAt(pos + distance*distanceModifier) && 
        this.board.getPiece(pos + distance*distanceModifier).color != this.color){
            possitions.push(pos + distance*distanceModifier);
        }

        while((!this.board.hasPieceAt(pos + distance*distanceModifier)) && 
        (direction == 'V' || (pos%8 + distance*distanceModifier > -1 && 
                              pos%8 + distance*distanceModifier < 8)) && 
        (direction == 'H' || (pos + distance*distanceModifier > 0 && 
                              pos + distance*distanceModifier < 64) )){
            possitions.push(pos + distance*distanceModifier);

            distance++;
            if(this.board.hasPieceAt(pos + distance*distanceModifier) && 
                this.board.getPiece(pos + distance*distanceModifier).color != this.color){
                possitions.push(pos + distance*distanceModifier);
            }
        }
    }

    private getDirectionD(pos: number, directionH: String, directionV: String, possitions: Array<number>){
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