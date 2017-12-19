import { Piece } from "./Piece";
import { Board } from "./Board";
import { Color } from "./color";

export class Rook extends Piece{

    constructor(board: Board, color: Color){
        super(board, color);

        this.points = 5;
        if(this.color == Color.White) this.htmlCode = '♖';
        else this.htmlCode = '♜';
    }

    getMovement(): Array<number>{
        let possitions = new Array<number>();
        const pos = this.board.getPos(this);

        this.getDirection(pos, 'H', 1, possitions);
        this.getDirection(pos, 'H', -1, possitions);
        this.getDirection(pos, 'V', 8, possitions);
        this.getDirection(pos, 'V', -8, possitions);
        
        console.log(possitions);
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
}