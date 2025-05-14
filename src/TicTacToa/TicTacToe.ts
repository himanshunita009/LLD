import * as readline from "readline"
import { Board } from "./Board";
import { Player } from "./Player";
import { IPieceType } from "./Piece";

export class TicTacToe {
    private players: Player[]
    private io : any;
    constructor(size: number,args: Record<string,IPieceType>,private board: Board){
        this.players = []
        Object.entries(args).forEach(([pname,ptype]) => {
            this.players.push(new Player(pname,ptype))
        })
        this.io = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
    }
    private async takeInput(): Promise<[number, number]> {
        return new Promise((resolve) => {
            this.io.question("Enter row and column (e.g., 1 2): ", (answer: any) => {
                const [rowStr, colStr] = answer.trim().split(" ");
                const row = parseInt(rowStr, 10);
                const col = parseInt(colStr, 10);
                resolve([row, col]);
            });
        });
    }
    
    private checkWinner(row: number, col: number, type: IPieceType): boolean {
        const mat = this.board.getMatix() // expose getMatrix in Board
        const n = mat.length
        const winRow = mat[row].every(cell => cell?.type === type);
        const winCol = mat.every(r => r[col]?.type === type);
        const winDiag1 = row === col && mat.every((r, i) => r[i]?.type === type);
        const winDiag2 = row + col === n - 1 && mat.every((r, i) => r[n - 1 - i]?.type === type);

        return winRow || winCol || winDiag1 || winDiag2;
    }

    async startGame(){
        while(!this.board.isBoardFull()){
            const player = this.players.shift()
            if(!player)
                break
            console.log(`${player.getName()}'s turn: `)
            const [row,col] = await this.takeInput()
            if(player.move(row,col,this.board))
                this.players.push(player)
            this.board.displayBoard()
            if(this.checkWinner(row,col,player.pieceType)){
                console.log(`Game Over ! Player : ${player?.getName()} is winner`);
                this.io.close();
                return
            }
            this.players.push(player)
        }

        console.log("Game Over ! No Winners")
        this.io.close();
    }
}