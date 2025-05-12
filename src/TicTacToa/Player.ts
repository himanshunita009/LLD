import { Board } from "./Board"
import {  IPieceType, PlayingPeice } from "./Piece"


export class Player {
    constructor(private name: string,public pieceType: IPieceType){}
    getName(){
        return this.name
    }
    move(row: number,col: number,board: Board){
        if(!board.isValidPos(row,col)){
            console.log("This is not valid Position . Please Try Again !")
            return true
        }
        else {
            board.addPiece(row,col,this.pieceType)
            return false
        }
    }
    
}