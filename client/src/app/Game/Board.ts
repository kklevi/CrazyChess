import { Piece } from "./Piece";
import { Pawn } from "./Pawn";
import { Color } from "./color";
import { PieceGenerator } from "./pieceGenerator";

export class Board {

    private board: Array<any>;
    private pieceGenerator: PieceGenerator;

    constructor() {
        this.pieceGenerator = new PieceGenerator();

        this.board = new Array(64);
        for(let i = 0; i < 64; i++){
            this.board[i] = 0;
        }

    }

    generatePieces(): void{
        this.pieceGenerator.generatePieces(this);
    }

    getBoard(): Array<any>{
        return this.board;
    }

    getPos(piece: Piece): number{
        return this.board.indexOf(piece);
    }

    movePiece(from: number, to:number){
        this.board[to] = this.board[from];
        this.board[from] = 0;
        this.board[to].setMoved(true);
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
        return '';
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

    getColorAt(pos: number): Color{
        return this.board[pos].color;
    }

    get2dBoard(): Array<Array<any>>{
        let board = Array<Array<any>>();

        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                board[i][j] = this.board[i+j];
            }
        }

        return board;
    }

}