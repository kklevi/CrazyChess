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
        
        this.createPieces(whitePieces, 20, board, Color.White);
        this.createPieces(blackPieces, 20, board, Color.Black);

        let whiteQueens = whitePieces.filter((p) => p.points == 9 && p.color == Color.White);
        let blackQueens = blackPieces.filter((p) => p.points == 9);


        this.placePawnsQueens(board, Color.White, whiteQueens, 0);
        this.placePawnsQueens(board, Color.Black, blackQueens, 0);
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
            
            let randomNum = Math.round(Math.random()*4);
            console.log(randomNum);

            switch(randomNum){
                case randomNum = 0:
                    Pieces.push(new Pawn(board, color));
                    currentPoints++;
                    break;
                
                case randomNum = 1:
                    Pieces.push(new Bishop(board, color));
                    currentPoints += 3;
                    break;

                case randomNum = 2:
                    Pieces.push(new Knight(board, color));
                    currentPoints += 3;
                    break;
                
                case randomNum = 3:
                    Pieces.push(new Rook(board, color));
                    currentPoints += 5;
                    break;

                case randomNum = 4:
                    Pieces.push(new Queen(board, color));
                    currentPoints += 9;
                    break;
            }

        }
    }

    

    private placePawnsQueens(board: Board, color: Color, pieces: Array<Piece>, start: number): void{
        const startingRow = (color == Color.White) ? 7-start : 0+start;
        const rowModifier = (color == Color.White) ? -1 : 1;

        let columnL = 5;
        let columnR = 4;
        let left = true;
        let row = startingRow;

        while(pieces.length > 0){
            if((left || columnR < 1) && columnL < 9){
                board.getBoard()[(row*8)+columnL-1] = pieces.pop();
                columnL++;
                left = false;
            }else{
                board.getBoard()[(row*8)+columnR-1] = pieces.pop();
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
        if(piece1 > piece2){
            return -1;
        }
        if(piece1 < piece2){
            return 1;
        }
        return 0;
    }
}

