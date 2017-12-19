import { Board } from "./Board";
import { Color } from "./color";

export abstract class Piece {
    board: Board;
    color: Color;
    htmlCode: String;
    points: number;
    
    constructor(board: Board, color: Color){
        this.board = board;
        this.color = color;
    }

    abstract getMovement(): Array<number>;
    getHtmlCode(): String{
        return this.htmlCode;
    }
}