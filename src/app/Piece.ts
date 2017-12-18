import { Board } from "./Board";
import { Color } from "./color";

export abstract class Piece {
    board: Board;
    color: Color;
    
    constructor(board: Board, color: Color){
        this.board = board;
        this.color = color;
    }

    abstract getMovement(): Array<number>;
    abstract getHtmlCode(): String;
}