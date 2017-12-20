import { Injectable } from "@angular/core";
import { Subscription } from 'rxjs/Subscription';
import { GameService } from './_services/game.service';
import { Board } from "./Game/Board";
import { Color } from "./Game/color";


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
    
}
