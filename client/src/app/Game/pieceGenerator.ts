import { Board } from "./Board";
import { Pawn } from "./Pawn";
import { Color } from "./color";
import { Piece } from "./Piece";
import { Rook } from "./Rook";
import { Bishop } from "./Bishop";
import { Knight } from "./Knight";
import { Queen } from "./Queen";

export class PieceGenerator{
    constructor(){}

    generatePieces(board: Board){
        let whitePieces = new Array<Piece>();
        let blackPieces = new Array<Piece>();
        
        this.createPieces(whitePieces, 40, board, Color.White);
        this.createPieces(blackPieces, 40, board, Color.Black);

        let whiteNonPawns = whitePieces.filter((p) => p.points != 1 && p.color == Color.White);
        let blackNonPawns = blackPieces.filter((p) => p.points != 1 && p.color == Color.Black);

        whiteNonPawns = whiteNonPawns.sort((p1, p2) => this.sortPieces(p1, p2));
        blackNonPawns = blackNonPawns.sort((p1, p2) => this.sortPieces(p1, p2));

        let whitePawns = whitePieces.filter((p) => p.points == 1 && p.color == Color.White);
        let blackPawns = blackPieces.filter((p) => p.points == 1 && p.color == Color.Black);

        this.placePieces(board, Color.White, whiteNonPawns, 0);
        this.placePieces(board, Color.Black, blackNonPawns, 0);
        this.placePieces(board, Color.White, whitePawns, 1);
        this.placePieces(board, Color.Black, blackPawns, 1);
        
    }

    createPieces(Pieces: Array<Piece>, points: number, board: Board, color: Color){
        let currentPoints = 0;

        while(true){
            if(points - currentPoints < 3){
                while(currentPoints < points){
                    Pieces.push(new Pawn(board, color));
                    currentPoints++;
                }
                break;
            }
            
            let randomNum = Math.round(Math.random()*15);

            if(randomNum < 6){
                Pieces.push(new Pawn(board, color));
                currentPoints++;
            }else if(randomNum < 9){
                Pieces.push(new Bishop(board, color));
                currentPoints += 3;
            }else if(randomNum < 12){
                Pieces.push(new Knight(board, color));
                currentPoints += 3;
            }else if(randomNum < 14){
                Pieces.push(new Rook(board, color));
                currentPoints += 4;
            }else if(randomNum < 15){
                Pieces.push(new Queen(board, color));
                currentPoints += 8;
            }

        }
    }

    

    private placePieces(board: Board, color: Color, pieces: Array<Piece>, start: number): void{
        const startingRow = (color == Color.White) ? 7-start : 0+start;
        const rowModifier = (color == Color.White) ? -1 : 1;

        let columnL = 5;
        let columnR = 4;
        let left = true;
        let row = startingRow;

        while(pieces.length > 0){

            if((left || columnR < 1) && columnL < 9){
                if(!board.hasPieceAt((row*8)+columnL-1)){
                    board.getBoard()[(row*8)+columnL-1] = pieces.pop();
                }
                
                columnL++;
                left = false;
            }else{
                if(!board.hasPieceAt((row*8)+columnR-1)){
                    board.getBoard()[(row*8)+columnR-1] = pieces.pop();
                }
                
                columnR--;
                left = true;
            }

            if(columnL > 8 && columnR < 1){
                row += rowModifier;
                columnL = 5;
                columnR = 4;
                left = true;
            }
        }
    }

    private sortPieces(piece1: Piece, piece2: Piece): number{
        if(piece1.points > piece2.points){
            return 1;
        }
        if(piece1.points < piece2.points){
            return -1;
        }
        return 0;
    }
}