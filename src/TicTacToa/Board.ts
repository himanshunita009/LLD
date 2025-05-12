import { IPieceType, PlayingPeice, PlayingPieceFactory } from "./Piece"

export class Board {
    private matrix: PlayingPeice[][]
    public filledColumn: number
    constructor(private size: number){
        this.matrix = this.createBoard(size,size)
        this.filledColumn = 0
    }
    getMatix(){
        return this.matrix
    }
    createBoard(rows: number,cols : number): PlayingPeice[][]{
        return Array.from({length: rows},() => Array(cols).fill(null))
    }
    isValidPos(row: number,col: number){
        return row < this.size && row >= 0 && 
            col < this.size && col >= 0 &&
            this.matrix[row][col] === null
    }
    addPiece(row: number,col: number,peiceType: IPieceType){
        this.matrix[row][col] = PlayingPieceFactory.createPiece(peiceType)
        this.filledColumn++
    }
    displayBoard() {
        this.matrix.forEach((row) => {
            console.log(row.map(cell => cell ? cell.print() : " ").join(" | "));
        });
    }

    isBoardFull(){
        return this.filledColumn === this.size*this.size
    }
}