import { Injectable } from "@angular/core";
import { Subscription } from 'rxjs/Subscription';
import { GameService } from './_services/game.service';
import { Board } from "./Game/Board";
import { Color } from "./Game/color";
import { Bishop } from "./Game/Bishop";
import { Knight } from "./Game/Knight";
import { Rook } from "./Game/Rook";
import { Queen } from "./Game/Queen";
import { Pawn } from "./Game/Pawn";


@Injectable()
export class ChessService {
    private board: Board;
    private connection: Subscription;

    constructor(private gameService: GameService){
        this.board = new Board();
      this.connection = this.gameService.getMoves().subscribe(data => {
        console.log(data);
        this.board.movePiece(data[0], data[1]);
      });
    }

    getBoard(){
        return this.board.getBoard();
    }

    generatePieces() {
        this.board.generatePieces();
    }

    hasPieceAt(pos: number){
        return this.board.hasPieceAt(pos);
    }

    getPieceHtmlCode(pos: number): String{
        return this.board.getPieceHtmlCode(pos);
    }

    getPossibleMovements(pos: number): Array<number>{
        return this.board.getMovementAt(pos);
    }

    movePiece(from: number, to: number){
        this.gameService.makeMove([from, to]);
        // this.board.movePiece(from, to);
    }

    getPieceColor(pos: number): Color{
        return this.board.getPiece(pos).color;
    }

    getPlayerColor(): Color{
        setTimeout(() => {
            if(this.gameService.color.charAt(0).toLowerCase() == 'w'){
                return Color.White;
            }else{
                return Color.Black;
            }
        }, 0);
    }
    
    toArray(board: Array<any>): Array<number>{
        return board.map(e => {
            return (e === 0) ? 0 :
                (e instanceof Pawn && e.color == Color.White) ? 1 :
                (e instanceof Bishop && e.color == Color.White) ? 2:
                (e instanceof Knight && e.color == Color.White) ? 3:
                (e instanceof Rook && e.color == Color.White) ? 4:
                (e instanceof Queen && e.color == Color.White) ? 5: 
                (e instanceof Pawn && e.color == Color.Black) ? 6 :
                (e instanceof Bishop && e.color == Color.Black) ? 7:
                (e instanceof Knight && e.color == Color.Black) ? 8:
                (e instanceof Rook && e.color == Color.Black) ? 9:
                (e instanceof Queen && e.color == Color.Black) ? 10: -1
        });
    }

    toCrazyArray(board: Array<number>): Array<any>{
        return board.map(e => {
            return (e === 0) ? 0 :
                (e === 1) ? new Pawn(this.board, Color.White):
                (e === 2) ? new Bishop(this.board, Color.White):
                (e === 3) ? new Knight(this.board, Color.White):
                (e === 4) ? new Rook(this.board, Color.White):
                (e === 5) ? new Queen(this.board, Color.White):
                (e === 6) ? new Pawn(this.board, Color.Black):
                (e === 7) ? new Bishop(this.board, Color.Black):
                (e === 8) ? new Knight(this.board, Color.Black):
                (e === 9) ? new Rook(this.board, Color.Black):
                (e === 10) ? new Queen(this.board, Color.Black): -1
        })
    }
}