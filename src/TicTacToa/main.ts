import { Board } from "./Board";
import { IPieceType } from "./Piece";
import { TicTacToe } from "./TicTacToe";

async function main(){
    const playerRec = {
        Himanshu: IPieceType.CROSS,
        Krishna: IPieceType.CIRCLE,
    }
    const board = new Board(4);
    const tictacToe = new TicTacToe(4,playerRec,board)
    await tictacToe.startGame()
}
main()