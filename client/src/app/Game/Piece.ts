import { Board } from "./Board";
import { Color } from "./color";

export abstract class Piece {
    board: Board;
    color: Color;
    htmlCode: String;
    points: number;
    moved: boolean;
    
    constructor(board: Board, color: Color){
        this.board = board;
        this.color = color;
    }

    abstract getMovement(): Array<number>;
    
    setMoved(isMoved: boolean) {
        this.moved = isMoved;
    }

    getHtmlCode(): String{
        return this.htmlCode;
    }
}